import React, {useState} from 'react';
import {useLazyQuery, useMutation} from "@apollo/client";
import {LOGIN_USER, REGISTER_USER, USER_ME} from "../../process/apollo/GqlData";
import {LoginForm} from "../components/LoginForm";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {RegisterForm} from "../components/RegisterForm";
import Auth from "../../process/store/Auth";
import PersistentStorage from "../../process/store/Storage";
import {Constants} from "../../process/helpers/Models";
import {isLoggedInVar, loggedUserVar, tokenVar} from "../../process/apollo/GqlClient";

enum EFormState {
	'login' = 'login',
	'register' = 'register'
}

const storage = PersistentStorage.instance;

export const LoginPage = () => {

	const [formState, setFormState] = useState<EFormState>(EFormState.login)

	const [getCurrentUser, { loading: queryLoading }] = useLazyQuery(USER_ME, {
		fetchPolicy: 'no-cache',
		notifyOnNetworkStatusChange: true,
		onCompleted({ me }) {
			storage.setItem(Constants.USER, me);
			loggedUserVar(me);
			isLoggedInVar(true);
		}
	})

	const [login, { loading }] = useMutation(LOGIN_USER, {
		errorPolicy: 'all',
		notifyOnNetworkStatusChange: true,
		onCompleted(data) {
			if (data && data.login) {
				storage.clear();
				storage.setItem(Constants.TOKEN, data.login.token);
				tokenVar(data.login.token);
				getCurrentUser({ variables: {}});
			}
		},
	});

	const [register, { loading: regLoading }] = useMutation(REGISTER_USER, {
		errorPolicy: 'all',
		notifyOnNetworkStatusChange: true,
		onCompleted(data) {
			debugger;
			if (data && data.register) {
				storage.clear();
				storage.setItem(Constants.TOKEN, data.login.token);
				tokenVar(data.login.token);
				getCurrentUser({ variables: {}});
			}
		},
	})

	if (loading || queryLoading || regLoading) {
		console.log(`queries loading`);
	}

	return (
		<Container fluid>
			<Row className="justify-content-center">
				<Col sm={{span: 8}} md={{span: 8}} lg={{span: 6}} xl={{span: 6}} xs={12}>
					<Card>
						<Card.Header>{formState === EFormState.login ? 'Login' : 'Register'}</Card.Header>
						<Card.Body className="text-center">
							{
								formState === EFormState.login ?
									(<LoginForm login={login}/>) :
									(<RegisterForm reg={register}/>)
							}
							<div className="pt-3">
							{
								formState === EFormState.login ?
									<Button variant="link" onClick={ () => setFormState(EFormState.register)} >Register</Button> :
									<Button variant="link" onClick={ () => setFormState(EFormState.login)} >Login</Button>
							}
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
