import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart, type LineSeries } from '@mui/x-charts/LineChart';
import { formatBRL } from '../utils/money.utils';
import { ChartData, useTransactionsValueChart } from '../hooks/useTransactionsValueChart';

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

function transformChartData(chart: ChartData) {
  if (!chart || !chart.dates || Object.keys(chart.dates).length === 0) {
    return { dates: [], series: [], total: 0 };
  }

  const dates = Object.keys(chart.dates).sort(); // x-axis sorted dates


  const pixData = dates.map((d) => chart.dates[d].pix);
  const tedData = dates.map((d) => chart.dates[d].ted);
  const sistemicoData = dates.map((d) => chart.dates[d].sistemico);
  const boletoData = dates.map((d) => chart.dates[d].boleto);

  const series: LineSeries[] = [
    {
      id: 'pix',
      label: 'PIX',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      area: true,
      stackOrder: 'ascending',
      data: pixData,
    },
    {
      id: 'boleto',
      label: 'BOLETO',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      area: true,
      stackOrder: 'ascending',
      data: boletoData,
    },
    {
      id: 'ted',
      label: 'TED',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      stackOrder: 'ascending',
      data: tedData,
      area: true,
    },
    {
      id: 'sistemico',
      label: 'SISTEMICO',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      stackOrder: 'ascending',
      data: sistemicoData,
      area: true,
    },
  ];

  const total = [...pixData, ...tedData, ...sistemicoData, ...boletoData].reduce(
    (acc, value) => acc + value,
    0
  );

  return { dates, series, total };
}

export default function TransactionsChart() {
  const { data: transactionsChart } = useTransactionsValueChart()
  const theme = useTheme();

  if (!transactionsChart) return

  const { dates, series, total } = transformChartData(transactionsChart);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const totalBRL = formatBRL.format(total);

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex' }}>
      <CardContent sx={{ alignContent: 'center', alignItems: 'center', width: '100%', flex: 1 }}>
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
              data: dates,
              tickInterval: (_, i) => (i + 1) % 5 === 0,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={series}
          height={300}
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
