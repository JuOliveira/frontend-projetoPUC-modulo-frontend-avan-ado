import { Button } from "@mui/material"

function CustomButton(props) {
  const { text, onClickFunction } = props
  return (
    <Button
      type={props.type}
      onClick={onClickFunction}
    >
      {text}
    </Button>
  )
}

export default CustomButton