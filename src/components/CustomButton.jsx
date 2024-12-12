import { Button } from "@mui/material"

function CustomButton(props) {
  const { text, onClickFunction, type, btnClassname } = props
  return (
    <Button
      type={type}
      onClick={onClickFunction}
      className={btnClassname}
    >
      {text}
    </Button>
  )
}

export default CustomButton