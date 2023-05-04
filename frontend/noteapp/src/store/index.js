import { createStore } from "vuex";
import router from "../router";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

export default createStore({
	state: {
		user: null,
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},

		CLEAR_USER(state) {
			state.user = null;
		},
	},
	actions: {
		async login({ commit }, details) {
			const { email, password } = details;

			try {
				await signInWithEmailAndPassword(auth, email, password);
			} catch (error) {
				switch (error.code) {
					case "auth/user-not-found":
						alert("Not found user");
						break;
					case "auth/wrong-password":
						alert("Invalid");
						break;
					default:
						alert("It's not OK");
				}

				return;
			}

			commit("SET_USER", auth.currentUser);

			router.push("/");
		},

		async register({ commit }, details) {
			const { email, password } = details;

			try {
				await createUserWithEmailAndPassword(auth, email, password);
			} catch (error) {
				switch (error.code) {
					case "auth/email-already-in-use":
						alert("Email đã được sử dụng");
						break;
					case "auth/invalid-email":
						alert("Email không đúng");
						break;
					case "auth/operation-not-allowed":
						alert("Hoạt động không được cho phép");
						break;
					case "auth/weak-password":
						alert("Vui lòng đặt mật khẩu mạnh hơn");
						break;
					default:
						alert("Có gì đó không đúng");
				}

				return;
			}

			commit("SET_USER", auth.currentUser);

			router.push("/");
		},

		async logout({ commit }) {
			await signOut(auth);

			commit("CLEAR_USER");

			router.push("/login");
		},

		fetchUser({ commit }) {
			auth.onAuthStateChanged(async (user) => {
				if (user === null) {
					commit("CLEAR_USER");
				} else {
					commit("SET_USER", user);

					if (
						router.isReady() &&
						router.currentRoute.value.path === "/login"
					) {
						router.push("/");
					}
				}
			});
		},
	},
});
