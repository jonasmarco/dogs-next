'use server';

import {STATS_GET} from '@/functions/api';
import apiError from '@/functions/api-error';
import {validateStatsGet} from '@/functions/validations';

import {cookies} from 'next/headers';

export type StatsData = {
  id: number;
  title: string;
  acessos: string;
};

export default async function statsGet() {
  try {
    const token = (await cookies()).get('token')?.value;
    validateStatsGet(token);

    const {url} = STATS_GET();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) throw new Error('Erro ao buscar estatísticas.');

    const data = (await response.json()) as StatsData[];
    return {data, ok: true, error: ''};
  } catch (error) {
    return apiError(error);
  }
}
