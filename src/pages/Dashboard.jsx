import Grid from "@mui/material/Grid2"

import HeaderContainer from "../components/HeaderContainer"

function Dashboard() {
  return (
    <div className="tempContainer">
      <Grid container spacing={2.4}>
        <Grid size={12}>
          <HeaderContainer title="Dashboard"/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard