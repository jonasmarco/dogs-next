import photosGet from '@/actions/photos-get';
import Feed from '@/components/feed/feed';

import Link from 'next/link';

export default async function Home() {
  const {data: photos} = await photosGet();

  return (
    <section className="container mainContainer">
      {photos && photos.length > 0 ? (
        <Feed photos={photos} />
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
