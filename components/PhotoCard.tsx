import React from "react";
import Image from "next/image";
import {Photo} from "../types";
import styles from "./card.module.css"
import { IconButton } from '@mui/material'
import FavoriteB from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'

interface Props {
  photo: Photo;
}

function incrementVoteCount(id: number) {
  console.log(id)
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
            <div className={styles.divright}>
            <IconButton color="primary" onClick={() => {
                incrementVoteCount(photo.id)
              }}>
              <FavoriteB />
            </IconButton>
            </div>
        </div>
    </div>
  );
};

export default StoreCard;