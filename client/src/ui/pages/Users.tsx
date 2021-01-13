import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row, Table} from "react-bootstrap";
import {useHistory} from "react-router";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_USER, GET_USERS} from "../../process/apollo/GqlData";
import {IUser} from "../../process/helpers/Models";
import {NotificationService, IMessage} from "../../process/services/NotificationService";

export const UsersPage = () => {

	const history = useHistory();
	const [open, setOpen] = useState<boolean>(false);
	const [user, setUser] = useState<IUser>({phone: ''});

	const { data, refetch } = useQuery(GET_USERS, {
		variables: {},
	});

	const [ removeUser, { loading }] = useMutation(DELETE_USER, {
		errorPolicy: 'all',
		notifyOnNetworkStatusChange: true,
		onCompleted(data) {
			if (data && data.delete) {
				console.log(data.delete.success);
				let notification: IMessage;
				if (data.delete.success) {
					notification = {
						variant: 'success',
						message: 'User deleted',
						title: 'Success'
					}
					refetch();
				} else {
					notification = {
						variant: 'danger',
						message: 'Error deleting user',
						title: 'Error'
					}
				}
				NotificationService.sendNotification(notification);
			}
		},

	})

	const addNewUser = () => {
		history.push('/users/new');
	}

	const editUser = (user: IUser) => {
		history.push(`/users/${user.id}`);
	}

	const deleteUser = (user: IUser) => {
		console.log(`id: ${user.id}`);
		setUser(user);
		handleShow();
	}

	const handleClose = () => {
		setUser({phone: ''});
		setOpen(false);
	}
	const handleShow = () => {
		setOpen(true);
	}

	const confirmDelete = () => {
		setOpen(false);
		removeUser({variables: {id: user.id}})
	}

	const dataTable = (data: any) =>
		(
		<Table striped bordered hover size="sm" responsive="md">
			<thead>
			<tr>
				<th>#</th>
				<th>Phone</th>
				<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			{
				data.users.map( (user: IUser) =>
					(
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.phone}</td>
							<td className="text-right">
								<Button variant="link" color="danger" onClick={ (e) => {e.preventDefault(); deleteUser(user)} }>Delete</Button>
								<Button variant="link" color="primary" onClick={ (e) => {e.preventDefault(); editUser(user)} }>Edit</Button>
							</td>
						</tr>
					)
				)
			}
			</tbody>

		</Table>
	)

	return (
		<div>
			<Container fluid>
				<Row className='justify-content-end'>
					<Col className="text-right pt-4 pb-4">
						<Button onClick={addNewUser}>Add</Button>
					</Col>
				</Row>
				<Row className={'justify-content-center'}>
					<Col>
						{ (data && data.users && data.users.length) ?
							dataTable(data)
							: (
								<div className="text-center">
									No Data Found
								</div>
							)
						}
					</Col>
				</Row>
			</Container>

			<Modal show={open} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete User?</Modal.Title>
				</Modal.Header>
				<Modal.Body>{`Delete user with phone # ${user.phone}?`}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="danger" onClick={confirmDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
