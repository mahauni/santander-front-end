'use client'
import { TextField } from "@mui/material";
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const router = useRouter()
    const [email, setEmail] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()

    function onLogin() {
        console.log(email, password)

        router.push('/analizer')
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <TextField label="Email" required={true} onChange={(e) => setEmail(e.target.value)} style={{ color: 'white' }} variant="outlined" />
                <TextField label="Password" onChange={(e) => setPassword(e.target.value)} required={true} style={{ color: 'white' }} variant="outlined" />
                <Button onClick={onLogin}>Login</Button>
            </main>
        </div>
    );
}

