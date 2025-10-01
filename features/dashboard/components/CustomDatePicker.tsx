import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import Button from '@mui/material/Button';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerFieldProps } from '@mui/x-date-pickers/DatePicker';
import { useTimePeriod } from '../hooks/useTimePeriod'
import {
  useParsedFormat,
  usePickerContext,
  useSplitFieldProps,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ButtonFieldProps extends DatePickerFieldProps {}

function ButtonField(props: ButtonFieldProps) {
  const { forwardedProps } = useSplitFieldProps(props, 'date');
  const pickerContext = usePickerContext();
  const handleRef = useForkRef(pickerContext.triggerRef, pickerContext.rootRef);
  const parsedFormat = useParsedFormat();
  const valueStr =
    pickerContext.value == null
      ? parsedFormat
      : pickerContext.value.format(pickerContext.fieldFormat);

  return (
    <Button
      {...forwardedProps}
      variant="outlined"
      ref={handleRef}
      size="small"
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: 'fit-content' }}
      onClick={() => pickerContext.setOpen((prev) => !prev)}
    >
      {pickerContext.label ?? valueStr}
    </Button>
  );
}

export default function CustomDatePicker() {
  const { dateDayjs, setDate } = useTimePeriod()

  function onChangeDate(value: any) {
    setDate(value.format('YYYY-MM-DD'))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dateDayjs}
        label={dateDayjs == null ? null : dateDayjs.format('MMM DD, YYYY')}
        onChange={onChangeDate}
        slots={{ field: ButtonField }}
        slotProps={{
          nextIconButton: { size: 'small' },
          previousIconButton: { size: 'small' },
        }}
        views={['day', 'month', 'year']}
      />
    </LocalizationProvider>
  );
}
