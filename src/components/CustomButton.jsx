import { Button } from "@mui/material"

function CustomButton(props) {
  const { text, onClickFunction } = props
  return (
    <Button
      onClick={onClickFunction}
    >
      {text}
    </Button>
  )
}

export default CustomButton