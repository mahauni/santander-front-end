import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import SideMenu from "../../components/SideMenu";
import { useMakeAnalysis } from "./hooks/useMakeAnalysis";
import { useAllCnpj } from "./hooks/useAllCnpj";
import AppTheme from "../../components/shared-theme/AppTheme";
import InnerImageZoom from "react-inner-image-zoom";

import "./assets/style.css"
import "react-inner-image-zoom/lib/styles.min.css";
import { useState } from 'react';
import { API_URL } from '../../utils/api.utils';

export default function AnalysisPage() {
  const [cnpjSelected, setCnpjSelected] = useState('')
  const { data, refetch } = useMakeAnalysis(cnpjSelected)
  const { data: cnpjs } = useAllCnpj()
  const cnpjList = cnpjs ? cnpjs.cnpjs: []

  function onClick() {
    refetch()
  }


  const handleChangeCnpjCenter = (event: SelectChangeEvent) => {
    setCnpjSelected(event.target.value as string);
  };


  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
              {/* cards */}

              <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
              >

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
                      <Button variant="contained" onClick={onClick}>Show Analysis</Button>

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

                {data && (
                  <Grid 
                    container 
                    spacing={2} 
                    sx={{ 
                      alignItems: 'stretch' // Faz os filhos terem a mesma altura
                    }}
                  >
                    <Grid size={{ xs: 12, md: 9 }}>
                      <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
                        <CardContent>
                          <InnerImageZoom zoomScale={0.8} src={API_URL + `analysis/image?t=${Date.now()}`} />
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid size={{ xs: 9, md: 3 }}>
                      <Card variant="outlined" sx={{ width: '100%', display: 'flex', height: '100%' }}>
                        <CardContent sx={{ alignContent: "center", alignItems: "center" }}>
                          {data.map((d: any, i: number) => {
                            return (
                              <Typography sx={{ mb: 2 }} variant="body1" key={i}>{d[1]} <span style={{ color: d[2] }}>{Object.keys(d[0]).join(", ")}</span></Typography>
                            )
                          })}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  )
}
