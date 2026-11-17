import styles from "./RecordArtwork.module.css";

export function HeliosArtwork() {
  return (
    <svg className={styles.artwork} viewBox="0 0 100 100" aria-hidden="true">
      <rect className={styles.night} width="100" height="100" />
      <circle className={styles.halo} cx="50" cy="62" r="40" />
      <circle className={styles.glow} cx="50" cy="62" r="27" />
      <circle className={styles.sun} cx="50" cy="62" r="15" />
      <rect className={styles.ground} y="62" width="100" height="38" />
      <path className={styles.wave} d="M0 72h100v5H0z" />
      <path className={styles.wave} d="M14 82h72v4H14z" />
      <path className={styles.wave} d="M30 91h40v3H30z" />
      <circle className={styles.moon} cx="78" cy="20" r="5" />
    </svg>
  );
}
