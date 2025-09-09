"use client";
import Container from "@/components/container";
import StickyCursor from "@/components/stickyCursor";
import { useRef } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const firstTargetRef = useRef(null);
  const secondTargetRef = useRef(null);

  return (
    <main className={styles.main}>
      <Container ref={firstTargetRef} secondRef={secondTargetRef} />
      <StickyCursor stickyElement={[firstTargetRef, secondTargetRef]} />
    </main>
  );
}
