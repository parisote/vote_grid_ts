import React, { useState } from "react";
import Image from "next/image";
import {Photo} from "../types";
import styles from "./card.module.css"
import { IconButton } from '@mui/material'
import Icon from '@mui/material/Icon';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"

interface Props {
  photo: Photo;
}

const StoreCard: React.VFC<Props> = ({photo }) => {
  const { data: session, status } = useSession()
  const [ icon_name, setIconName ] = useState("favorite_border");
  const { query } = useRouter();

  const addVote = async (id: number) => {
    try {
      await fetch("http://localhost:3000/api/images/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photo),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const voteAddUser = async (email: string) => {
    try {
      await fetch("http://localhost:3000/api/users/add/" + email, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const voteRemoveUser = async (email: string) => {
    try {
      await fetch("http://localhost:3000/api/users/remove/" + email, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };


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
            { photo.votes }
            <div className={styles.divright}>
            <IconButton color="primary" onClick={() => {
              photo.votes = icon_name === "favorite_border" ? photo.votes + 1 : photo.votes - 1;
              setIconName(icon_name === "favorite" ? "favorite_border" : "favorite")
              addVote(photo.id)
              if(icon_name === "favorite")
                voteRemoveUser(session.user.email)
              else
                voteAddUser(session.user.email)
              }}>
              <Icon>{icon_name}</Icon>
            </IconButton>
            </div>
        </div>
    </div>
  );
};

export default StoreCard;