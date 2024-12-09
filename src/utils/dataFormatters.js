import dayjs from "dayjs";

export function formatPieChartData(data) {
  const monthData = data.filter(item => dayjs().month() === dayjs(item.date).month())

  const categoryData = monthData.reduce((accumulator, currentValue) => {
    (accumulator[currentValue.category] = accumulator[currentValue.category] || []).push(currentValue)
    return accumulator
  },{})

  const pieChartData = []

  for (const [k, v] of Object.entries(categoryData)) {
    const dataSum = v.reduce((n, {value}) => n + value, 0)
    pieChartData.push({'value': Math.round(dataSum * 100) / 100, 'label': k})
  }

  return pieChartData
}

export function formatBarChartData(data) {
  const last7DaysData = data.filter(item => dayjs(item.date).valueOf() > dayjs().valueOf() - 604800000)

  const categories = new Set(last7DaysData.map(value => value.category))

  const categoriesFiltered = [...categories]

  let last7Days = []

  let dataSorted = {}

  categoriesFiltered.forEach(category => {
    dataSorted[category] = []
  })

  for (let i = 6; i >= 0 ; i--) {
    last7Days.push(dayjs().subtract(i, 'day').format('DD/MM/YYYY'))

    const dayData = last7DaysData.filter(data => dayjs(data.date).format('DD/MM/YYYY') === dayjs().subtract(i, 'day').format('DD/MM/YYYY'))

    if (dayData.length === 0) {
      categoriesFiltered.forEach(category => {
        dataSorted[category].push(0)
      })
    } else {
      const categoryDayData = dayData.reduce((accumulator, currentValue) => {
        (accumulator[currentValue.category] = accumulator[currentValue.category] || []).push(currentValue)
        return accumulator
      },{})

      categoriesFiltered.forEach(category => {
        if (Object.hasOwn(categoryDayData, category)) {
          const dataSum = categoryDayData[category].reduce((n, {value}) => n + value, 0)
          dataSorted[category].push(Math.round(dataSum * 100) / 100)
        } else {
          dataSorted[category].push(0)
        }
      })
    }
  }

  let seriesResult = []

  for (const [k, v] of Object.entries(dataSorted)) {
    seriesResult.push({
      data: v,
      label: k,
      stack: 'total'
    })
  }

  let xLabelsResult = [{data: last7Days, scaleType: 'band'}]

  return {
    data: seriesResult,
    labels: xLabelsResult
  }

}

export function formatLineChartData(data) {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  const yearData = []

  months.forEach((month, index) => {
    const monthData = data.filter(item => dayjs(item.date).month() === index)

    console.log('monthData', monthData)

    const dataSum = monthData.reduce((n, {value}) => n + value, 0)

    yearData.push(Math.round(dataSum * 100) / 100)
  })

  return {
    data: [{data: yearData, label: 'Gastos totais em reais'}],
    labels: [{scaleType: 'point', data: months}]
  }
}