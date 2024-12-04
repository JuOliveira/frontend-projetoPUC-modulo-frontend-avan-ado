import { DataGrid } from "@mui/x-data-grid"

function CustomTable(props) {
  return (
    <div>
      <DataGrid 
        rows={props.rows} 
        columns={props.columns}
        rowSelection={props.rowSelection}
        hideFooter={props.hideFooter}
      />
    </div>
  )
}

export default CustomTable