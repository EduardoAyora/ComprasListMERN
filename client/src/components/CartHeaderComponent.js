import React from 'react';
import {Link} from "react-router-dom";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {HeaderComponent} from './HeaderComponent';

export class CartHeaderComponent extends React.Component {

  render() {
    return(
      <HeaderComponent align="ml-auto">
        <Link to="/" className="green">
          Todos mis artículos
          <KeyboardArrowRightIcon fontSize="large" />
        </Link>
      </HeaderComponent>
    );
  }

}
