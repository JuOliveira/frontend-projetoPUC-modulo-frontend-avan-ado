function HeaderContainer(props) {
  const { title } = props
  return (
    <div>
      {title}
      {props.children}
    </div>
  )
}

export default HeaderContainer