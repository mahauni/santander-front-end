 
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SideMenu from "../../components/SideMenu";
import AppTheme from "../../components/shared-theme/AppTheme";
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
    queryFn: () => fetch(API_URL + "analysis/make").then((res) =>
      res.json()
    ),
  })

  function onClick() {
    refetch()
  }

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
            <div className="container">
              <h1>Analysis Report</h1>
              <p className="lead">Click the button below to view the analysis image and details.</p>
              <button className="btn" id="showBtn" onClick={onClick}>Show Analysis</button>
              {data && (
                <>
                  <InnerImageZoom zoomScale={0.8} src={API_URL + "analysis/image"} />
                  {data.map((d: any, i: number) => {
                    return (
                      <p key={i}>{d[1]} <span style={{ color: d[2] }}>{Object.keys(d[0]).join(", ")}</span></p>
                    )
                  })}
                </>
              )}
            </div>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  )
}
