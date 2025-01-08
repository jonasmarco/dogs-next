'use server';

import {TOKEN_POST} from '@/functions/api';
import apiError from '@/functions/api-error';
import {validateLogin} from '@/functions/validations';

import {cookies} from 'next/headers';

export default async function login(
  state: FormResponseState,
  formData: FormData,
): Promise<{ok: boolean; error: string; data: null}> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    validateLogin(username, password);

    const {url} = TOKEN_POST();

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Usuário ou senha inválidos');

    const data = await response.json();
    (await cookies()).set('token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });

    return {ok: true, error: '', data: null};
  } catch (error: unknown) {
    return apiError(error);
  }
}
