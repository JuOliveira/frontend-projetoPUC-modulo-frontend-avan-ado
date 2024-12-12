function Card(props) {
  return (
    <div className={props.cardClassname}>
      {props.title && (
        <h2 className="card-title">{props.title}</h2>
      )}
      {props.children}
    </div>
  )
}

export default Card