import React from 'react';
import {Navbar} from 'reactstrap';

export function HeaderComponent(props) {
  return(
    <Navbar className="mb-4" color="light" light expand="md">
      <div className="container">
        <div className={props.align}>
          {props.children}
        </div>
      </div>
    </Navbar>
  );
}
