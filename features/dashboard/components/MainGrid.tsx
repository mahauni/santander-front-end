import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartValueByType from './ChartValueByType';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';
import { useTransactions } from '../hooks/useTransactions';
import { getTimesPerDate } from '../utils/array.utils';

export default function MainGrid() {
  const { data: transactions } = useTransactions()

  if (!transactions) return

  const pix = transactions.filter((value) => value.type === "PIX")
  const boleto = transactions.filter((value) => value.type === "BOLETO")
  const ted = transactions.filter((value) => value.type === "TED")
  const sistemico = transactions.filter((value) => value.type === "SISTEMICO")

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
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <ChartValueByType />
            <CustomizedTreeView />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
