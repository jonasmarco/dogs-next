import photoGet from '@/actions/photo-get';
import FeedModal from '@/components/feed/feed-modal';

import {notFound} from 'next/navigation';

interface FotoIdParams {
  params: Promise<{id: string}>;
}

export async function generateMetadata({params}: FotoIdParams) {
  const {id} = await params;
  const {data: photoData} = await photoGet(id);

  if (!photoData) return {title: 'Fotos'};
  return {
    title: `${photoData.photo.title} | Dogs Next`,
  };
}

export default async function FotoIdPage({params}: FotoIdParams) {
  const {id} = await params;
  const {data: photoData} = await photoGet(id);

  if (!photoData) return notFound();

  return <FeedModal photo={photoData} />;
}
