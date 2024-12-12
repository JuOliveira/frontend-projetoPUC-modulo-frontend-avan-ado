import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import dayjs from 'dayjs'

import HeaderContainer from "../components/HeaderContainer"
import CustomButton from "../components/CustomButton"
import CustomTextInput from '../components/form/CustomTextInput'
import CustomCurrencyInput from '../components/form/CustomCurrencyInput'
import CustomSelectInput from '../components/form/CustomSelectInput'
import IconSelector from '../components/IconSelector'
import ModalContainer from '../components/ModalContainer'
import Card from '../components/Card'
import { addBudget } from '../features/budgets/budgetsSlice'

function AddBudget() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [categoryIconsOptions, setCategoriesIconsOptions] = useState([])
  const [resultModal, setResultModal] = useState(false)
  const [error, setError] = useState(false)

  const onFormSubmit = (values) => {
    const data = {
      ...values,
      usedValue: 0,
      month: dayjs().month() + 1,
      year: dayjs().year(),
    }

    dispatch(addBudget(data))
    setResultModal(true)
  }

  const handleCloseResultModal = () => {
    setResultModal(false)
    setError(false)
    navigate('/budgets')
  }

  useEffect(() => {
    let options = []
    Array.from({length: 22}, (_, index) => {
      const option = {
        id: index,
        value: "CategoryIcon"+`${index}`,
        label: <IconSelector svg={"CategoryIcon"+`${index}`} classname="icon-option"/>
      }

      options.push(option)
    })
    setCategoriesIconsOptions(options)
  },[])

  return (
    <div className="content-container">
      <Grid container rowSpacing={2} columnSpacing={3}>
        <Grid size={12}>
          <HeaderContainer title="Adicionar orçamento" hasBackButton={true}/>
        </Grid>
        <Grid size={12}>
          <Card
            cardClassname="card-container card-full card-center-align"
          >
            <h2>Novo orçamento</h2>
            <Formik
              initialValues={{
                name: '',
                maxValue: '',
                icon: '',
              }}
              onSubmit={(values) => onFormSubmit(values)}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
              }) => (
                <form onSubmit={handleSubmit} className="form-container">
                  <CustomTextInput
                    name="name"
                    isRequired={true}
                    label="Orçamento"
                    value={values.name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    placeholder="Digite o nome do orçamento"
                  />
                  <CustomCurrencyInput
                    name="maxValue"
                    value={values.maxValue}
                    isRequired={true}
                    label="Valor máximo"
                    handleChange={setFieldValue}
                  />
                  <CustomSelectInput
                    name="icon"
                    label="Ícone"
                    isRequired={true}
                    value={values.icon}
                    placeholder="Selecione um ícone"
                    options={categoryIconsOptions}
                    handleChange={handleChange}
                  />
                  <CustomButton 
                    text="Adicionar" 
                    type='submit'
                    btnClassname="button-primary button-primary--medium button-align-center"
                  />
                </form>
              )}
            </Formik>
          </Card>
        </Grid>
      </Grid>
      <ModalContainer
        open={resultModal}
        handleClose={handleCloseResultModal}
        title={error ? "Ocorreu um erro e a operação não pôde ser realizada" : "Operação realizada com sucesso!"}
        icon={error ? "Cancel" : "CheckCircle"}
      >
        <div className="modal-btns-container">
          <CustomButton 
            text="OK"
            type="button"
            onClickFunction={handleCloseResultModal}
            btnClassname="button-primary button-primary--small button-primary--fullWidth button-marginTop"
          />
        </div>
      </ModalContainer>
    </div>
  )
}

export default AddBudget