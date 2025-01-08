'use client';

import photosGet from '@/actions/photos-get';
import FeedPhotos from '@/components/feed/feed-photos';
import Loading from '@/components/helper/loading';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './feed.module.css';

export default function Feed({
  photos,
  user,
}: {
  photos: Photo[];
  user?: 0 | string;
}) {
  const [photosFeed, setPhotosFeed] = useState<Photo[]>(photos);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [infinite, setInfinite] = useState<boolean>(photos.length >= 6);

  const fetching = useRef(false);

  const infiniteScroll = useCallback(() => {
    if (fetching.current) return;
    fetching.current = true;

    setTimeout(() => {
      setPage(page => page + 1);
      fetching.current = false;
    }, 1500);
  }, []);

  useEffect(() => {
    if (page <= 1) return;

    async function getPagePhotos(page: number) {
      const actionData = await photosGet(
        {page, total: 6, user},
        {
          cache: 'no-store',
        },
      );

      if (actionData && actionData.data !== null) {
        const {data} = actionData;
        setPhotosFeed(currentPhotos => [...currentPhotos, ...data]);

        if (data.length < 6) setInfinite(false);
      } else {
        setInfinite(false);
      }

      setLoading(false);
    }

    setLoading(true);
    getPagePhotos(page);
  }, [page, user]);

  useEffect(() => {
    if (infinite) {
      window.addEventListener('scroll', infiniteScroll);
      window.addEventListener('wheel', infiniteScroll);
    } else {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
    }

    return () => {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
    };
  }, [infinite, infiniteScroll]);

  return (
    <section>
      <FeedPhotos photos={photosFeed} />
      {infinite ? (
        loading && <Loading />
      ) : (
        <div className={styles.end}>
          <p className="text">Não existem mais postagens.</p>
        </div>
      )}
    </section>
  );
}
