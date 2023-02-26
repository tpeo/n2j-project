import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/apts">Apartments</Link>
          </li>
          <li>
            <Link to="/myapts">My Apartments</Link>
          </li>
          <li>
            <Link to="/newapt">Add Apartment</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;