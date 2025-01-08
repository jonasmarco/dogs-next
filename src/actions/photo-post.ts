'use server';

import { PHOTO_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { validatePhotoPost } from '@/functions/validations';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export default async function photoPost(
  state: FormResponseState,
  formData: FormData,
): Promise<{ok: boolean; error: string; data: null}> {
  const token = (await cookies()).get('token')?.value;
  const nome = formData.get('nome') as string;
  const idade = formData.get('idade') as string;
  const peso = formData.get('peso') as string;
  const img = formData.get('img') as File;

  try {
    validatePhotoPost(token, nome, idade, peso, img);

    const {url} = PHOTO_POST();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Erro ao enviar foto.');

    revalidateTag('photos');
    return {ok: true, error: '', data: null};
  } catch (error: unknown) {
    return apiError(error);
  }
}
