import React from "react";
import styles from "./frameRight.module.css";
import Image from "next/image";
import bg from "../../../public/randomChurchPic.jpg";

const FrameRight = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.c_shape}></div>
      <div className={styles.tail}></div>
      <div className={styles.circle}>
        <Image
          src={bg}
          alt=""
          className="object-cover object-center h-full w-full "
        />
      </div>
    </div>
  );
};

export default FrameRight;
