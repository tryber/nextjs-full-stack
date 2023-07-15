import Admin from '@/components/admin/admin'
import axios from 'axios'

interface User {
  name: string
}

const AdminPage = async () => {
  const { data } = await axios.get(`http:localhost:3000/api/users`)
  const user = data as User
  return <Admin name={user.name} />
}

export default AdminPage
