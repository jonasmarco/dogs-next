'use server';

import { PHOTO_DELETE } from '@/functions/api';
import apiError from '@/functions/api-error';
import { validatePhotoDelete } from '@/functions/validations';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function photoDelete(
  state: FormResponseState,
  formData: FormData,
): Promise<{ok: boolean; error: string; data: null}> {
  const token = (await cookies()).get('token')?.value;
  const id = formData.get('id') as string;

  try {
    validatePhotoDelete(token, id);

    const {url} = PHOTO_DELETE(id);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 1,
        tags: ['photos', 'comment'],
      },
    });

    if (!response.ok) throw new Error('Erro ao deletar foto.');

    revalidateTag('photos');
  } catch (error: unknown) {
    return apiError(error);
  }
  redirect('/conta');
}
