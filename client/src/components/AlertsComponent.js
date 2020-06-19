import React from 'react';
import { Alert } from 'reactstrap';

export class AlertsComponent extends React.Component {

  render() {
    return(
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <Alert color="success" isOpen={this.props.alertAddedVisible}>
              Se añadió producto a carrito
            </Alert>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <Alert color="danger" isOpen={this.props.alertDeletedVisible}>
              Se eliminó el producto
            </Alert>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <Alert color="success" isOpen={this.props.alertAllAddedVisible}>
              Se añadieron todos los productos al carrito
            </Alert>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <Alert color="success" isOpen={this.props.alertCreatedVisible}>
              Se ha creado el nuevo producto
            </Alert>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <Alert color="success" isOpen={this.props.alertGoneVisible}>
              Se ha quitado el/los productos
            </Alert>
          </div>
        </div>
      </div>
    );
  }

}
