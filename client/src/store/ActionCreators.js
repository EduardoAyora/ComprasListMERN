import * as ActionTypes from './ActionTypes';
// import { baseUrl } from '../shared/baseUrl';

// ADD ---

export const addProduct = (product) => ({
    type: ActionTypes.ADD_PRODUCT,
    payload: product
});

export const postProduct = (name, aisle, description, inCart, marked) => (dispatch) => {
  const newProduct = {
      name: name,
      aisle: aisle,
      description: description,
      inCart: inCart,
      marked: marked
  };

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch('/products', {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addProduct(response)))
  .catch(error =>  { console.log('post products', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

// UPDATE ---

export const updateProduct = (product) => ({
    type: ActionTypes.UPDATE_PRODUCT,
    payload: product
});

export const postUpdateProduct = (id, name, aisle, description, inCart, marked) => (dispatch) => {
  const updatedProduct = {
      name: name,
      aisle: aisle,
      description: description,
      inCart: inCart,
      marked: marked
  };

  let updated = updatedProduct;
  updated._id = id;
  dispatch(updateProduct(updated));

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch('/products/' + id, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(updateProduct(response)))
  .catch(error =>  { console.log('post products', error.message); alert('Tu producto no pudo actualizarse\nError: '+error.message); });
};

// DELETE ---

export const deleteProduct = (deleted) => ({
    type: ActionTypes.DELETE_PRODUCT,
    payload: deleted
});

export const postDeleteProduct = (id) => (dispatch) => {

  const objId = {
      id: id
  };

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch('/products/' + id, {
      method: "DELETE",
      body: JSON.stringify(objId),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(deleteProduct(response)))
  .catch(error =>  { console.log('post products', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

// FETCH ---

export const fetchProducts = () => (dispatch) => {
    dispatch(productsLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    // return fetch(baseUrl + 'products', {
    return fetch('/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(products => dispatch(addProducts(products)))
    .catch(error => dispatch(productsFailed(error.message)));
}

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});

export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

// -- LOGIN

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    // return fetch(baseUrl + 'users/login', {
    return fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }

        dispatch(productsLoading(true));
        const bearer = 'Bearer ' + localStorage.getItem('token');
        return fetch('/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            credentials: 'same-origin'
        })

    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(products => dispatch(addProducts(products)))
    .catch(error => dispatch(loginError(error.message)))
    .catch(error => dispatch(productsFailed(error.message)));
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    dispatch(requestLogout())
    dispatch(signupClear())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}

export const signupClear = () => {
  return {
    type: ActionTypes.SIGNUP_CLEAR
  }
}

// ---signUpUser
export const receiveSignUp = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        status: response.status
    }
}

export const signUpError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

export const signUpUser = (creds) => (dispatch) => {
    return fetch('/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // Dispatch the success action
            dispatch(receiveSignUp(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(signUpError(error.message)))
};
