import React from 'react';
import {Link} from "react-router-dom";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {HeaderComponent} from './HeaderComponent';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';

export class ProductHeaderComponent extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          isModalOpen: false
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
  }

  toggleModal() {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
  }

  handleLogin(event) {
      this.toggleModal();
      this.props.loginUser({username: this.username.value, password: this.password.value});
      event.preventDefault();
  }

  handleLogout() {
      this.props.logoutUser();
  }

  render() {
    return(
      <HeaderComponent align="mr-auto">
        <Link to="/carrito" className="green">
          <KeyboardArrowLeftIcon fontSize="large" />
          Carrito
        </Link>

        <Nav className="ml-auto" navbar>
            <NavItem>
                { !this.props.auth.isAuthenticated ?
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-sign-in fa-lg"></span> Login
                        {this.props.auth.isFetching ?
                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                            : null
                        }
                    </Button>
                    :
                    <div>
                    <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                    <Button outline onClick={this.handleLogout}>
                        <span className="fa fa-sign-out fa-lg"></span> Logout
                        {this.props.auth.isFetching ?
                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                            : null
                        }
                    </Button>
                    </div>
                }
            </NavItem>
        </Nav>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.handleLogin}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" name="username"
                            innerRef={(input) => this.username = input} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password"
                            innerRef={(input) => this.password = input}  />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="remember"
                            innerRef={(input) => this.remember = input}  />
                            Remember me
                        </Label>
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary">Login</Button>
                </Form>
            </ModalBody>
        </Modal>
      </HeaderComponent>
    );
  }

}
