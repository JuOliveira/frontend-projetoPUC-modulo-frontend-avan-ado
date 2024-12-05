import { Outlet } from "react-router-dom"

import Sidebar from "../components/Sidebar"

function Root() {
  return (
    <div>
      <Sidebar/>
      <div className="main-container">
        <Outlet/>
      </div>
    </div>
  )
}

export default Root