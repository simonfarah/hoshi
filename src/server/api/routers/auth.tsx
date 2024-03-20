import { cookies } from 'next/headers';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { createDate, isWithinExpirationDate } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { Argon2id } from 'oslo/password';
import { env } from 'process';
import { z } from 'zod';
import { lucia } from '#/lib/auth';
import {
  APP_TITLE,
  EMAIL_VERIFICATION_CODE_EXPIRATION,
  PASSWORD_RESET_TOKEN_EXPIRATION,
} from '#/lib/constants';
import { sendEmail } from '#/lib/emails';
import { ForgotPasswordEmail } from '#/lib/emails/forgot-password-email';
import { VerificationEmail } from '#/lib/emails/verification-email';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
} from '#/lib/validators/auth';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '#/server/api/trpc';
import {
  emailVerificationCodes,
  passwordResetTokens,
  users,
} from '#/server/db/schema';

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(signInSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const existingUser = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, email),
        columns: {
          id: true,
          hashedPassword: true,
        },
      });

      if (!existingUser || !existingUser.hashedPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }

      const validPassword = await new Argon2id().verify(
        existingUser.hashedPassword,
        password,
      );

      if (!validPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { success: 'Signed in successfully' };
    }),

  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const existingUser = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, email),
        columns: {
          id: true,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'A user with this email is already registered',
        });
      }

      const userId = generateId(21);
      const hashedPassword = await new Argon2id().hash(password);

      await ctx.db.insert(users).values({
        id: userId,
        email,
        hashedPassword,
      });

      const code = generateRandomString(8, alphabet('0-9'));

      await ctx.db.insert(emailVerificationCodes).values({
        id: generateId(21),
        userId,
        email,
        code,
        expiresAt: createDate(EMAIL_VERIFICATION_CODE_EXPIRATION),
      });

      await sendEmail({
        to: email,
        subject: `${APP_TITLE} email verification code`,
        react: <VerificationEmail code={code} />,
      });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { success: 'Signed up successfully' };
    }),

  signOut: publicProcedure.mutation(async ({ ctx }) => {
    if (ctx.session) {
      await lucia.invalidateSession(ctx.session.id);

      const sessionCookie = lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    return { success: 'Signed out successfully' };
  }),

  sendVerificationEmail: protectedProcedure.mutation(async ({ ctx }) => {
    // const lastSent = await ctx.db.query.emailVerificationCodes.findFirst({
    //   where: (table, { eq }) => eq(table.userId, ctx.user.id),
    // });

    // if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
    //   return {
    //     error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`,
    //   };
    // }

    await ctx.db
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.userId, ctx.user.id));

    const code = generateRandomString(8, alphabet('0-9'));

    await ctx.db.insert(emailVerificationCodes).values({
      id: generateId(21),
      userId: ctx.user.id,
      email: ctx.user.email,
      code,
      expiresAt: createDate(EMAIL_VERIFICATION_CODE_EXPIRATION),
    });

    await sendEmail({
      to: ctx.user.email,
      subject: `${APP_TITLE} email verification code`,
      react: <VerificationEmail code={code} />,
    });

    return { success: 'A verification email has been sent to your inbox' };
  }),

  verifyEmail: protectedProcedure
    .input(verifyEmailSchema)
    .mutation(async ({ ctx, input }) => {
      const { code } = input;

      const dbCode = await ctx.db.transaction(async (tx) => {
        const item = await tx.query.emailVerificationCodes.findFirst({
          where: (table, { eq }) => eq(table.userId, ctx.user.id),
          columns: {
            id: true,
            email: true,
            code: true,
            expiresAt: true,
          },
        });

        if (item) {
          await tx
            .delete(emailVerificationCodes)
            .where(eq(emailVerificationCodes.id, item.id));
        }

        return item;
      });

      if (!dbCode || dbCode.code !== code) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid code or code has expired',
        });
      }

      if (dbCode.email !== ctx.user.email) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid code or code has expired',
        });
      }

      if (!isWithinExpirationDate(dbCode.expiresAt)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid code or code has expired',
        });
      }

      await lucia.invalidateUserSessions(ctx.user.id);

      await ctx.db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, ctx.user.id));

      const session = await lucia.createSession(ctx.user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { success: 'Your email has been verified successfully' };
    }),

  sendPasswordResetEmail: publicProcedure
    .input(forgotPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { email } = input;

      const user = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, email),
        columns: {
          id: true,
        },
      });

      if (!user) {
        // abstraction that the user doesn't exist
        return {
          success:
            "If we found an eligible account associated with that email, we've sent password reset instructions to its inbox",
        };
      }

      await ctx.db
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.userId, user.id));

      const tokenId = generateId(40);

      await ctx.db.insert(passwordResetTokens).values({
        id: tokenId,
        userId: user.id,
        expiresAt: createDate(PASSWORD_RESET_TOKEN_EXPIRATION),
      });

      const link = env.NEXT_PUBLIC_APP_URL + '/reset-password/' + tokenId;

      await sendEmail({
        to: email,
        subject: `${APP_TITLE} reset password link`,
        react: <ForgotPasswordEmail link={link} />,
      });

      return {
        success:
          "If we found an eligible account associated with that email, we've sent password reset instructions to its inbox",
      };
    }),

  resetPassword: publicProcedure
    .input(
      z.object({
        data: resetPasswordSchema,
        verificationToken: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        data: { password },
        verificationToken,
      } = input;

      const dbToken = await ctx.db.transaction(async (tx) => {
        const item = await tx.query.passwordResetTokens.findFirst({
          where: (table, { eq }) => eq(table.id, verificationToken),
          columns: {
            id: true,
            userId: true,
            expiresAt: true,
          },
        });

        if (item) {
          await tx
            .delete(passwordResetTokens)
            .where(eq(passwordResetTokens.id, item.id));
        }

        return item;
      });

      if (!dbToken) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid code or code has expired',
        });
      }

      if (!isWithinExpirationDate(dbToken.expiresAt)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid code or code has expired',
        });
      }

      await lucia.invalidateUserSessions(dbToken.userId);

      const hashedPassword = await new Argon2id().hash(password);

      // also verify the user since we know he accessed his email address
      await ctx.db
        .update(users)
        .set({ hashedPassword, emailVerified: new Date() })
        .where(eq(users.id, dbToken.userId));

      // sign out the current user
      const sessionCookie = lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { success: 'Your password has been reset successfully' };
    }),
});
