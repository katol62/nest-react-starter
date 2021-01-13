import {useQuery} from "@apollo/client";
import {IS_LOGGED_IN} from "../../process/apollo/GqlData";
import {useHistory} from "react-router";
import {LoginPage} from "../pages/Login";
import React, {useEffect} from "react";
import {MainView} from "./MainView";

export const Root = () => {

	const history = useHistory()
	const { data } = useQuery(IS_LOGGED_IN);

	useEffect( () => {
		debugger;
		if (!data.isLoggedIn) {
			history.push('/');
		}
	}, [history, data])

	return data.isLoggedIn ? <MainView /> : <LoginPage />
}
