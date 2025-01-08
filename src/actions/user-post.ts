'use server';

import {USER_POST} from '@/functions/api';
import apiError from '@/functions/api-error';
import {validateUserPost} from '@/functions/validations';

import login from './login';

export default async function userPost(
  state: FormResponseState,
  formData: FormData,
): Promise<{ok: boolean; error: string; data: null}> {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    validateUserPost(username, email, password);

    const {url} = USER_POST();

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('E-mail ou usuário já existem.');

    // Login the user after creating the account
    const {ok} = await login({ok: true, error: ''}, formData);
    if (!ok) throw new Error('Erro ao logar.');

    return {ok: true, error: '', data: null};
  } catch (error: unknown) {
    return apiError(error);
  }
}
