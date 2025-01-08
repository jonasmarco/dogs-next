'use server';

import {PASSWORD_RESET} from '@/functions/api';
import apiError from '@/functions/api-error';
import {validatePasswordReset} from '@/functions/validations';

export default async function passwordReset(
  state: FormResponseState,
  formData: FormData,
): Promise<{ok: boolean; error: string; data: null}> {
  const login = formData.get('login') as string;
  const key = formData.get('key') as string;
  const password = formData.get('password') as string;

  try {
    validatePasswordReset(login, key, password);

    const {url} = PASSWORD_RESET();

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Não autorizado.');
    return {ok: true, error: '', data: null};
  } catch (error: unknown) {
    return apiError(error);
  }
}
