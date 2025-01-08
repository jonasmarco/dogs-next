'use client';

import photoPost from '@/actions/photo-post';
import Button from '@/components/forms/button';
import Input from '@/components/forms/input';

import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useState,
} from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import styles from './conta-photo-post.module.css';

function FormButton() {
  const {pending} = useFormStatus();
  return (
    <Button disabled={pending}>{pending ? 'Enviando...' : 'Enviar'}</Button>
  );
}

export default function ContaPhotoPost() {
  const router = useRouter();

  const [state, action] = useActionState(photoPost, {
    ok: false,
    error: '',
    data: null,
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.ok) {
      toast.success('Foto enviada com sucesso!');
      setImg('');
      router.push('/conta');
    }
  }, [router, state]);

  const [img, setImg] = useState<string>('');
  const handleImageChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]));
    }
  };

  return (
    <section className={`animeLeft ${styles.photoPost}`}>
      <form action={action}>
        <Input label="Nome" name="nome" type="text" />
        <Input label="Peso" name="peso" type="number" />
        <Input label="Idade" name="idade" type="number" />
        <input
          onChange={handleImageChange}
          type="file"
          name="img"
          id="img"
          className={styles.file}
        />
        <FormButton />
      </form>
      <div>
        {img && (
          <div
            className={styles.preview}
            style={{backgroundImage: `url('${img}')`}}></div>
        )}
      </div>
    </section>
  );
}
