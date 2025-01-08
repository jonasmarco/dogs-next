'use client';

import photoDelete from '@/actions/photo-delete';

import {
  useActionState,
  useEffect,
} from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import styles from './photo-delete.module.css';

function FormButton() {
  const {pending} = useFormStatus();
  return (
    <button className={styles.delete} disabled={pending}>
      {pending ? 'Deletando...' : 'Deletar'}
    </button>
  );
}

export default function PhotoDelete({id}: {id: string}) {
  const [state, action] = useActionState(photoDelete, {
    ok: false,
    error: '',
    data: null,
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form className={styles.form} action={action}>
      <input type="hidden" name="id" value={id} />
      <FormButton />
    </form>
  );
}
