'use client'
import { Button } from "@mui/material";
import { fetchAnalizer } from "./hooks/RequestAnalizer";
import styles from "./page.module.css";

export default function Analizer() {
    async function requestAnalizer() {
        const data = await fetchAnalizer()

        console.log(data)
    }

    return (
        <div className={styles.page}>
            <Button variant="contained" onClick={requestAnalizer}>Analizar</Button>
        </div>
    );
}
