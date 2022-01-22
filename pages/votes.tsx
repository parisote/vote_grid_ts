import Layout from '../components/layout'
import PhotoCard from '../components/PhotoCard'
import { Photo } from '../types';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import AccessDenied from '../components/access-denied';
import styles from '../components/card.module.css'

export default function Page () {

    const [ photos, setPhotos ] = useState<Photo[]>([]);
    const { data: session } = useSession()

    useEffect(() => {
        fetch('/api/images')
        .then((res) => res.json())
        .then((photos:Photo[]) => setPhotos(photos));
    }, []);

    if(!session){
        return <AccessDenied />
    }else{
        if(!photos.length){
            return <span>Cargando...</span>
        }else{
            return (
                <Layout>
                    <section className={styles.listContainer}>
                        {photos.map((photo) => (
                            <PhotoCard key={photo.id} photo={photo}/>
                        ))}
                    </section>
                </Layout>
            )
        }
    }
}