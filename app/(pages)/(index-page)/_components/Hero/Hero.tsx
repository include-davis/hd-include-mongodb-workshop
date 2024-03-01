import Image from 'next/image';

import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <Image
          src="/index/city.jpg"
          alt="serene forest scene in the night"
          fill
          style={{ objectFit: 'cover', opacity: '0.6' }}
        />
      </div>
      <div className={styles.welcome}>
        <h1>HackDavis & #include MongoDB Workshop</h1>
      </div>
    </div>
  );
}
