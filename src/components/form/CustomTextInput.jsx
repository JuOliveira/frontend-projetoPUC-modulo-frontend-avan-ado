import { Input, InputLabel } from "@mui/material"

function CustomTextInput(props) {
  return (
    <div>
      <InputLabel>
        {props.label}
      </InputLabel>
      <Input
        required={props.isRequired}
        error={props.hasError}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
      {
        props.hasError &&
        <div>
          <span>{props.validationMsg}</span>
        </div>
      }
    </div>
  )
}

export default CustomTextInput