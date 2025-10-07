import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

interface AnalysisTweeksProps {
    onClickButtonAnalysis: () => void
    cnpjSelected: string
    handleChangeCnpjCenter: (newValue: string | null) => void
    cnpjList: string[]
}

export default function AnalysisTweeks({ onClickButtonAnalysis, cnpjSelected, handleChangeCnpjCenter, cnpjList}: AnalysisTweeksProps) {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{
            alignContent: { xs: 'center', sm: 'flex-start' },
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Button variant="contained" onClick={onClickButtonAnalysis}>Show Analysis</Button>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Autocomplete
                sx={{ width: 185 }}
                value={cnpjSelected}
                options={cnpjList}
                renderInput={(params) => <TextField {...params} label="CNPJ" />}
                onChange={(_, newValue) => handleChangeCnpjCenter(newValue)}
              />
            </FormControl>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
