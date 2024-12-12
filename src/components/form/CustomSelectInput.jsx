import { Select, InputLabel, MenuItem } from "@mui/material"

function CustomSelectInput(props) {
  return (
    <div className="form-input-container">
      <InputLabel className="form-input-label">
        {props.label}
      </InputLabel>
      <Select
        displayEmpty
        name={props.name}
        value={props.value}
        required={props.isRequired}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 350,
              maxWidth: 480,
            }
          }
        }}
        className="form-selectInput"
      >
        <MenuItem disabled value="">{props.placeholder}</MenuItem>
        {props.options.map((option) => (
          <MenuItem className="select-input-option" key={option.id} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default CustomSelectInput