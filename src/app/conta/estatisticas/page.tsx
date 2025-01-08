import statsGet from '@/actions/stats-get';
import Loading from '@/components/helper/loading';

import {Metadata} from 'next';
import dynamic from 'next/dynamic';

const ContaStatsGraphs = dynamic(
  () => import('@/components/conta/conta-stats-graphs'),
  {
    loading: () => <Loading />,
  },
);

export const metadata: Metadata = {
  title: 'Estatísticas | Minha Conta',
};

export default async function EstatisticasPage() {
  const {data} = await statsGet();

  if (!data) return <Loading />;

  return (
    <section>
      <ContaStatsGraphs data={data} />
    </section>
  );
}
