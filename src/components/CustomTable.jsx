import { DataGrid } from "@mui/x-data-grid"

function CustomTable(props) {
  return (
    <div>
      <DataGrid
        className="table"
        rows={props.rows} 
        columns={props.columns}
        rowSelection={props.rowSelection}
        hideFooter={props.hideFooter}
        disableColumnMenu
        disableColumnResize
        initialState={{
          sorting: {
            sortModel: props.initialSorting,
          },
          pagination: {
            paginationModel: {
              pageSize: props.initialPageSize,
            },
            
          }
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        slotProps={{
          pagination: {
            labelRowsPerPage: "Itens por página",
            labelDisplayedRows: ({ from, to, count }) =>
              `${from} - ${to} de ${count === -1 ? `mais que ${to}` : count}`,
            showFirstButton: true,
            showLastButton: true,
            className: "table-pagination",
          }
        }}
      />
    </div>
  )
}

export default CustomTable