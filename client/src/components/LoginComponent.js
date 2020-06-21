import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export class LoginComponent extends React.Component {

  constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
      this.props.loginUser({username: this.username.value, password: this.password.value});
      event.preventDefault();
  }

  render() {
    return(
      <div>
          <Form onSubmit={this.handleLogin}>
              <FormGroup>
                  <Label htmlFor="username">Nombre de usuario</Label>
                  <Input type="text" id="username" name="username"
                      innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input type="password" id="password" name="password"
                      innerRef={(input) => this.password = input}  />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
          </Form>
      </div>
    );
  }
}
