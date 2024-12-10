import { useState } from "react"
import { List, ListItem, Pagination, LinearProgress } from "@mui/material"

import IconSelector from "./IconSelector"
import CustomButton from "./CustomButton"
import { formatCurrencyValue } from "../utils/dataFormatters"

function BudgetList(props) {
  const [page, setPage] = useState(1)
  const [numberOfPages] = useState(props.items !== null ? Math.ceil(props.items.length / props.itemsPerPage) : 1)

  const handleChange = (_event,value) => {
    setPage(value)
  }

  return (
    <div className="budget-list-container">
      <List
        className="list"
      >
        {props.items && props.items.slice((page - 1) * props.itemsPerPage, page * props.itemsPerPage).map((item) => (
          <ListItem
            key={item.id}
            className="list-item"
          >
            <div className="budget-item-container">
              <IconSelector svg={item.icon} classname="icon-svg"/>
              <div className="list-item">
                {item.name}
                <LinearProgress variant="determinate" value={Math.round((item.usedValue / item.maxValue) * 100)}/>
                <div>
                  <span>Utilizado: {formatCurrencyValue(item.usedValue)}</span>
                  <span>Limite máximo: {formatCurrencyValue(item.maxValue)}</span>
                </div>
              </div>
              <span>{Math.round((item.usedValue / item.maxValue) * 100)}%</span>
              {props.hasDelBtn &&
                <CustomButton
                  text="Excluir"
                  onClickFunction={() => props.delFunction(item.id)}
                />
              }
            </div>
          </ListItem>
        ))}
      </List>
      <div>
        {numberOfPages > 1 &&
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={handleChange}
          />
        }
      </div>
    </div>
  )
}

export default BudgetList