import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'

import HeaderContainer from "../components/HeaderContainer"
import CustomButton from "../components/CustomButton"

function AddExpense() {
  const navigate = useNavigate()

  const backFunction = () => navigate(-1)
  return (
    <div className="tempContainer">
      <Grid container spacing={2.4}>
        <Grid size={12}>
          <HeaderContainer title="Adicionar Despesa">
              <CustomButton text="Voltar" onClickFunction={backFunction}/>
          </HeaderContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddExpense