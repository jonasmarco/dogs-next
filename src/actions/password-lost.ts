'use server';

import {PASSWORD_LOST} from '@/functions/api';
import apiError from '@/functions/api-error';
import {validatePasswordLost} from '@/functions/validations';

export default async function passwordLost(
  state: FormResponseState,
  formData: FormData,
): Promise<{ok: boolean; error: string; data: null}> {
  const login = formData.get('login') as string;
  const urlPerdeu = formData.get('url') as string;

  try {
    validatePasswordLost(login, urlPerdeu);

    const {url} = PASSWORD_LOST();

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('E-mail ou usuário não existem.');
    return {ok: true, error: '', data: null};
  } catch (error: unknown) {
    return apiError(error);
  }
}
