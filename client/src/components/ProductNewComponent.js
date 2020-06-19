import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import {Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';

export class ProductNewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleAdd(event) {
    this.toggleModal();
    this.props.postProduct(this.username.value, this.aisle.value, this.description.value, false, false);
    event.preventDefault();
  }

  render() {
    return(
      <div>
        <button className="btn btn-outline-success btn-block" onClick={this.toggleModal}>
          <AddIcon />&nbsp;
          Nuevo producto
        </button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Nuevo Producto</ModalHeader>
          <ModalBody>
            <Form onSubmit={ (event) => {this.handleAdd(event); this.props.createdClick();} }>
                <FormGroup>
                    <Label htmlFor="username">Nombre</Label>
                    <Input type="text" id="username" name="username" innerRef={(input) => this.username = input} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="aisle">Pasillo</Label>
                    <Input type="text" id="aisle" name="aisle" innerRef={(input) => this.aisle = input}  />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input type="textarea" id="description" name="description" rows="4"
                    innerRef={(input) => this.description = input}  />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Añadir</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

}
