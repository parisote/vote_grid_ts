import React from "react";
import Image from "next/image";
import {Store} from "../types";
import styles from "./card.module.css"

interface Props {
  store: Store;
}

const StoreCard: React.VFC<Props> = ({store}) => {
  return (
    <div className={styles.card}>
        <Image
            alt={store.title}
            height={280}
            width={280}
            layout="fixed"
            objectFit="cover"
            src={store.image}            
            className={styles.img}
        />
        <div className={styles.container}>
            <h4><b>{store.title}</b></h4>
        </div>
    </div>
  );
};

export default StoreCard;