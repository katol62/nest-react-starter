import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import React, {useEffect} from "react";
import {LoginFormVariables} from "./LoginForm";

export interface RegisterFormVariables {
	id?: number;
	phone: string;
	password: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	role?: string;
}

export interface IRegisterProps {
	reg: (a: {
		variables: {
			phone: string,
			password: string,
			firstName?: string,
			lastName?: string,
			email?: string,
			role?: string
		}
	}) => void
}

export const RegisterForm = ({ reg }: IRegisterProps) => {
	const { register, handleSubmit, setValue, formState } = useForm();

	useEffect(() => {
		register({ name: "phone" });
		register({ name: "password" });
		register({ name: "firstName" });
		register({ name: "lastName" });
		register({ name: "email" });
	}, [register]);

	const onSubmit = (data: RegisterFormVariables) => {
		reg( {variables: {...data} })
	};

	const handleChange = (e: any) => {
		setValue(e.target.name, e.target.value);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group controlId="phone">
				<Form.Label>Phone</Form.Label>
				<Form.Control
					type="numeric"
					placeholder="Phone"
					name="phone"
					onChange={handleChange}
					required
					ref={register} />
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>
			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					name="password"
					onChange={handleChange}
					required
					ref={register} />
			</Form.Group>
			<Form.Group controlId="firstName">
				<Form.Label>First Name</Form.Label>
				<Form.Control type="text" placeholder="First Name" name="firstName" onChange={handleChange} ref={register} />
			</Form.Group>
			<Form.Group controlId="lastName">
				<Form.Label>Last Name</Form.Label>
				<Form.Control type="text" placeholder="Last Name" name="lastName" onChange={handleChange} ref={register} />
			</Form.Group>
			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" placeholder="Email" name="email" onChange={handleChange} ref={register} />
			</Form.Group>
			<Button variant="primary" type="submit" disabled={formState.isSubmitting}>
				Register
			</Button>
		</Form>
	)

}

