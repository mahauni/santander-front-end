import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartValueByType from './ChartValueByType';
import CustomizedDataGrid from './CustomizedDataGrid';
// import PageViewsBarChart from './PageViewsBarChart';
import TransactionsChart from './TransactionsChart';
import StatCard, { type StatCardProps } from './StatCard';
import { useTransactions } from '../hooks/useTransactions';
import { getTimesPerDate } from '../utils/array.utils';

export default function MainGrid() {
  const { pix, boleto, ted, sistemico } = useTransactions()

  if (!pix || !boleto || !ted || !sistemico) return

  // ajustar isso daqui porque isso nao esta certo
  const data: StatCardProps[] = [
    {
      title: 'PIX',
      value: `${pix.length} vezes`,
      interval: 'Last 30 days',
      trend: 'up',
      // data: filterLast30Days(getTimesPerDate(pix)).map(item => 
      //   item.count
      // ),
      data: getTimesPerDate(pix).map(item => 
        item.count
      ).slice(0, 30) as number[],
    },
    {
      title: 'BOLETO',
      value: `${boleto.length} vezes`,
      interval: 'Last 30 days',
      trend: 'down',
      data: getTimesPerDate(boleto).map(item => 
        item.count
      ).slice(0, 30) as number[],
    },
    {
      title: 'SITEMICO',
      value: `${sistemico.length} vezes`,
      interval: 'Last 30 days',
      trend: 'neutral',
      data: getTimesPerDate(sistemico).map(item => 
        item.count
      ).slice(0, 30) as number[],
    },
    {
      title: 'TED',
      value: `${ted.length} vezes`,
      interval: 'Last 30 days',
      trend: 'neutral',
      data: getTimesPerDate(ted).map(item => 
        item.count
      ).slice(0, 30) as number[],
    },
  ];


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
        {data.map((card, index) => (
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
