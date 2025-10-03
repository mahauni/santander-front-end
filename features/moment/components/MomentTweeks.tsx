import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { type SelectChangeEvent } from "@mui/material/Select"
import Stack from "@mui/material/Stack"

interface MomentTweeksProps {
    onClickButtonMoment: () => void
    cnpjSelected: string
    handleChangeCnpjCenter: (event: SelectChangeEvent) => void
    cnpjList: string[]
}

export default function MomentTweeks({ onClickButtonMoment, cnpjSelected, handleChangeCnpjCenter, cnpjList}: MomentTweeksProps) {
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
          <Button variant="contained" onClick={onClickButtonMoment}>Show Company Lifetime</Button>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="cnpj-center-label">CNPJ</InputLabel>
              <Select
                labelId="cnpj-center-label"
                id="cnpj-center"
                value={cnpjSelected}
                label="CNPJ"
                onChange={handleChangeCnpjCenter}
                MenuProps={{
                  style: {
                    maxHeight: 400,
                  }
                }}
              >
                {cnpjList.map((v, i: number) => {
                  return (
                    <MenuItem key={i} value={v}>{v}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
