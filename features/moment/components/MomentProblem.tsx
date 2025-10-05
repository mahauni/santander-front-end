import Grid from "@mui/material/Grid"

import "react-inner-image-zoom/lib/styles.min.css";
import CompanyProblemDesc from "./CompanyProblemDesc";
import TransactionsChart from "./TransactionsChart";
import type { Analysis } from "../hooks/useMakeAnalysis";

interface MomentProblemProps {
    data: Analysis
}

export default function MomentProblem({ data }: MomentProblemProps) {
  return (
    <Grid container spacing={2}>
      <CompanyProblemDesc data={data} />
      <TransactionsChart data={data} />
    </Grid>
  )
}
