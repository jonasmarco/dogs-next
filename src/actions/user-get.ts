'use server';

import { USER_GET } from '@/functions/api';
import apiError from '@/functions/api-error';

import { cookies } from 'next/headers';

export interface User {
  id: number;
  email: string;
  username: string;
  nome: string;
}

export default async function userGet(): Promise<{
  ok: boolean;
  error: string;
  data: User | null;
}> {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new Error('Token não encontrado.');

    const {url} = USER_GET();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) throw new Error('Erro ao obter dados do usuário.');

    const data = (await response.json()) as User;
    return {ok: true, error: '', data};
  } catch (error: unknown) {
    return apiError(error);
  }
}
