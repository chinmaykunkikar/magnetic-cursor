"use client";
import Container from "@/components/container";
import StickyCursor from "@/components/stickyCursor";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Container />
      <StickyCursor />
    </main>
  );
}
