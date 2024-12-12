import { InputLabel } from "@mui/material"

function CustomTextInput(props) {
  return (
    <div className="form-input-container">
      <InputLabel
        className="form-input-label"
      >
        {props.label}
      </InputLabel>
      <input
        name={props.name}
        value={props.value}
        required={props.isRequired}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className="form-textInput"
      />
    </div>
  )
}

export default CustomTextInput