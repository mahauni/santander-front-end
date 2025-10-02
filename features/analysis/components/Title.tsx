import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Title() {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                        Analysis Report
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Click the button below to view the analysis image and details.
          </Typography>
        </Stack>
      </CardContent>
    </Card>

  )
}
