<template>
	<main class="login">
		<section class="forms">

			<form class="register" @submit.prevent="register">
				<h2>Register</h2>
				<input
					type="email" 
					placeholder="Email"
					v-model="register_form.email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="register_form.password" />
				<input 
					type="submit" 
					value="Register" />
			</form>

			<form class="login" @submit.prevent="login">
				<h2>Login</h2>
				<input 
					type="email" 
					placeholder="Email"
					v-model="login_form.email" />
				<input 
					type="password" 
					placeholder="Mật khẩu" 
					v-model="login_form.password" />
				<input  
					type="submit" 
					value="Login" />
			</form>

		</section>
	</main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
	

	setup () {
		const login_form = ref({});
		const register_form = ref({});
		const store = useStore();

		const login = () => {
			
			store.dispatch('login', login_form.value);
		}

		const register = () => {
			store.dispatch('register', register_form.value);
		}

		return {
			login_form,
			register_form,
			login,
			register
		}
	}
}
</script>

<style>
.forms {
	display: flex;
	min-height: 100vh;
}

form {
	flex: 1 1 0%;
	padding: 8rem 1rem 1rem;
	background-color: rgb(140, 193, 222);
}

form.register {
	color: #FFF;
	background-color: rgb(14, 184, 40);
	background-image: linear-gradient(
		to bottom right,
		rgb(31, 57, 190) 0%,
		rgb(81, 68, 255) 100%
	);
}

h2 {
	font-size: 2rem;
	text-transform: uppercase;
	margin-bottom: 2rem;
	text-align: center;
}

input {
	appearance: none;
	border: none;
	outline: none;
	background: none;

	display: block;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	font-size: 1.5rem;
	margin-bottom: 2rem;
	padding: 0.5rem 0rem;
}

input:not([type="submit"]) {
	opacity: 0.8;
	transition: 0.4s;
}

input:focus:not([type="submit"]) {
	opacity: 1;
}

input::placeholder {
	color: inherit;
}

form.register input:not([type="submit"]) {
	color: #FFF;
	border-bottom: 2px solid #7db6f3;
}

form.login input:not([type="submit"]) {
	color: #2c3e50;
	border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
	background-color: rgb(7, 18, 131);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}

form.register input[type="submit"] {
	background-color: #FFF ;
	color: rgb(8, 24, 146);
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}
</style>