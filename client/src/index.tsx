import * as React from "react";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import MainContainer from "./MainContainer";
import mainReducer from "./redux/reducers";

let store = createStore(()=>{return {}});

render(
	// Provider makes sure child components have access to store.
	<Provider store={store}>

			<MainContainer />
	</Provider>,
	document.getElementById("container"));
