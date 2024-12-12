import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputLabel } from '@mui/material';
import 'dayjs/locale/pt-br'

function CustomDatePickerInput(props) {
  return (
    <div>
      <InputLabel className="form-input-label">
        {props.label}
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          name={props.name}
          views={props.views}
          value={props.value}
          onChange={props.handleChange}
          placeholder={props.placeholder}
          slotProps={{
            textField: {
              sx: {
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  fontWeight: "400",
                  color: "#000000",
                  "&.Mui-focused fieldset": {
                    borderColor: "#831A0C",
                    borderWidth: "1px",
                  }
                },
                ".MuiOutlinedInput-root-Mui-focused": {
                  borderColor: "#831A0C",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#CED4DA",
                },
                ".MuiOutlinedInput-input": {
                  padding: "14px",
                },
              }
            },
            day: {
              sx: {
                "&.MuiPickersDay-root.Mui-selected": {
                  backgroundColor: "#831A0C",
                  color: "#FFFFFF",
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
    </div>
  )
}

export default CustomDatePickerInput