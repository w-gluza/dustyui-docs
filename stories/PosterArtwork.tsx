import styles from "./PosterArtwork.module.css";

export function ArchPoster() {
  return (
    <svg className={styles.artwork} viewBox="0 0 300 380" aria-hidden="true">
      <path className={styles.arch} d="M0 380V140A140 140 0 0 1 280 140V380Z" />
      <circle className={styles.opening} cx="140" cy="255" r="80" />
      <circle className={styles.sun} cx="75" cy="125" r="26" />
      <circle className={styles.moon} cx="240" cy="70" r="95" />
      <circle className={styles.core} cx="240" cy="70" r="48" />
      <path
        className={styles.leaf}
        d="M300 318C262 322 236 350 236 400C274 396 300 368 300 318Z"
      />
    </svg>
  );
}
