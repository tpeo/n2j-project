import { Outlet, Link } from "react-router-dom";
import SearchBar from "./SearchBar.js";
import "onsenui/css/onsen-css-components.css";
import { Page, Toolbar, ToolbarButton, BackButton, Icon } from "react-onsenui";

const Layout = () => {
  return (
    <>
      <Page
        renderToolbar={() => (
          <Toolbar>
            <div className="left">
              <BackButton>Back</BackButton>
            </div>
            <div className="center">Menu</div>
            <div className="right">
              <ToolbarButton>
                <Icon icon="md-menu" />
              </ToolbarButton>
            </div>
          </Toolbar>
        )}
      >
        <div>
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
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/logout">Log Out</Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      </Page>

      <SearchBar placeholder="Search for an apartment" />
    </>
  );
};

export default Layout;
