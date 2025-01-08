import LoginResetarForm from '@/components/login/login-resetar-form';

import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Resetar a senha | Dogs',
  description: 'Resete a sua senha.',
};

interface ResetarPageProps {
  searchParams: Promise<{
    key: string;
    login: string;
  }>;
}

export default async function ResetarPage({searchParams}: ResetarPageProps) {
  const resolvedSearchParams = await searchParams;
  const {key, login} = resolvedSearchParams;

  return (
    <div className="animeLeft">
      <h1 className="title">Resete a senha</h1>
      <LoginResetarForm token={key} login={login} />
    </div>
  );
}
