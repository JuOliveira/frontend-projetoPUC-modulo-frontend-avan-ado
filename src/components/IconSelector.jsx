import Dashboard from '../assets/svg/dashboard.svg?react'
import AttachMoney from '../assets/svg/attach-money.svg?react'
import BarChart from '../assets/svg/bar-chart.svg?react'
import AppLogo from '../assets/svg/app-logo.svg?react'

function IconSelector({svg, classname}) {
  const Icons = {
    Dashboard,
    AttachMoney,
    BarChart,
    AppLogo
  }

  let Icon = Icons[svg]

  return (
    Icon ? <Icon className={classname}/> : null
  )
}

export default IconSelector