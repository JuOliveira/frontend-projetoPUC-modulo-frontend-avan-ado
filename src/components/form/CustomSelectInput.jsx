import { Select, InputLabel, MenuItem } from "@mui/material"

function CustomSelectInput(props) {
  return (
    <div>
      <InputLabel>
        {props.label}
      </InputLabel>
      <Select
        displayEmpty
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 350
            }
          }
        }}
      >
        <MenuItem disabled value="">{props.placeholder}</MenuItem>
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default CustomSelectInput