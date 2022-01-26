import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const initialState = {}
const middleware = [thunk]

const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;