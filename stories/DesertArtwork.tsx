import styles from "./DesertArtwork.module.css";

interface ArtworkProps {
  className?: string | undefined;
}

export function DesertLandscape({ className }: ArtworkProps) {
  return (
    <svg
      className={[styles.landscape, className].filter(Boolean).join(" ")}
      viewBox="0 0 720 300"
      aria-hidden="true"
    >
      <rect className={styles.sky} width="720" height="300" />
      <circle className={styles.sun} cx="440" cy="112" r="62" />
      <path
        className={styles.mountain}
        d="M0 0H170C300 0 330 150 420 200V300H0Z"
      />
      <path
        className={styles.ridge}
        d="M720 60C600 70 500 150 450 220V300H720Z"
      />
      <path
        className={styles.hill}
        d="M0 210C120 120 300 110 420 170C500 205 560 230 720 250V300H0Z"
      />
      <path
        className={styles.hillShade}
        d="M270 300C300 200 480 170 600 230C660 258 700 280 720 300Z"
      />
      <path
        className={styles.archLight}
        d="M560 300V235A110 110 0 0 1 780 235V300Z"
      />
      <path className={styles.arch} d="M595 300V235A75 75 0 0 1 745 235V300Z" />
      <path
        className={styles.archLight}
        d="M625 180H635V300H625ZM655 166H665V300H655ZM685 170H695V300H685Z"
      />
    </svg>
  );
}

export function DesertPortrait({ className }: ArtworkProps) {
  return (
    <svg
      className={[styles.portrait, className].filter(Boolean).join(" ")}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <rect className={styles.sky} width="100" height="100" />
      <circle className={styles.sun} cx="62" cy="22" r="7" />
      <path
        className={styles.hill}
        d="M0 22C14 18 24 26 36 36C48 46 62 50 78 48H100V100H0Z"
      />
      <path className={styles.arch} d="M18 68V46A8 8 0 0 1 34 46V68Z" />
      <path
        className={styles.ridge}
        d="M100 34C86 34 78 40 70 48C60 58 44 58 34 64C26 69 22 76 20 84V100H100Z"
      />
      <path className={styles.dune} d="M0 74C20 70 44 76 56 100H0Z" />
      <path className={styles.archWarm} d="M54 100V78A14 14 0 0 1 82 78V100Z" />
      <path
        className={styles.archLight}
        d="M61.5 100V80A6.5 6.5 0 0 1 74.5 80V100Z"
      />
    </svg>
  );
}
