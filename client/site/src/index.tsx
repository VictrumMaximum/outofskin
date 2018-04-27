import * as React from "react";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import MainContainer from "./MainContainer";
import mainReducer from "./redux/reducers/";

const store = createStore(mainReducer);

render(
	<Provider store={store}>
		<MainContainer />
	</Provider>,
	document.getElementById("container"));
