import { Heading, Text } from '@react-email/components';
import { APP_TITLE } from '#/lib/constants';
import { EmailBase } from './components/email-base';

type VerificationEmailProps = {
  code: string;
};

export function VerificationEmail({ code }: VerificationEmailProps) {
  return (
    <EmailBase preview={`${APP_TITLE} email verification code`}>
      <Heading className="text-2xl font-bold">
        Verify your {APP_TITLE} account
      </Heading>

      <Text className="text-base text-muted-foreground">
        Your email verification code is:
      </Text>

      <code className="flex justify-center rounded-sm border border-solid border-border bg-muted p-3 font-mono tracking-widest">
        {code}
      </code>

      <Text className="text-muted-foreground">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </Text>
    </EmailBase>
  );
}
