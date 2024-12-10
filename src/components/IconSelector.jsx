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
import Close from '../assets/svg/close.svg?react'
import ErrorCircleRounded from '../assets/svg/error-circle-rounded.svg?react'
import CheckCircle from '../assets/svg/check-circle.svg?react'
import Cancel from '../assets/svg/cancel.svg?react'
import CategoryIcon0 from '../assets/svg/category-icon-0.svg?react'
import CategoryIcon1 from '../assets/svg/category-icon-1.svg?react'
import CategoryIcon2 from '../assets/svg/category-icon-2.svg?react'
import CategoryIcon3 from '../assets/svg/category-icon-3.svg?react'
import CategoryIcon4 from '../assets/svg/category-icon-4.svg?react'
import CategoryIcon5 from '../assets/svg/category-icon-5.svg?react'
import CategoryIcon6 from '../assets/svg/category-icon-6.svg?react'
import CategoryIcon7 from '../assets/svg/category-icon-7.svg?react'
import CategoryIcon8 from '../assets/svg/category-icon-8.svg?react'
import CategoryIcon9 from '../assets/svg/category-icon-9.svg?react'
import CategoryIcon10 from '../assets/svg/category-icon-10.svg?react'
import CategoryIcon11 from '../assets/svg/category-icon-11.svg?react'
import CategoryIcon12 from '../assets/svg/category-icon-12.svg?react'
import CategoryIcon13 from '../assets/svg/category-icon-13.svg?react'
import CategoryIcon14 from '../assets/svg/category-icon-14.svg?react'
import CategoryIcon15 from '../assets/svg/category-icon-15.svg?react'
import CategoryIcon16 from '../assets/svg/category-icon-16.svg?react'
import CategoryIcon17 from '../assets/svg/category-icon-17.svg?react'
import CategoryIcon18 from '../assets/svg/category-icon-18.svg?react'
import CategoryIcon19 from '../assets/svg/category-icon-19.svg?react'
import CategoryIcon20 from '../assets/svg/category-icon-20.svg?react'
import CategoryIcon21 from '../assets/svg/category-icon-21.svg?react'

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
    AccountBalance,
    Close,
    ErrorCircleRounded,
    CheckCircle,
    Cancel,
    CategoryIcon0,
    CategoryIcon1,
    CategoryIcon2,
    CategoryIcon3,
    CategoryIcon4,
    CategoryIcon5,
    CategoryIcon6,
    CategoryIcon7,
    CategoryIcon8,
    CategoryIcon9,
    CategoryIcon10,
    CategoryIcon11,
    CategoryIcon12,
    CategoryIcon13,
    CategoryIcon14,
    CategoryIcon15,
    CategoryIcon16,
    CategoryIcon17,
    CategoryIcon18,
    CategoryIcon19,
    CategoryIcon20,
    CategoryIcon21
  }

  let Icon = Icons[svg]

  return (
    Icon ? <Icon className={classname}/> : null
  )
}

export default IconSelector