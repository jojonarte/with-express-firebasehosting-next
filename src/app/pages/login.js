import axios from 'axios';
import Router from 'next/router';

const login = async (user = 'jojo', password = 'test') => {
	await axios.post('/api/auth/login', { user, password });
	Router.replace('/');
};

function Login() {
	return (
		<div>
			<h1>DEMO LOGIN</h1>
			<button onClick={login}>CLICK TO LOGIN</button>
		</div>
	);
}
Login.getInitialProps = function(context) {
	return {
		onLogin: () => console.log(waw)
	};
};
export default Login;
