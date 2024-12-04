
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br'

function CustomDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        views={props.views}
        value={props.value}
        onChange={(newValue) => props.setDateValue(newValue)}
      />
    </LocalizationProvider>
  )
}

export default CustomDatePicker