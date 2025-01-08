'use client';

import passwordReset from '@/actions/password-reset';
import Button from '@/components/forms/button';
import Input from '@/components/forms/input';

import {useActionState, useEffect} from 'react';
import {useFormStatus} from 'react-dom';
import {toast} from 'sonner';

import styles from './login-form.module.css';

function FormButton() {
  const {pending} = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? 'Enviando...' : 'Resetar senha'}
    </Button>
  );
}

export default function LoginResetarForm({
  token,
  login,
}: {
  token: string;
  login: string;
}) {
  const [state, action] = useActionState(passwordReset, {
    ok: false,
    error: '',
    data: null,
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.ok) {
      window.location.href = '/login';
    }
  }, [state]);

  return (
    <form action={action} className={styles.form}>
      <Input label="Nova senha" name="password" type="password" />
      <input type="hidden" name="key" value={token} />
      <input type="hidden" name="login" value={login} />
      <FormButton />
    </form>
  );
}
