import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {IUser} from "../../process/helpers/Models";
import {useLazyQuery} from "@apollo/client";
import {GET_USER} from "../../process/apollo/GqlData";
import {RegisterFormVariables} from "./RegisterForm";
import {useParams} from "react-router";

export interface IEditProps {
	update: (a: {
		variables: IUser
	}) => void,
	create: (a: {
		variables: IUser
	}) => void
}

export const EditForm = ({ update, create }: IEditProps) => {

	const { id }: any = useParams();

	const [userId, setUserId] = useState<number | null>(null)

	const { register, handleSubmit, setValue, formState } = useForm();

	useEffect(() => {
		setUserId(null);
		if (id) {
			setUserId(id);
			getUser();
		}
	}, [id])

	useEffect(() => {
		register({ name: "phone" });
		register({ name: "password" });
		register({ name: "firstName" });
		register({ name: "lastName" });
		register({ name: "email" });
		register({ name: "role" });
	}, [register]);

	const [getUser, { loading }] = useLazyQuery(GET_USER, {
		variables: {filter: {id: Number(userId)}},
		onCompleted({ user }) {
			if (user) {
				Object.entries(user).forEach( entry=> {
					const key = entry[0];
					const value = entry[1]
					setValue(key, value);
				});
			}
		}
	})

	const onSubmit = (data: IUser) => {
		debugger;
		if (id) {
			update( {variables: {...data, id: Number(id)} })
		} else {
			create( {variables: {...data} })
		}
	};

	const handleChange = (event: any) => {
		event.preventDefault();
		setValue(event.target.name, event.target.value);
	};

	if (loading) {
		console.log('getting user');
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group controlId="phone">
				<Form.Label>Phone</Form.Label>
				<Form.Control
					type="numeric"
					placeholder="Phone"
					name="phone" onChange={handleChange}
					ref={register} />
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>
			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password"
							  placeholder="Password"
							  name="password"
							  onChange={handleChange}
							  ref={register} />
			</Form.Group>
			<Form.Group controlId="firstName">
				<Form.Label>First Name</Form.Label>
				<Form.Control type="text"
							  placeholder="First Name"
							  name="firstName"
							  onChange={handleChange}
							  ref={register} />
			</Form.Group>
			<Form.Group controlId="lastName">
				<Form.Label>Last Name</Form.Label>
				<Form.Control type="text"
							  placeholder="Last Name"
							  name="lastName"
							  onChange={handleChange}
							  ref={register} />
			</Form.Group>
			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email"
							  placeholder="Email"
							  name="email"
							  onChange={handleChange}
							  ref={register} />
			</Form.Group>
			<Button variant="primary" type="submit" disabled={formState.isSubmitting}>
				{id ? 'Update' : 'Create'}
			</Button>
		</Form>
	)



}
