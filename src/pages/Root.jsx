import { Outlet } from "react-router-dom"

import Sidebar from "../components/Sidebar"

function Root() {
  return (
    <div>
      <Sidebar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Root