import Grid from '@mui/material/Grid';
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { type SelectChangeEvent } from '@mui/material/Select';

import SideMenu from "../../components/SideMenu";
import { useMakeAnalysis } from "./hooks/useMakeAnalysis";
import { useAllCnpj } from "./hooks/useAllCnpj";
import AppTheme from "../../components/shared-theme/AppTheme";

import "./assets/style.css"
import "react-inner-image-zoom/lib/styles.min.css";
import { useState } from 'react';
import Title from './components/Title';
import AnalysisTweeks from './components/AnalysisTweeks';
import AnalysisProblem from './components/AnalysisProblem';

export default function AnalysisPage() {
  const [cnpjSelected, setCnpjSelected] = useState('')
  const { data, refetch } = useMakeAnalysis(cnpjSelected)
  const { data: cnpjs } = useAllCnpj()
  const cnpjList = cnpjs ? cnpjs.cnpjs: []

  function onClickButtonAnalysis() {
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
                <Title />

                <AnalysisTweeks
                  onClickButtonAnalysis={onClickButtonAnalysis} 
                  cnpjSelected={cnpjSelected} 
                  handleChangeCnpjCenter={handleChangeCnpjCenter} 
                  cnpjList={cnpjList}
                />

                {data && (
                  <AnalysisProblem data={data} /> 
                )}
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  )
}
