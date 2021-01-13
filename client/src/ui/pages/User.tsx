import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import {CREATE_USER, UPDATE_USER} from "../../process/apollo/GqlData";
import {NotificationService} from "../../process/services/NotificationService";
import {EditForm} from "../components/EditForm";

export const UserPage = () => {

	const [create, { loading: createLoading } ] = useMutation(CREATE_USER, {
		errorPolicy: 'all',
		notifyOnNetworkStatusChange: true,
		onCompleted({ create }) {
			NotificationService.sendNotification({
				variant: "success",
				title: 'Success',
				message: 'User successfully created'
			})
		},
	})

	const [update, { loading: updateLoading } ] = useMutation(UPDATE_USER, {
		errorPolicy: 'all',
		notifyOnNetworkStatusChange: true,
		onCompleted({ success, user }) {
			console.log(`success: ${success}`)
			NotificationService.sendNotification({
				variant: "success",
				title: 'Success',
				message: 'User successfully updated'
			})
		},
	})

	if (createLoading || updateLoading) {
		console.log('process loading')
	}

	return (
		<Container fluid>
			<Row className="justify-content-center pt-5">
				<Col sm={{span: 8}} md={{span: 8}} lg={{span: 6}} xl={{span: 6}} xs={12}>
					<EditForm update={update} create={create} />
				</Col>
			</Row>
		</Container>
	);
};
