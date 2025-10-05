import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import BusinessIcon from '@mui/icons-material/Business';

import "react-inner-image-zoom/lib/styles.min.css";
import { type Analysis } from "../hooks/useMakeAnalysis";

interface MomentProblemProps {
    data: Analysis
}

export default function CompanyProblemDesc({ data }: MomentProblemProps) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: 'stretch'
      }}
    >
      <Grid size={{ xs: 12, md: 2 }}>
        <Card variant="outlined" sx={{ width: '100%', display: 'flex', height: '100%', justifyContent: 'center' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <BusinessIcon sx={{ width: 100, height: 100}}/> 
            <Typography sx={{ mt: 2 }} variant="body1">
                Company CNPJ_01000
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Card variant="outlined" sx={{ width: '100%', display: 'flex', height: '100%' }}>
          <CardContent sx={{ alignContent: "center", alignItems: "center" }}>
            <Typography sx={{ mb: 2 }} variant="body1">
              {data.moment}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ width: '100%', display: 'flex', height: '100%' }}>
          <CardContent sx={{ alignContent: "center", alignItems: "center" }}>
            <Typography sx={{ mb: 2 }} variant="body1">
              {data.problem}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
