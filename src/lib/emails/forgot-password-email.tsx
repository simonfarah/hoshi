import { Button, Heading, Text } from '@react-email/components';
import { APP_TITLE } from '#/lib/constants';
import { EmailBase } from './components/email-base';

type VerificationEmailProps = {
  link: string;
};

export function ForgotPasswordEmail({ link }: VerificationEmailProps) {
  return (
    <EmailBase preview={`${APP_TITLE} reset password link`}>
      <Heading className="text-2xl font-bold">
        Reset your {APP_TITLE} password
      </Heading>

      <Text className="text-base text-muted-foreground">
        Click the button below to reset your password:
      </Text>

      <Button
        href={link}
        className="whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Reset password
      </Button>

      <Text className="text-muted-foreground">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </Text>
    </EmailBase>
  );
}
