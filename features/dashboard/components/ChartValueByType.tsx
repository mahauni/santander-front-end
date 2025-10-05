import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PixIcon from '@mui/icons-material/Pix';

import {
  BoletoIcon,
  SistemicoIcon,
  TedIcon,
} from '../internals/components/CustomIcons';
import { useValueByType } from '../hooks/useValueByType';
import { formatBRL } from '../utils/money.utils';


interface StyledTextProps {
  variant: 'primary' | 'secondary';
}

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<StyledTextProps>(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.body1.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body1.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

interface PieCenterLabelProps {
  primaryText: string;
  secondaryText: string;
}

function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

const colors = [
  'hsl(220, 20%, 65%)',
  'hsl(220, 20%, 42%)',
  'hsl(220, 20%, 35%)',
  'hsl(220, 20%, 25%)',
];

export default function ChartValueByType() {
  const { data: valueByType } = useValueByType()

  if (!valueByType) return

  const data = Object.entries(valueByType).map(([label, value]) => ({
    label,
    value
  }));

  const total = Object.values(valueByType).reduce((sum, value) => sum + value, 0);

  const totalBRL = formatBRL.format(total);

  const types = [
    {
      name: 'BOLETO',
      value: ((valueByType.boleto/ total) * 100).toFixed(2),
      flag: <BoletoIcon />,
      color: 'hsl(220, 25%, 65%)',
    },
    {
      name: 'PIX',
      value: ((valueByType.pix / total) * 100).toFixed(2),
      flag: <PixIcon />,
      color: 'hsl(220, 25%, 45%)',
    },
    {
      name: 'SISTEMICO',
      value: ((valueByType.sistemico / total) * 100).toFixed(2),
      flag: <SistemicoIcon />,
      color: 'hsl(220, 25%, 30%)',
    },
    {
      name: 'TED',
      value: ((valueByType.ted / total) * 100).toFixed(2),
      flag: <TedIcon />,
      color: 'hsl(220, 25%, 20%)',
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Valor por tipo de pagamento
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            height={260}
            width={260}
            hideLegend
          >
            <PieCenterLabel primaryText={totalBRL} secondaryText="Total" />
          </PieChart>
        </Box>
        {types.map((type, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            {type.flag}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {type.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {type.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Numero de quanto pagaram com o tipo de pagamento"
                value={parseFloat(type.value)}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: type.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
