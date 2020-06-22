import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export class LoginComponent extends React.Component {

  constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(event) {
      this.props.loginUser({username: this.username.value, password: this.password.value});
      event.preventDefault();
  }

  handleSignup(event) {
      this.props.signUpUser({username: this.usern.value, password: this.pass.value});
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
              <Button type="submit" value="submit" color="primary">Ingresar</Button>
          </Form>
          <div className="mt-4 mb-4">
            ¿No tienes una cuenta? Puedes registrarte aquí:
          </div>
          <Form onSubmit={this.handleSignup}>
              <FormGroup>
                  <Label htmlFor="username2">Nombre de usuario</Label>
                  <Input type="text" id="username2" name="username2"
                      innerRef={(input) => this.usern = input} />
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="pass">Contraseña</Label>
                  <Input type="password" id="pass" name="pass"
                      innerRef={(input) => this.pass = input}  />
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="pass2">Repite la contraseña</Label>
                  <Input type="password" id="pass2" name="pass2"
                      innerRef={(input) => this.pass2 = input}  />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Registrarte</Button>
          </Form>
      </div>
    );
  }
}
