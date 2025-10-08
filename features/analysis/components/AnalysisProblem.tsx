import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
// import { API_URL } from "../../../utils/api.utils"

// import InnerImageZoom from "react-inner-image-zoom";

// import "react-inner-image-zoom/lib/styles.min.css";
import { InteractiveNvlWrapper } from "@neo4j-nvl/react"

interface AnalysisProblemProps {
    nodes: any
    data: any
}

export default function AnalysisProblem({ data, nodes }: AnalysisProblemProps) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: 'stretch'
      }}
    >
      <Grid size={{ xs: 12, md: 9 }}>
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent sx={{ width: 1500, height: 800 }}>
            <InteractiveNvlWrapper
              nodes={nodes.nodes}
              rels={nodes.relationships}
              nvlOptions={{ initialZoom: 2 }}
              mouseEventCallbacks={{
                onZoom: true,
                onDrag: true,
                onCanvasClick: true,
                onPan: true,
                onHover: true,
                onNodeClick: true,
              }}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 9, md: 3 }}>
        <Card variant="outlined" sx={{ width: '100%', display: 'flex', height: '100%' }}>
          <CardContent sx={{ alignContent: "center", alignItems: "center" }}>
            {data.map((d: any, i: number) => {
              return (
                <Typography sx={{ mb: 2 }} variant="h5" key={i}>
                  {d[1]}{" "}
                  <span style={{ color: d[2] }}>
                    {Object.keys(d[0]).join(", ")}
                  </span>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      backgroundColor: d[2],
                      marginLeft: 1,
                      verticalAlign: "middle",
                    }}
                  />
                </Typography>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
