import PersistentStorage from "../store/Storage";
import {isLoggedInVar, loggedUserVar, tokenVar} from "../apollo/GqlClient";
import {Constants} from "../helpers/Models";
import {isExpired} from "react-jwt";

const storage = PersistentStorage.instance;

export const AuthService = {

	logOut: () => {
		storage.clear();
		loggedUserVar(null);
		tokenVar(null);
		isLoggedInVar(false);
	},

	setToken: (token: string | null) => {
		storage.setItem(Constants.TOKEN, token);
		tokenVar(token);
	},

	getToken: (): string | null => {
		return tokenVar();
	},

	getInitialToken: (): string | null => {
		return storage.getItem(Constants.TOKEN);
	},

	setUser: (user: any) => {
		storage.setItem(Constants.USER, user);
		loggedUserVar(user);
	},

	getUser: (): any => {
		return loggedUserVar();
	},

	getInitialUser: (): any => {
		return storage.getItem(Constants.USER);
	},

	setLoggedIn: (flag: boolean) => {
		isLoggedInVar(flag);
	},

	isLoggedIn: (): boolean => {
		return !!(storage.getItem(Constants.TOKEN) && !isExpired(storage.getItem(Constants.TOKEN)));
	}

}
