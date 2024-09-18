import React from "react";
import styles from "./frame.module.css";
import Image, { StaticImageData } from "next/image";
import bg from "../../../public/randomChurchPic.jpg";


type FramePropsType = {
  image: StaticImageData
}

const Frame: React.FC<FramePropsType> = ({image}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.c_shape}></div>
      <div className={styles.tail}></div>
      <div className={styles.circle}>
        <Image src={image} alt="" loading="eager"  className="object-cover object-center h-full w-full "/>
      </div>
    </div>
  );
};

export default Frame;
