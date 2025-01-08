'use client';

import passwordLost from '@/actions/password-lost';
import Button from '@/components/forms/button';
import Input from '@/components/forms/input';

import {useActionState, useEffect, useState} from 'react';
import {useFormStatus} from 'react-dom';
import {toast} from 'sonner';

import styles from './login-form.module.css';

function FormButton() {
  const {pending} = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar e-mail'}
    </Button>
  );
}

export default function LoginPerdeuForm() {
  const [url, setUrl] = useState('');

  const [state, action] = useActionState(passwordLost, {
    ok: false,
    error: '',
    data: null,
  });

  useEffect(() => {
    setUrl(window.location.href.replace('perdeu', 'resetar'));
  }, []);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.ok) {
      toast.success('E-mail enviado com sucesso!');
    }
  }, [state]);

  return (
    <form action={action} className={styles.form}>
      <Input label="E-mail / Usuário" name="login" type="text" />
      <input type="hidden" name="url" value={url} />
      <FormButton />
    </form>
  );
}
