'use-client';

import commentPost from '@/actions/comment-post';
import EnviarIcon from '@/icons/enviar-icon';

import {
  useActionState,
  useEffect,
} from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import styles from './photo-comments-form.module.css';

function FormButton() {
  const {pending} = useFormStatus();
  return (
    <button className={styles.button} disabled={pending}>
      <EnviarIcon />
    </button>
  );
}

export default function PhotoCommentsForm({
  id,
  single,
  setComments,
}: {
  id: string;
  single: boolean;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const [state, action] = useActionState(commentPost, {
    ok: false,
    error: '',
    data: null,
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.ok && state.data) {
      setComments(comments => [...comments, state.data]);
    }
  }, [setComments, state]);

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      action={action}>
      <input type="hidden" name="id" id="id" value={id} />
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comentário..."></textarea>
      <FormButton />
    </form>
  );
}
