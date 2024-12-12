import { useState, useEffect } from "react"
import { 
  Drawer, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  Button, 
} from "@mui/material"
import { useNavigate, useLocation, matchPath } from "react-router-dom"

import IconSelector from "./IconSelector"
import { sidebarData } from "../data/sidebarData"

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedIndex, setSelectedIndex] = useState(sidebarData.findIndex(element => element.path === location.pathname))

  const handleItemSelection = (index) => {
    setSelectedIndex(index)
    navigate(sidebarData[index].path)
  }

  useEffect(() => {
    sidebarData.forEach((data, index) => {
      const match = matchPath({	path: data.path, end: false}, location.pathname)

			if (match !== null && (location.pathname !== '/')) {
				setSelectedIndex(index)
			} else if (location.pathname === '/addexpense') {
        setSelectedIndex(sidebarData.findIndex(element => element.path === '/expenses'))
      } else  if (location.pathname === '/addbudget') {
        setSelectedIndex(sidebarData.findIndex(element => element.path === '/budgets'))
      }
    })

  },[location])

  return (
    <Drawer
      variant="permanent"
      anchor="left"
    >
      <Button 
        startIcon={<IconSelector svg="AppLogo" classname="app-logo-icon"/>}
        onClick={() => navigate("/")}
        className="sidebar-logo-button"
      >
        <span className="logo-text">FinanSense</span>
      </Button>
      <List className="sidebar-menu">
        {sidebarData.map((data, index) => (
            <ListItemButton
              key={index}
              selected={selectedIndex === index}
              onClick={() => handleItemSelection(index)}
              className="sidebar-menu-item"             
            >
              <ListItemIcon>
                <IconSelector svg={data.icon} classname="sidebar-menu-icon"/>
              </ListItemIcon>
              <span className="sidebar-menu-text">{data.titleText}</span>
            </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar