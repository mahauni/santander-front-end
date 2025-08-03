'use client'
import { TextField } from "@mui/material";
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter()

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <TextField label="Email" required={true} style={{ color: 'white' }} variant="outlined" />
                <TextField label="Passoword" required={true} style={{ color: 'white' }} variant="outlined" />
                <Button onClick={() => router.push('/analizer')}>Login</Button>
            </main>
        </div>
    );
}

