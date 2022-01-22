import React from "react";
import Image from "next/image";
import {Photo} from "../types";
import styles from "./card.module.css"

interface Props {
  photo: Photo;
}

const StoreCard: React.VFC<Props> = ({photo}) => {
  return (
    <div className={styles.card}>
        <Image
            alt={photo.title}
            height={280}
            width={280}
            layout="fixed"
            objectFit="cover"
            src={photo.image}            
            className={styles.img}
        />
        <div className={styles.container}>
            <h4><b>{photo.title}</b></h4>
        </div>
    </div>
  );
};

export default StoreCard;