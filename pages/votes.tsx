import Layout from '../components/layout'
import StoreCard from '../components/StoreCard'
import { Store } from '../types';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import AccessDenied from '../components/access-denied';
import styles from '../components/card.module.css'

export default function Page () {

    const [ stores, setStores ] = useState<Store[]>([]);
    const { data: session } = useSession()

    useEffect(() => {
        fetch('/api/images')
        .then((res) => res.json())
        .then((stores:Store[]) => setStores(stores));
    }, []);

    if(!session){
        return <AccessDenied />
    }else{
        if(!stores.length){
            return <span>Cargando...</span>
        }else{
            return (
                <Layout>
                    <section className={styles.listContainer}>
                        {stores.map((store) => (
                            <StoreCard key={store.id} store={store}/>
                        ))}
                    </section>
                </Layout>
            )
        }
    }
}