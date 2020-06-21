import React from 'react';
import {Link} from "react-router-dom";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {HeaderComponent} from './HeaderComponent';
import { Nav, NavItem, Button } from 'reactstrap';

export class ProductHeaderComponent extends React.Component {

  constructor(props) {
      super(props);
      this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
      this.props.logoutUser();
  }

  render() {
    const user = () => {
      if (this.props.auth.user) {
        return this.props.auth.user.username;
      }
    }
    return(
      <HeaderComponent align="mr-auto">
        <Link to="/carrito" className="green">
          <KeyboardArrowLeftIcon fontSize="large" />
          Carrito
        </Link>

        <Nav className="ml-auto" navbar>
            <NavItem>
                <div className="navbar-text mr-3">{user()}</div>
                <Button outline onClick={this.handleLogout}>
                    <span className="fa fa-sign-out fa-lg"></span> Logout
                </Button>
            </NavItem>
        </Nav>
      </HeaderComponent>
    );
  }

}
