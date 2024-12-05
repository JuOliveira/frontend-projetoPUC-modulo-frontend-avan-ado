import Dashboard from '../assets/svg/dashboard.svg?react'
import AttachMoney from '../assets/svg/attach-money.svg?react'
import BarChart from '../assets/svg/bar-chart.svg?react'
import AppLogo from '../assets/svg/app-logo.svg?react'
import CreditCard from '../assets/svg/credit-card.svg?react'
import Restaurant from '../assets/svg/restaurant.svg?react'
import DirectionsBus from '../assets/svg/directions-bus.svg?react'
import HealthMetrics from '../assets/svg/health-metrics.svg?react'

function IconSelector({svg, classname}) {
  const Icons = {
    Dashboard,
    AttachMoney,
    BarChart,
    AppLogo,
    CreditCard,
    Restaurant,
    DirectionsBus,
    HealthMetrics
  }

  let Icon = Icons[svg]

  return (
    Icon ? <Icon className={classname}/> : null
  )
}

export default IconSelector