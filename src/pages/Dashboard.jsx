import { useState, useEffect } from "react"
import dayjs from "dayjs"
import Grid from "@mui/material/Grid2"
import { PieChart, BarChart, LineChart } from "@mui/x-charts"

import HeaderContainer from "../components/HeaderContainer"
import CustomTable from "../components/CustomTable"
import BudgetList from "../components/BudgetList"
import IconSelector from "../components/IconSelector"
import expensesData from '../data/expensesData.json'
import budgetsData from '../data/budgetData.json'
import { formatPieChartData, formatBarChartData, formatLineChartData } from "../utils/dataFormatters"

function Dashboard() {
  const [pieChartData, setPieChartData] = useState(null)
  const [barChartData, setBarChartData] = useState(null)
  const [lineChartData, setLineChartData] = useState(null)
  const [expenseData, setExpenseData] = useState(null)
  const [budgetData, setBudgetData] = useState(null)

  const renderCategoryCell = (params) => {
    //console.log("params", params)
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
    setPieChartData(formatPieChartData(expensesData.expenses))
    setBarChartData(formatBarChartData(expensesData.expenses))
    setLineChartData(formatLineChartData(expensesData.expenses))

    const expensesMonthData = expensesData.expenses.filter((data) => data.month === (dayjs().month() + 1) && data.year === dayjs().year())
    setExpenseData(expensesMonthData)

    const budgetMonthData = budgetsData.budgets.filter((data) => data.month === (dayjs().month() + 1) && data.year === dayjs().year())
    setBudgetData(budgetMonthData)
  }, [])

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
            rows={expenseData} 
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
            items={budgetData}
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