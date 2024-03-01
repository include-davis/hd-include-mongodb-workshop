'use client';
import Link from 'next/link';
import Image from 'next/image';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';

import styles from './Navbar.module.scss';
import useToggle from '@hooks/useToggle';

interface NavLink {
  name: string;
  slug: string;
}

export default function Navbar({ navLinks }: { navLinks: NavLink[] }) {
  const [active, toggleActive, _, setInactive] = useToggle(false);
  return (
    <div className={styles.relative_wrapper}>
      <div className={styles.container}>
        <div className={styles.logo_container}>
          <Image
            src="/logo/hackdavis.png"
            alt=""
            height={300}
            width={300}
            style={{ height: '100%', width: 'auto' }}
          />
          <RxCross2 />
          <Image
            src="/logo/include.svg"
            alt=""
            height={300}
            width={300}
            style={{ height: '100%', width: 'auto' }}
          />
        </div>{' '}
        <div className={styles.nav_container}>
          <div className={`${styles.links} ${active ? styles.active : null}`}>
            {navLinks.map((link) => {
              return (
                <Link key={link.slug} href={link.slug} onClick={setInactive}>
                  {link.name}
                </Link>
              );
            })}
          </div>
          <button className={styles.menu} onClick={toggleActive}>
            {active ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>
    </div>
  );
}
