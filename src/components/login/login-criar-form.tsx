'use client';

import userPost from '@/actions/user-post';
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
      {pending ? 'Cadastrando...' : 'Cadastrar'}
    </Button>
  );
}

export default function LoginCriarForm() {
  const [state, action] = useActionState(userPost, {
    ok: false,
    error: '',
    data: null,
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.ok) {
      window.location.href = '/conta';
    }
  }, [state]);

  return (
    <form action={action} className={styles.form}>
      <Input label="Usuário" name="username" type="text" />
      <Input label="E-mail" name="email" type="email" />
      <Input label="Senha" name="password" type="password" />
      <FormButton />
    </form>
  );
}
