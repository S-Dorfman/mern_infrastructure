import { Link } from "react-router-dom"
import { logOut } from "../utilities/users-service"

function NavBar({user, setUser}) {
const handleLogOut = () => {
  logOut()
  setUser(null)
}

  return (
    <nav>
       <Link to="/orders">Order History</Link> 
       {" | "}
       <Link to="/orders/new">New Order</Link>
        {' '}
       <span>Welcome, {user.name}</span>
       {' '}
       <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  )
}

export default NavBar