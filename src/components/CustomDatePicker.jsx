
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
        slotProps={{
          textField: {
            sx: {
              marginRight: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                fontWeight: "700",
                color: "#831A0C",
                height: "40px",
                "&.Mui-focused fieldset": {
                  borderColor: "#831A0C",
                  borderWidth: "1px",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#831A0C",
              },
              svg: {
                color: "#831A0C",
              }
            }
          },
          monthButton: {
            sx: {
              "&.MuiPickersMonth-monthButton.Mui-selected": {
                backgroundColor: "#831A0C",
                color: "#FFFFFF",
              }
            }
          },
          yearButton: {
            sx: {
              "&.MuiPickersYear-yearButton.Mui-selected": {
                backgroundColor: "#831A0C",
                color: "#FFFFFF",
              }
            }
          }
        }}
      />
    </LocalizationProvider>
  )
}

export default CustomDatePicker