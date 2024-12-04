import HeaderContainer from "../components/HeaderContainer"
import CustomButton from "../components/CustomButton"
import CustomDatePicker from "../components/CustomDatePicker"

function Budgets() {
  return (
    <div className="tempContainer">
      <HeaderContainer title="Orçamentos">
        <CustomDatePicker views={['month', 'year']}/>
        <CustomButton text="Novo orçamento"/>
      </HeaderContainer>
    </div>
  )
}

export default Budgets