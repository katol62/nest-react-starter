import PersistentStorage from "./Storage";
import {Constants} from "../helpers/Models";
import {isExpired} from "react-jwt";
import {isLoggedInVar, loggedUserVar, tokenVar} from "../apollo/GqlClient";

const storage = PersistentStorage.instance;

export default class Auth {

	// private storage = PersistentStorage.instance;

	static _instance: Auth | null = null;

	constructor() {
	}

	public static get instance(): Auth {
		if (!this._instance) {
			this._instance = new Auth()
		}
		return this._instance
	}

	public get authorized(): boolean {
		const token = tokenVar();
		if (token && !isExpired(token)) {
			return true;
		}
		return false;
	}

	public get initialAuthorized(): boolean {
		const token = storage.getItem(Constants.TOKEN);
		if (token && !isExpired(token)) {
			return true;
		}
		return false;
	}

	public logOut(): void {
		storage.clear();
		loggedUserVar(null);
		tokenVar(null);
		isLoggedInVar(false);
	}

	public get initialToken(): string | null {
		const token = storage.getItem(Constants.TOKEN);
		return token ? token : null
	}

	public get token(): string | null {
		return tokenVar()
	}
	public set token(token: string | null) {
		if (token) {
			storage.setItem(Constants.TOKEN, token as string);
		} else {
			storage.removeItem(Constants.TOKEN);
		}
		tokenVar(token);
	}

	public get initialUser(): any {
		const user = storage.getItem(Constants.USER);
		return user ? user : null;
	}

	public get user(): any {
		return loggedUserVar()
	}

	public set user(user: any) {
		if (user) {
			storage.setItem(Constants.USER, user);
		} else {
			storage.removeItem(Constants.USER);
		}

	}

}
