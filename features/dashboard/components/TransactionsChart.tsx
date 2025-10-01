import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart, LineSeries } from '@mui/x-charts/LineChart';
import { useTransactions } from '../hooks/useTransactions';
import { formatBRL } from '../utils/money.utils';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days: string[] = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function TransactionsChart() {
  const { pix, boleto, ted, sistemico, data: transactions} = useTransactions()
  const theme = useTheme();
  const data = getDaysInMonth(4, 2024);

  if (!pix || !boleto || !ted || !sistemico || !transactions) return

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const series: LineSeries[] = [
    {
      id: 'pix',
      label: 'PIX',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      area: true,
      stackOrder: 'ascending',
      data: pix.map(item => 
        parseFloat(item.value.replace(/[R$\s,]/g, ""))
      ).slice(0, 30) as number[],
    },
    {
      id: 'boleto',
      label: 'BOLETO',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      area: true,
      stackOrder: 'ascending',
      data: boleto.map(item => 
        parseFloat(item.value.replace(/[R$\s,]/g, ""))
      ).slice(0, 30) as number[],
    },
    {
      id: 'ted',
      label: 'TED',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      stackOrder: 'ascending',
      data: ted.map(item => 
        parseFloat(item.value.replace(/[R$\s,]/g, ""))
      ).slice(0, 30) as number[],
      area: true,
    },
    {
      id: 'sistemico',
      label: 'SISTEMICO',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      stackOrder: 'ascending',
      data: sistemico.map(item => 
        parseFloat(item.value.replace(/[R$\s,]/g, ""))
      ).slice(0, 30) as number[],
      area: true,
    },
  ]

  const total = transactions.reduce((sum, item) => {
    const value = parseFloat(item.value.replace("R$ ", "").replace(",", ""));
    return sum + value;
  }, 0);

  const totalBRL = formatBRL.format(total);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Transações
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {totalBRL}
            </Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Valor das transações por dia em 30 dias
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={series}
          height={408}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-pix': {
              fill: "url('#pix')",
            },
            '& .MuiAreaElement-series-boleto': {
              fill: "url('#boleto')",
            },
            '& .MuiAreaElement-series-ted': {
              fill: "url('#ted')",
            },
            '& .MuiAreaElement-series-sistemico': {
              fill: "url('#sistemico')",
            },
          }}
          hideLegend
        >
          <AreaGradient color={theme.palette.primary.dark} id="pix" />
          <AreaGradient color={theme.palette.primary.main} id="boleto" />
          <AreaGradient color={theme.palette.primary.light} id="ted" />
          <AreaGradient color={theme.palette.primary.dark} id="sistemico" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
