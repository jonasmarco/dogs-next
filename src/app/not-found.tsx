import {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página não encontrada | Dogs Next',
};

export default function NotFound() {
  return (
    <section className="container mainContainer">
      <h1 className="title">Página não encontrada.</h1>
      <Link className="link" href="/">
        Voltar para a home
      </Link>
    </section>
  );
}
