import { render } from 'preact';

import './index.less';
import { useState } from 'preact/hooks';
import { Main } from './Main';
import { Login } from './Login';

export function App() {
	let [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem('loggedInUser'));

	function logInCheck(isLoggedIn: boolean) {
		setLoggedIn(isLoggedIn);
	}

	return loggedIn ? <Main /> : <Login logInCheck={logInCheck}/>
}

render(<App />, document.getElementById('app'));
