import photosGet from '@/actions/photos-get';
import userGet from '@/actions/user-get';
import Feed from '@/components/feed/feed';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Minha Conta',
};

export default async function ContaPage() {
  const {data: user} = await userGet();
  const {data: photos} = await photosGet({user: user?.username});

  return (
    <section>
      {photos && photos.length > 0 ? (
        <Feed photos={photos} user={user?.username} />
      ) : (
        <div>
          <p className="text">Nenhuma foto encontrada.</p>
          <Link className="link" href="/conta/postar">
            Cadastre sua primeira foto
          </Link>
        </div>
      )}
    </section>
  );
}
