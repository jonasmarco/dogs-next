import userGet from '@/actions/user-get';

import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.css';

export default async function Header() {
  const {data: user} = await userGet();

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`}>
        <Link className={styles.logo} href={'/'}>
          <Image
            src="/assets/dogs.svg"
            alt="Dogs"
            width={28}
            height={22}
            priority
          />
        </Link>
        {user ? (
          <Link className={styles.login} href={'/conta'}>
            {user.username}
          </Link>
        ) : (
          <Link className={styles.login} href={'/login'}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
}
