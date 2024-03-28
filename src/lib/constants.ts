import { TimeSpan } from 'oslo';

export const APP_TITLE = 'Hoshi';

export const SESSION_EXPIRES_IN = new TimeSpan(30, 'd');
export const EMAIL_VERIFICATION_CODE_EXPIRATION = new TimeSpan(10, 'm');
export const PASSWORD_RESET_TOKEN_EXPIRATION = new TimeSpan(2, 'h');

export const REDIRECTS = {
  toSignIn: '/sign-in',
  toVerify: '/verify-email',
  afterSignIn: '/dashboard',
  afterSignOut: '/sign-in',
  afterVerify: '/dashboard',
} as const;
