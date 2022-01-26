import { signIn, signOut, useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import styles from "./header.module.css"
import { IUser } from "../models/User";

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [ user, setUser ] = useState<IUser[]>([]);

  if(session){
    useEffect(() => {
      fetch('/api/users/'+session.user.email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }})
      .then((res) => res.json())
      .then((user:IUser[]) => setUser(user));
    },[]);
  }

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn("google", { callbackUrl: "http://localhost:3000/votes"})
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className={styles.avatar}
              />
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
                <span className={styles.centerInText}><strong>{user.votes}</strong></span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut({callbackUrl: "http://localhost:3000"})
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
    </header>
  )
}