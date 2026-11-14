import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <h1>DustyUI</h1>
      <Link className={styles.link} href="/storybook">
        View components
      </Link>
    </main>
  );
}
