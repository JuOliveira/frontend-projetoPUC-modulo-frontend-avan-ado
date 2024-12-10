import { useState, useEffect } from "react"
import dayjs from "dayjs"
import Grid from "@mui/material/Grid2"
import { PieChart, BarChart, LineChart } from "@mui/x-charts"
import { useSelector, useDispatch } from "react-redux"

import HeaderContainer from "../components/HeaderContainer"
import CustomTable from "../components/CustomTable"
import BudgetList from "../components/BudgetList"
import IconSelector from "../components/IconSelector"
import { formatPieChartData, formatBarChartData, formatLineChartData, formatTableData } from "../utils/dataFormatters"

function Dashboard() {
  const [pieChartData, setPieChartData] = useState(null)
  const [barChartData, setBarChartData] = useState(null)
  const [lineChartData, setLineChartData] = useState(null)
  const [currentExpenseData, setCurrentExpenseData] = useState(null)
  const [currentBudgetData, setCurrentBudgetData] = useState(null)
  const expensesData = useSelector((state) => state.expenses.data)
  const budgetsData = useSelector((state) => state.budgets.data)
  const dispatch = useDispatch()

  const renderCategoryCell = (params) => {
    return (
      <div>
        <IconSelector svg={params.row.icon} classname="iconTable"/>
        {params.row.category}
      </div>
    )
  }

  const columns = [
    { field: 'date', 
      headerName: 'Data',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Despesa',
      flex: 1
    },
    {
      field: 'value',
      headerName: 'Valor',
      flex: 1
    },
    {
      field: 'category',
      headerName: 'Categoria',
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
      setCurrentExpenseData(expensesMonthData)
    }

    if (budgetsData && budgetsData.length !== 0) {
      const budgetMonthData = budgetsData.filter((data) => data.month === (dayjs().month() + 1) && data.year === dayjs().year())
      setCurrentBudgetData(budgetMonthData)
    }
  }, [dispatch, expensesData, budgetsData])

  return (
    <div className="tempContainer">
      <Grid container spacing={2.4}>
        <Grid size={12}>
          <HeaderContainer title="Dashboard"/>
        </Grid>
        <Grid size={6}>
          {pieChartData &&
            <PieChart
            series={[
              {
                data: pieChartData,
                innerRadius: 60
              }
            ]}
            width={600}
            height={250}
          />
          }
        </Grid>
        <Grid size={6}>
          {barChartData &&
            <BarChart
              series={barChartData.data}
              xAxis={barChartData.labels}
              width={600}
              height={250}
            />
          }
        </Grid>
        <Grid size={6}>
          <CustomTable
            rows={formatTableData(currentExpenseData)} 
            columns={columns}
            rowSelection={false}
            hideFooter={true}
            initialSorting={[{field: 'date', sort: 'asc'}]}
          />
        </Grid>
        <Grid size={6}>
          <div>
            {lineChartData &&
              <LineChart
                series={lineChartData.data}
                xAxis={lineChartData.labels}
                width={600}
                height={250}
              />
            }
          </div>
          <div>
          <BudgetList
            items={currentBudgetData}
            itemsPerPage={4}
            hasDelBtn={false}
          />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard