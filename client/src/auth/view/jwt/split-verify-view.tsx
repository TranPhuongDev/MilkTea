'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { EmailInboxIcon } from 'src/assets/icons';

import { Form, Field } from 'src/components/hook-form';
import { FormHead } from 'src/auth/components/form-head';
import { FormResendCode } from 'src/auth/components/form-resend-code';
import { FormReturnLink } from 'src/auth/components/form-return-link';
import { EMAIL, resendEmail, verifyEmail } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import { getErrorMessage } from 'src/auth/utils';
import { useState } from 'react';
import { Alert } from '@mui/material';

// ----------------------------------------------------------------------

export type VerifySchemaType = zod.infer<typeof VerifySchema>;

export const VerifySchema = zod.object({
  code: zod
    .string()
    .min(1, { message: 'Code is required!' })
    .min(6, { message: 'Code must be at least 6 characters!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

// ----------------------------------------------------------------------

export function SplitVerifyView() {
  const email = sessionStorage.getItem(EMAIL);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const defaultValues: VerifySchemaType = {
    code: '',
    email: email ?? '',
  };

  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const methods = useForm<VerifySchemaType>({
    resolver: zodResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await verifyEmail(data.email, data.code);
      await checkUserSession?.();

      router.push(paths.auth.jwt.signIn);
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  const onResendCode = async () => {
    try {
      await resendEmail(defaultValues.email);
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  };

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Field.Text
        name="email"
        label="Email address"
        placeholder="example@gmail.com"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Field.Code name="code" />

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Verify..."
      >
        Verify
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<EmailInboxIcon />}
        title="Please check your email!"
        description={`We've emailed a 6-digit confirmation code. \nPlease enter the code in the box below to verify your email.`}
      />
      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormResendCode onResendCode={onResendCode} value={0} disabled={false} />

      <FormReturnLink href={paths.auth.jwt.signIn} />
    </>
  );
}
