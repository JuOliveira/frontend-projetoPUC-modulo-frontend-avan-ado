import { NumberFormatBase } from "react-number-format";
import { InputLabel } from "@mui/material";

function CustomCurrencyInput(props) {
  const currencyFormatter = (value) => {
    if (!value) return ''

    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(value) / 100)

    return `${amount}`
  }

  return (
    <div className="form-input-container">
      <InputLabel className="form-input-label">
        {props.label}{props.isRequired ? "*" : ""}
      </InputLabel>
      <NumberFormatBase
        name={props.name}
        value={Number(props.value) * 100}
        required={props.isRequired}
        format={currencyFormatter}
        prefix="R$"
        valueIsNumericString
        onValueChange={(values) => {
          const val = (parseFloat(values.value)/100)
          props.handleChange(props.name, val)
        }}
        className="form-textInput"
      />
    </div>


  )
}

export default CustomCurrencyInput