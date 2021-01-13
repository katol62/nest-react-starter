import React, {useEffect, useState} from "react";
import {Navbar} from "react-bootstrap";
import {BoxArrowRight} from "react-bootstrap-icons";
import {IUser} from "../../process/helpers/Models";
import {useQuery} from "@apollo/client";
import {LOGGED_IN_USER} from "../../process/apollo/GqlData";
import PersistentStorage from "../../process/store/Storage";
import {isLoggedInVar, loggedUserVar, tokenVar} from "../../process/apollo/GqlClient";

const storage = PersistentStorage.instance;

export const TopBar = ({title}: any) => {

	const [currentUser, setCurrentUser] = useState<IUser | null>(null);
	const { data } = useQuery(LOGGED_IN_USER);

	useEffect(() => {
		debugger;
		const user = data.me;
		setCurrentUser(user);
	}, [data])

	const logout = () => {
		storage.clear();
		tokenVar(null);
		loggedUserVar(null);
		isLoggedInVar(false);
	}

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand>{title}</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
				<Navbar.Text>
					<span className="pr-3">
						{currentUser ? `User: ${currentUser.phone}` : ''}
					</span>
					<BoxArrowRight className="pointer" style={{ fontSize: '1.75em' }} onClick={logout} />
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>

	)
}
