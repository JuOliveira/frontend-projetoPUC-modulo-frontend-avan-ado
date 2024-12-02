import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Button, 
} from "@mui/material"
import { useNavigate } from "react-router-dom"

import IconSelector from "./IconSelector"
import { sidebarData } from "../data/sidebarData"

function Sidebar() {
  const navigate = useNavigate()

  const handleItemSelection = (index) => {
    navigate(sidebarData[index].path)
  }

  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
      >
        <Button 
          startIcon={<IconSelector svg="AppLogo" classname="app-logo-icon"/>}
          onClick={() => navigate("/")}
        >
          FinanSense
        </Button>
        <List>
          {sidebarData.map((data, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleItemSelection(index)}              
              >
                <ListItemIcon>
                  <IconSelector svg={data.icon} classname="sidebar-icon"/>
                </ListItemIcon>
                <ListItemText primary={data.titleText}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

export default Sidebar