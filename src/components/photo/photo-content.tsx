'use client';

import {PhotoData} from '@/actions/photo-get';
import PhotoComments from '@/components/photo/photo-comments';
import PhotoDelete from '@/components/photo/photo-delete';
import {useUser} from '@/context/user-context';

import Image from 'next/image';
import Link from 'next/link';

import styles from './photo-content.module.css';

export default function PhotoContent({
  data,
  single,
}: {
  data: PhotoData;
  single: boolean;
}) {
  const {user} = useUser();
  const {photo, comments} = data;

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} width={500} height={500} />
      </div>
      <div className={styles.details}>
        <div>
          {user && user.username === photo.author && (
            <PhotoDelete id={String(photo.id)} />
          )}
          <p className={styles.author}>
            <Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.atributes}>
            <li>{photo.peso} kg</li>
            <li>
              {photo.idade} {Number(photo.idade) === 1 ? 'ano' : 'anos'}
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments
        id={String(photo.id)}
        comments={comments}
        single={single}
      />
    </div>
  );
}
