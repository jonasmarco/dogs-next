'use client';

import login from '@/actions/login';
import Button from '@/components/forms/button';
import Input from '@/components/forms/input';

import Link from 'next/link';
import {
  useActionState,
  useEffect,
} from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import styles from './login-form.module.css';

function FormButton() {
  const {pending} = useFormStatus();
  return (
    <Button disabled={pending}>{pending ? 'Entrando...' : 'Entrar'}</Button>
  );
}

export default function LoginForm() {
  const [state, action] = useActionState(login, {
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
    <>
      <form action={action} className={styles.form}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Senha" name="password" type="password" />
        <FormButton />
      </form>
      <Link className="link" href="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadaste-se no site.</p>
        <Link className="button" href="/login/criar">
          Cadastro
        </Link>
      </div>
    </>
  );
}
