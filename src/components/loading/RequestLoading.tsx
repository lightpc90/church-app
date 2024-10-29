import React from "react";
import styles from "./style.module.css";
import logo from "../../../public/bglogo 100x100.png";
import Image from "next/image";

const Loading = () => {
  return (
    <div className={styles.outer}>
      <section className={styles.inner}>
        <div className="absolute w-[80px] h-[80px] rounded-full bg-white overflow-hidden">
          <Image
            src={logo}
            alt="logo"
            loading="eager"
            className="object-cover h-full w-full"
          />
        </div>
        <div className={styles.loader}>
          <span className={styles.one}></span>
          <span className={styles.two}></span>
          <span className={styles.three}></span>
          <span className={styles.four}></span>
          <span className={styles.five}></span>
          <span className={styles.six}></span>
          <span className={styles.seven}></span>
          <span className={styles.eight}></span>
          <span className={styles.nine}></span>
          <span className={styles.ten}></span>
          <span className={styles.eleven}></span>
          <span className={styles.twelve}></span>
          <span className={styles.thirteen}></span>
          <span className={styles.fourteen}></span>
          <span className={styles.fifteen}></span>
          <span className={styles.sixteen}></span>
          <span className={styles.seventeen}></span>
          <span className={styles.eighteen}></span>
          <span className={styles.nineteen}></span>
          <span className={styles.twenty}></span>
        </div>
      </section>
    </div>
  );
};

export default Loading;
