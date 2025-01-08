'use server';

import { COMMENT_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { validateCommentPost } from '@/functions/validations';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export default async function commentPost(
  state: FormResponseState,
  formData: FormData,
) {
  const token = (await cookies()).get('token')?.value;
  const comment = formData.get('comment') as string;
  const id = formData.get('id') as string;

  try {
    validateCommentPost(token, comment, id);

    const {url} = COMMENT_POST(id);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Erro ao enviar comentário.');

    const data = (await response.json()) as Comment;
    revalidateTag('comment');
    return {ok: true, error: '', data};
  } catch (error: unknown) {
    return apiError(error);
  }
}
