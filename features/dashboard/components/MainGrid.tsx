import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartValueByType from './ChartValueByType';
import CustomizedDataGrid from './CustomizedDataGrid';
// import PageViewsBarChart from './PageViewsBarChart';
import TransactionsChart from './TransactionsChart';
import StatCard, { type StatCardProps } from './StatCard';
import { CountData, useTransactionsCountType } from '../hooks/useTransactionsCountType';

function transformChartData(chart: CountData) {
  const dates = Object.keys(chart.dates).sort(); // x-axis sorted dates


  const pixData = dates.map((d) => chart.dates[d].pix);
  const tedData = dates.map((d) => chart.dates[d].ted);
  const sistemicoData = dates.map((d) => chart.dates[d].sistemico);
  const boletoData = dates.map((d) => chart.dates[d].boleto);


  const pixTotal = pixData.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  )

  const boletoTotal = boletoData.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  )


  const sistemicoTotal = sistemicoData.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  )

  const tedTotal = tedData.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  )

  const series: StatCardProps[] = [
    {
      title: 'PIX',
      value: `${pixTotal} vezes`,
      interval: 'Last 30 days',
      trend: 'up',
      data: pixData,
    },
    {
      title: 'BOLETO',
      value: `${boletoTotal} vezes`,
      interval: 'Last 30 days',
      trend: 'down',
      data: boletoData,
    },
    {
      title: 'SITEMICO',
      value: `${sistemicoTotal} vezes`,
      interval: 'Last 30 days',
      trend: 'neutral',
      data: sistemicoData,
    },
    {
      title: 'TED',
      value: `${tedTotal} vezes`,
      interval: 'Last 30 days',
      trend: 'neutral',
      data: tedData,
    },
  ];

  return series;
}


export default function MainGrid() {
  const { data: transactionsData } = useTransactionsCountType()

  if (!transactionsData) return

  const series = transformChartData(transactionsData);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {series.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
          <TransactionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
          <ChartValueByType />
          {/* <PageViewsBarChart /> */}
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
