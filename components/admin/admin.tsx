interface User {
  name: string
}

const Admin = (props: User) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

export default Admin
