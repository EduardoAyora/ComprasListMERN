import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginUser: '',
      loginPassword: '',
      signUpUser: '',
      signUpPassword1: '',
      signUpPassword2: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(event) {
    const login = this.state.loginUser;
    const loginPass = this.state.loginPassword;
    if(loginPass.length < 6) {
      alert('Su contraseña debe tener al menos 6 caracteres');
    }
    else if(login === ''){
      alert('Su nombre no debe estar vacío');
    }else {
      this.props.loginUser({username: this.username.value, password: this.password.value});
    }
    event.preventDefault();
  }

  handleSignup(event) {
    const signup = this.state.signUpUser;
    const signupPass1 = this.state.signUpPassword1;
    const signupPass2 = this.state.signUpPassword2;
    if(signupPass1 !== signupPass2) {
      alert('Sus contraseñas no coinciden');
    }
    else if(signupPass1.length < 6) {
      alert('Su contraseña debe tener al menos 6 caracteres');
    }
    else if(signup === ''){
      alert('Su nombre no debe estar vacío');
    }
    else {
      this.props.signUpUser({username: this.usern.value, password: this.pass.value});
    }
    event.preventDefault();
  }

  render() {
    const login = this.state.loginUser;
    const loginPass = this.state.loginPassword;
    const signup = this.state.signUpUser;
    const signupPass1 = this.state.signUpPassword1;
    const signupPass2 = this.state.signUpPassword2;
    const error = this.props.errMess;
    const signUpError = this.props.signUpError;
    const message = this.props.message;
    let messages = [];
    const renderError = (varError, clase) => {
      messages.push(
        <div className="container">
         <div className="row justify-content-center">
           <h4 className={clase}>{varError}</h4>
         </div>
        </div>
      );
    }
    if (error) {
      renderError(error, 'text-danger');
    }
    else if (signUpError) {
      renderError(signUpError, 'text-danger');
    }
    else if (message) {
      renderError(message, 'text-success');
    }
    else {
      messages.push(<span></span>);
    }
    return(
      <div className="container mt-5">
        <div className="row justify-content-center register">
          <div className="col-10 col-lg-6 ">
            <div className="">
              {messages}
              <Form onSubmit={this.handleLogin}>
                  <FormGroup>
                      <Label htmlFor="username">Nombre de usuario</Label>
                      <Input type="text" id="username" name="username"
                          innerRef={(input) => this.username = input}
                          value={login}
                          onChange={(event) => this.setState({loginUser: event.target.value})} />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="password">Contraseña</Label>
                      <Input type="password" id="password" name="password"
                          innerRef={(input) => this.password = input}
                          value={loginPass}
                          onChange={(event) => this.setState({loginPassword: event.target.value})} />
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
                          innerRef={(input) => this.usern = input}
                          value={signup}
                          onChange={(event) => this.setState({signUpUser: event.target.value})}/>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="pass">Contraseña</Label>
                      <Input type="password" id="pass" name="pass"
                          innerRef={(input) => this.pass = input}
                          value={signupPass1}
                          onChange={(event) => this.setState({signUpPassword1: event.target.value})} />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="pass2">Repite la contraseña</Label>
                      <Input type="password" id="pass2" name="pass2"
                          innerRef={(input) => this.pass2 = input}
                          value={signupPass2}
                          onChange={(event) => this.setState({signUpPassword2: event.target.value})} />
                  </FormGroup>
                  <Button type="submit" value="submit" color="primary">Registrarte</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
