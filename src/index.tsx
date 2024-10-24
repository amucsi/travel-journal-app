import { render } from 'preact';

import './index.less';
import { useState } from 'preact/hooks';
import { Main } from './Main';
import { Login } from './Login';

export function App() {
	let [loggedIn, setLoggedIn] = useState(false);

	function logInCheck() {
		//
	}

	return loggedIn ? <Main /> : <Login />
}

render(<App />, document.getElementById('app'));
