import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function StickyCursor({ stickyElement }) {
  const [isStuck, setIsStuck] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const cursorSize = isStuck ? 96 : 40; // Same as the cursor size in scss file

  // For framer to recognize motion values, we use the useMotionValue hook.
  const mouse = { x: useMotionValue(16), y: useMotionValue(16) };

  // To make the sticky cursor to smoothly follow the pointer
  const smoothOpts = { damping: 20, stiffness: 300, mass: 0.3 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOpts),
    y: useSpring(mouse.y, smoothOpts),
  };

  useEffect(() => {
    const attractDistance = 120; // px to start sticking
    const releaseDistance = 180; // px to release sticking
    const attractDistanceSq = attractDistance * attractDistance;
    const releaseDistanceSq = releaseDistance * releaseDistance;

    function getTargets() {
      if (!stickyElement) return [];
      const refs = Array.isArray(stickyElement)
        ? stickyElement
        : [stickyElement];
      return refs.map((r) => r && r.current).filter(Boolean);
    }

    function handleMouseMove(event) {
      const { clientX, clientY } = event;
      const targets = getTargets();

      if (targets.length === 0) {
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
        setIsStuck(false);
        setActiveIndex(null);
        return;
      }

      // Find nearest target by center distance
      let nearestIndex = 0;
      let nearestDistSq = Infinity;
      const centers = targets.map((el) => {
        const rect = el.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });

      centers.forEach((center, index) => {
        const dx = clientX - center.x;
        const dy = clientY - center.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < nearestDistSq) {
          nearestDistSq = d2;
          nearestIndex = index;
        }
      });

      const shouldStick = isStuck
        ? nearestDistSq <= releaseDistanceSq
        : nearestDistSq <= attractDistanceSq;

      if (shouldStick) {
        const idx = nearestIndex;
        const center = centers[idx];
        const distance = { x: clientX - center.x, y: clientY - center.y };

        mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
        mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);

        if (!isStuck || activeIndex !== idx) {
          setIsStuck(true);
          setActiveIndex(idx);
        }
      } else {
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
        if (isStuck || activeIndex !== null) {
          setIsStuck(false);
          setActiveIndex(null);
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorSize, isStuck, activeIndex, mouse.x, mouse.y, stickyElement]);

  return (
    <motion.div
      className={styles.cursor}
      style={{ left: smoothMouse.x, top: smoothMouse.y }}
      animate={{ width: cursorSize, height: cursorSize }}
    />
  );
}
