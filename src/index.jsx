import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import AppState from './AppState';
import App from './App';
import sass from '../sass/main.sass';

const appState = new AppState();

render(
	<Router>
		<Provider User={appState.User} Blogs={appState.Blogs}>
			<App apiPath="/api/v1" />
		</Provider>
	</Router>,
	document.getElementById('app')
);

// if (module.hot) {
//	 module.hot.accept('./App', () => {
//		 const NextApp = require('./App').default;
//
//		 render(
//			 <AppContainer>
//				 <NextApp appState={appState} />
//			 </AppContainer>,
//			 document.getElementById('root')
//		 );
//	 });
// }
