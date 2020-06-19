import * as ActionTypes from './ActionTypes';

// existe solo un reducer para para cada parte del estado que quiero afectar, si quiero afectar
// los productos, necesito un reducer para el producto

export const Products = (state = { isLoading: true,
    errMess: null,
    products:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PRODUCTS:
            return {...state, isLoading: false, errMess: null, products: action.payload};

        case ActionTypes.PRODUCTS_LOADING:
            return {...state, isLoading: true, errMess: null, products: []}

        case ActionTypes.PRODUCTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_PRODUCT:
            var product = action.payload;
            return { ...state, isLoading: false, products: state.products.concat(product)};

        case ActionTypes.DELETE_PRODUCT:
            var deleted = action.payload;
            return { ...state, isLoading: false, products: state.products.filter(product => product.id !== deleted.id)};

        case ActionTypes.UPDATE_PRODUCT:
            const index = state.products.findIndex(product => product.id === action.payload.id);
            let newState = [...state.products];
            newState[index] = action.payload;
            return {...state, isLoading: false, products: newState};

        default:
            return state;
    }
};
