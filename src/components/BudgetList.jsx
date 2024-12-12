import { useState, useEffect } from "react"
import { List, ListItem, Pagination, LinearProgress } from "@mui/material"

import IconSelector from "./IconSelector"
import CustomButton from "./CustomButton"
import { formatCurrencyValue } from "../utils/dataFormatters"

function BudgetList(props) {
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(0)

  const handleChange = (_event,value) => {
    setPage(value)
  }

  useEffect(() => {
    if (props.items && props.items.length !== 0) {
      setNumberOfPages(Math.ceil(props.items.length / props.itemsPerPage))
    }
  }, [props.items, props.itemsPerPage])

  return (
    <div className="list-container">
      <List
        className="list"
      >
        {props.items && props.items.slice((page - 1) * props.itemsPerPage, page * props.itemsPerPage).map((item) => (
          <ListItem
            key={item.id}
            className="list-item"
          >
            <div className="list-item-container">
              <IconSelector svg={item.icon} classname={props.iconSize}/>
              <div className="list-item">
                {item.name}
                <LinearProgress 
                  variant="determinate" 
                  value={Math.round((item.usedValue / item.maxValue) * 100)}
                  className="list-progress-bar"
                />
                <div className="progress-value-container">
                  <span className="progress-value-text">Utilizado: {formatCurrencyValue(item.usedValue)}</span>
                  <span className="progress-value-text">Limite máximo: {formatCurrencyValue(item.maxValue)}</span>
                </div>
              </div>
              <span className="list-item-percentage">{Math.round((item.usedValue / item.maxValue) * 100)}%</span>
              {props.hasDelBtn &&
                <CustomButton
                  text={<span className="button-text"><IconSelector svg="DeleteForever" classname="button-icon"/>Excluir</span>}
                  type="button"
                  btnClassname="button-primary button-primary--small"
                  onClickFunction={() => props.delFunction(item.id)}
                />
              }
            </div>
          </ListItem>
        ))}
      </List>
      <div className="pagination-container">
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
      </div>
    </div>
  )
}

export default BudgetList