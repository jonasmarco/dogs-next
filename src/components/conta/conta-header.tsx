'use client';

import logout from '@/actions/logout';
import { useUser } from '@/context/user-context';
import useMedia from '@/hooks/use-media';
import AdicionarIcon from '@/icons/adicionar-icon';
import EstatisticasIcon from '@/icons/estatisticas-icon';
import FeedIcon from '@/icons/feed-icon';
import SairIcon from '@/icons/sair-icon';

import Link from 'next/link';
import {
  usePathname,
  useRouter,
} from 'next/navigation';
import React, {
  useEffect,
  useState,
} from 'react';

import styles from './conta-header.module.css';

function getTitle(pathname: string) {
  switch (pathname) {
    case '/conta/estatisticas':
      return 'Estatísticas';
    case '/conta/postar':
      return 'Poste sua Foto';
    default:
      return 'Minha Conta';
  }
}

export default function ContaHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const {setUserState} = useUser();

  const handleLogOut = async () => {
    setUserState(null);
    await logout();
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <h1 className="title">{getTitle(pathname)}</h1>

      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        />
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}>
        <Link
          href="/conta"
          className={pathname === '/conta' ? styles.active : ''}>
          <FeedIcon />
          {mobile && 'Minhas Fotos'}
        </Link>
        <Link
          href="/conta/estatisticas"
          className={pathname === '/conta/estatisticas' ? styles.active : ''}>
          <EstatisticasIcon />
          {mobile && 'Estatísticas'}
        </Link>
        <Link
          href="/conta/postar"
          className={pathname === '/conta/postar' ? styles.active : ''}>
          <AdicionarIcon />
          {mobile && 'Adicionar Foto'}
        </Link>
        <button onClick={handleLogOut}>
          <SairIcon />
          {mobile && 'Sair'}
        </button>
      </nav>
    </header>
  );
}
