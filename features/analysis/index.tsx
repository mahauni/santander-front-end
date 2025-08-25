import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../../utils/api.utils"
import InnerImageZoom from "react-inner-image-zoom";

import "./assets/style.css"
import "react-inner-image-zoom/lib/styles.min.css";

export default function AnalysisPage() {
    const { data, refetch } = useQuery({
        enabled: false,
        retry: false, // this makes don't retry till a success
        refetchOnWindowFocus: false,
        queryKey: ["analysis"],
        queryFn: () => fetch(API_URL + "/get_analysis").then((res) =>
            res.json()
        ),
    })

    console.log(data)

    function onClick() {
        refetch()
    }

    return (
        <div className="container">
            <h1>Analysis Report</h1>
            <p className="lead">Click the button below to view the analysis image and details.</p>
            <button className="btn" id="showBtn" onClick={onClick}>Show Analysis</button>
            <InnerImageZoom src={API_URL + "/get_image"} />
            {data && (
                data.map((d) => {
                    return (
                        <p>{d[1]}</p>
                    )
                })
            )}
        </div>
    )
}
