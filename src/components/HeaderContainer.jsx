import { useNavigate } from "react-router-dom"

import CustomButton from "../components/CustomButton"
import IconSelector from "./IconSelector"

function HeaderContainer(props) {
  const { title, hasBackButton } = props
  const navigate = useNavigate()

  return (
    <div className="header-container">
      {hasBackButton && (
        <CustomButton 
          text={<span className="button-text"><IconSelector svg="KeyboardArrowLeft" classname="back-button-icon"/>Voltar</span>} 
          btnClassname="back-button" 
          onClickFunction={() => navigate(-1)}
        />
      )}
      <h1>{title}</h1>
      {props.children}
    </div>
  )
}

export default HeaderContainer