import styles from '@/styles/css/pages/not-found.module.css';
import BackgroundGrid from '@/components/BackgroundGrid';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={styles['not-found-page']}>
      <div className={styles['content-wrapper']}>
        {/* Error Code - Top Left */}


        {/* Main Content */}
        <div className={styles['main-content']}>
          <div className={styles['error-container']}>
            <div className={styles['page-not-found-label']}>/ PAGE NOT FOUND</div>
            <h1 className={styles['error-number']}>404</h1>
          </div>

          <h2 className={styles['error-title']}>Lost in the Digital Void?</h2>

          <p className={styles['error-description']}>
            The page you are looking for has been moved, deleted, or possibly
            never existed in this dimension.
          </p>

          <Link
            className={styles['return-button']}
            href='/'
            aria-label="Return to home page"
          >
            <span className={styles['button-text']}>RETURN HOME</span>
            <span className={styles['button-arrow']} aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className={styles["error-code-container"]}>
          <div className={styles['error-code']}>
            <span>ERROR: 404_NOT_FOUND</span>
          </div>

          {/* System Status - Bottom Left */}
          <div className={styles['system-status']}>
            <span>SYSTEM STATUS: OPTIMAL</span>
          </div>

          {/* Bug Info - Bottom Right */}
          <div className={styles['bug-info']}>
            <span>BUG FOUND?: EMAIL</span>
          </div>
        </div>
      </div>
      <BackgroundGrid opacity={0.4} />
    </div>
  );
}
