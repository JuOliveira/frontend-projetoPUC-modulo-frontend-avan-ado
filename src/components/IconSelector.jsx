import Dashboard from '../assets/svg/dashboard.svg?react'
import AttachMoney from '../assets/svg/attach-money.svg?react'
import BarChart from '../assets/svg/bar-chart.svg?react'
import AppLogo from '../assets/svg/app-logo.svg?react'
import CreditCard from '../assets/svg/credit-card.svg?react'
import Restaurant from '../assets/svg/restaurant.svg?react'
import DirectionsBus from '../assets/svg/directions-bus.svg?react'
import HealthMetrics from '../assets/svg/health-metrics.svg?react'
import ReceiptLong from '../assets/svg/receipt-long.svg?react'
import Pets from '../assets/svg/pets.svg?react'
import LocalMovies from '../assets/svg/local-movies.svg?react'
import LocalGasStation from '../assets/svg/local-gas-station.svg?react'
import House from '../assets/svg/house.svg?react'
import Savings from '../assets/svg/savings.svg?react'
import School from '../assets/svg/school.svg?react'
import ShoppingBag from '../assets/svg/shopping-bag.svg?react'
import ShoppingCart from '../assets/svg/shopping-cart.svg?react'
import ShoppingMode from '../assets/svg/shopping-mode.svg?react'
import Travel from '../assets/svg/travel.svg?react'
import FitnessCenter from '../assets/svg/fitness-center.svg?react'
import FormatPaint from '../assets/svg/format-paint.svg?react'
import FastFood from '../assets/svg/fastfood.svg?react'
import DirectionsCar from '../assets/svg/directions-car.svg?react'
import AccountBalance from '../assets/svg/account-balance.svg?react'

function IconSelector({svg, classname}) {
  const Icons = {
    Dashboard,
    AttachMoney,
    BarChart,
    AppLogo,
    CreditCard,
    Restaurant,
    DirectionsBus,
    HealthMetrics,
    ReceiptLong,
    Pets,
    LocalMovies,
    LocalGasStation,
    House,
    Savings,
    School,
    ShoppingBag,
    ShoppingCart,
    ShoppingMode,
    Travel,
    FitnessCenter,
    FormatPaint,
    FastFood,
    DirectionsCar,
    AccountBalance
  }

  let Icon = Icons[svg]

  return (
    Icon ? <Icon className={classname}/> : null
  )
}

export default IconSelector