import styles from "./SnareArtwork.module.css";

export function SnareArtwork() {
  return (
    <svg className={styles.artwork} viewBox="0 0 96 96" aria-hidden="true">
      <rect className={styles.ground} width="96" height="96" />
      <ellipse className={styles.shell} cx="44" cy="66" rx="34" ry="13" />
      <rect className={styles.shell} x="10" y="46" width="68" height="20" />
      <ellipse className={styles.head} cx="44" cy="46" rx="34" ry="13" />
      <ellipse className={styles.rim} cx="44" cy="46" rx="34" ry="13" />
      <path className={styles.stick} d="M20 58 84 26" />
      <path className={styles.stick} d="M30 62 90 38" />
      <circle className={styles.sun} cx="74" cy="18" r="9" />
    </svg>
  );
}
