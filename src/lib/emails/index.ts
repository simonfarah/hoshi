import 'server-only';
import { Resend } from 'resend';
import { env } from '#/env';
import { APP_TITLE } from '#/lib/constants';

const resend = new Resend(env.RESEND_API_KEY);

type SendEmailArgs = {
  to: string;
  subject: string;
  react: JSX.Element;
};

export function sendEmail({ to, subject, react }: SendEmailArgs) {
  return resend.emails.send({
    from: `${APP_TITLE} <${env.RESEND_EMAIL_FROM}>`,
    to,
    subject,
    react,
  });
}
