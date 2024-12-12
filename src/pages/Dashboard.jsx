import { useState, useEffect } from "react"
import dayjs from "dayjs"
import Grid from "@mui/material/Grid2"
import { PieChart, BarChart, LineChart } from "@mui/x-charts"
import { useSelector, useDispatch } from "react-redux"

import HeaderContainer from "../components/HeaderContainer"
import CustomTable from "../components/CustomTable"
import BudgetList from "../components/BudgetList"
import IconSelector from "../components/IconSelector"
import Card from "../components/Card"
import { formatPieChartData, formatBarChartData, formatLineChartData, formatTableData, formatCurrencyValue } from "../utils/dataFormatters"

function Dashboard() {
  const [pieChartData, setPieChartData] = useState(null)
  const [barChartData, setBarChartData] = useState(null)
  const [lineChartData, setLineChartData] = useState(null)
  const [currentExpenseData, setCurrentExpenseData] = useState(null)
  const [currentBudgetData, setCurrentBudgetData] = useState(null)
  const [totalExpense, setTotalExpense] = useState(0)
  const expensesData = useSelector((state) => state.expenses.data)
  const budgetsData = useSelector((state) => state.budgets.data)
  const dispatch = useDispatch()

  const renderCategoryCell = (params) => {
    return (
      <div className="table-categoryCell-container">
        <IconSelector svg={params.row.icon} classname="table-category-icon"/>
        {params.row.category}
      </div>
    )
  }

  const columns = [
    { field: 'date', 
      headerName: 'Data',
      headerClassName: 'table-header',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Despesa',
      headerClassName: 'table-header',
      flex: 1
    },
    {
      field: 'value',
      headerName: 'Valor',
      headerClassName: 'table-header',
      flex: 1
    },
    {
      field: 'category',
      headerName: 'Categoria',
      headerClassName: 'table-header',
      renderCell: renderCategoryCell,
      flex: 1
    }
  ];

  useEffect(() => {
     if (expensesData && expensesData.length !== 0) {
      setPieChartData(formatPieChartData(expensesData))
      setBarChartData(formatBarChartData(expensesData))
      setLineChartData(formatLineChartData(expensesData))

      const expensesMonthData = expensesData.filter((data) => data.month === (dayjs().month() + 1) && data.year === dayjs().year())

      const total = expensesMonthData.reduce((n, {value}) => n + value, 0)

      setTotalExpense(total)
      setCurrentExpenseData(expensesMonthData)
    }

    if (budgetsData && budgetsData.length !== 0) {
      const budgetMonthData = budgetsData.filter((data) => data.month === (dayjs().month() + 1) && data.year === dayjs().year())
      setCurrentBudgetData(budgetMonthData)
    }
  }, [dispatch, expensesData, budgetsData])

  return (
    <div className="content-container">
      <Grid container rowSpacing={2} columnSpacing={3}>
        <Grid size={12}>
          <HeaderContainer title="Dashboard" hasBackButton={false}/>
        </Grid>
        <Grid size={6}>
          <Card
            title="Mês atual"
            cardClassname="card-container card-small"
          >
            <div className="card-row">
              <span className="chart-label">{formatCurrencyValue(totalExpense)} gastos totais</span>
              {pieChartData &&
              <PieChart
              series={[
                {
                  data: pieChartData,
                  innerRadius: 40
                }
              ]}
              margin={{ top: 0, bottom: 0, left: 0, right:200 }}
              slotProps={{
                legend: {
                  direction: 'column',
                  position: { vertical: 'middle', horizontal: 'right' },
                  padding: 0,
                },
              }}
              />
            }
            </div>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card
            title="Últimos 7 dias"
            cardClassname="card-container card-small"
          >
          {barChartData &&
            <BarChart
              series={barChartData.data}
              xAxis={barChartData.labels}
            />
          }
          </Card>
        </Grid>
        <Grid size={6}>
          <Card
            title="Despesas recentes"
            cardClassname="card-container card-big"
          >
            <div className="card-margin-top">
            <CustomTable
              rows={formatTableData(currentExpenseData)} 
              columns={columns}
              rowSelection={false}
              hideFooter={true}
              initialSorting={[{field: 'date', sort: 'desc'}]}
              initialPageSize={6}
            />
            </div>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card
            title="2024"
            cardClassname="card-container card-small"
          >
            {lineChartData &&
              <LineChart
                series={lineChartData.data}
                xAxis={lineChartData.labels}
              />
            }
          </Card>
          <Card
            title="Orçamentos"
            cardClassname="card-container card-small card-row-spacing"
          >
            <BudgetList
              items={currentBudgetData}
              itemsPerPage={2}
              hasDelBtn={false}
              iconSize="dashboard-list-icon"
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard