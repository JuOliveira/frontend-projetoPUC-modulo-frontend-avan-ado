import { Dialog, IconButton } from "@mui/material"

import IconSelector from "./IconSelector"

function ModalContainer(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <div>
        <IconButton
          onClick={props.handleClose}
        >
          <IconSelector svg="Close" classname="button-icon"/>
        </IconButton>
        <IconSelector svg={props.icon} classname={"modal-icon"}/>
        {props.title}
        {props.children}
      </div>
    </Dialog>
  )
}

export default ModalContainer