import type { ReactNode } from "react";
import styles from "./Demo.module.css";

interface DemoProps {
  title: string;
  testing: string;
  children: ReactNode;
}

export function Demo({ title, testing, children }: DemoProps) {
  return (
    <section className={styles.demo}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.testing}>{testing}</p>
      {children}
    </section>
  );
}
