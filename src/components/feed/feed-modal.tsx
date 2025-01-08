'use client';

import {PhotoData} from '@/actions/photo-get';

import {usePathname, useRouter} from 'next/navigation';

import PhotoContent from '../photo/photo-content';
import styles from './feed-modal.module.css';

export default function FeedModal({photo}: {photo: PhotoData}) {
  const router = useRouter();
  const pathName = usePathname();

  if (!pathName.includes('foto')) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) router.back();
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <div className={styles.photo}>
        <PhotoContent data={photo} single={false} />
      </div>
    </div>
  );
}
