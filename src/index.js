import Head from 'next/head'
import styles from 'styles/Home.module.css'
import Cotter from "cotter";
import { useEffect, useState } from "react";
const cotterApiKeyId = process.env.NEXT_PUBLIC_COTTER_API_KEY_ID;

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Shows the Cotter Login form and sets Access Token when authenticated
    useEffect(() => {
        const cotter = new Cotter(cotterApiKeyId);
        cotter
            .signInWithOTP()
            .showEmailForm()
            .then(payload => {
                localStorage.setItem("ACCESS_TOKEN", payload.oauth_token.access_token);
                setIsLoggedIn(true);
            })
            .catch(err => console.log(err));
    }, []);

    // Sets local isLoggedIn variable
    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN") != null) {
            setIsLoggedIn(true);
        }
    }, []);

    // Deletes Access Token and logs user out
    const logOut = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        setIsLoggedIn(false);
    };

    // Display the client portal page
    return (
        <div className={styles.container}>
            <Head>
                <title>Client Portal</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Your Client Portal</h1>
                {isLoggedIn ? (
                    <div>
                        <p style={{textAlign: "center", cursor: "pointer"}} onClick={logOut}>Log Out</p>
                    </div>
                ): (<p>Log in to view your projects.</p>)}
                <div id="cotter-form-container" style={{ width: 300, height: 200 }} />
            </main>
        </div>
    )
}
