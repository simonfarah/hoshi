import { TRPCError, initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import { uncachedValidateRequest } from '#/lib/auth/validate-request';
import { db } from '#/server/db';
import { transformer } from '#/trpc/shared';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const { session, user } = await uncachedValidateRequest();

  return {
    session,
    user,
    db,
    headers: opts.headers,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    // infer non-nullable user and session
    ctx: {
      session: { ...ctx.session },
      user: { ...ctx.user },
    },
  });
});
