import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart, type LineSeries } from '@mui/x-charts/LineChart';
import type { Analysis } from '../hooks/useMakeAnalysis';

interface TransactionsChartProps {
    data: Analysis
}

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

export default function TransactionsChart({ data: analysis }: TransactionsChartProps) {
  const theme = useTheme();
  if (!analysis || !analysis.saldo || !analysis.faturamento || !analysis.data) return

  const data = analysis.data

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const series: LineSeries[] = [
    {
      id: 'saldo',
      label: 'saldo',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      area: true,
      stackOrder: 'ascending',
      data: analysis.saldo
    },
    {
      id: 'faturamento',
      label: 'faturamento',
      showMark: false,
      curve: 'linear',
      stack: 'total',
      area: true,
      stackOrder: 'ascending',
      data: analysis.faturamento
    },
  ]

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex' }}>
      <CardContent sx={{ alignContent: 'center', alignItems: 'center', width: '100%', flex: 1 }}>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Transações
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Valor das transações por dia em 30 dias
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              data: data.map(d => new Date(d).getTime()),
              scaleType: 'time',
              height: 24,
              valueFormatter: (value) => {
                return new Intl.DateTimeFormat('pt-BR', {
                  day: 'numeric',
                  month: 'short'
                }).format(new Date(value));
              },
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={series}
          height={300}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-saldo': {
              fill: "url('#saldo')",
            },
            '& .MuiAreaElement-series-faturamento': {
              fill: "url('#faturamento')",
            },
          }}
          hideLegend
        >
          <AreaGradient color={theme.palette.primary.main} id="saldo" />
          <AreaGradient color={theme.palette.primary.dark} id="faturamento" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
