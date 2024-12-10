import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputLabel } from '@mui/material';
import 'dayjs/locale/pt-br'

function CustomDatePickerInput(props) {
  return (
    <div>
      <InputLabel>
        {props.label}
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          name={props.name}
          views={props.views}
          value={props.value}
          onChange={props.handleChange}
          placeholder={props.placeholder}
        />
      </LocalizationProvider>
    </div>
  )
}

export default CustomDatePickerInput