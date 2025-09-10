import { forwardRef } from "react";
import styles from "./style.module.scss";
import Magnetic from "@/components/magnetic";

const Container = forwardRef(function index() {
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <Magnetic>
          <div className={styles.burger} data-magnetic>
            <div className={styles.bounds} />
          </div>
        </Magnetic>
        <Magnetic>
          <div className={styles.burger} data-magnetic>
            <div className={styles.bounds} />
          </div>
        </Magnetic>
      </div>
      <p className={styles.heading}>Sticky cursor</p>
      <p className={styles.helperText}>
        Move the cursor around the button group to see the magnetic effect
      </p>
      <p className={styles.noHover}>
        This will not work correctly on a touch-only device
      </p>
    </div>
  );
});

export default Container;
