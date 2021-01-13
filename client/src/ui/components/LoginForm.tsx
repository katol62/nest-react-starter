import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {Button, Form} from "react-bootstrap";

export interface LoginFormVariables {
	phone: string;
	password: string;
}

export interface ILoginProps {
	login: (a: {variables: {phone: string, password: string}}) => void
}

export const LoginForm = ({ login }: ILoginProps) => {

	const { register, handleSubmit, setValue, formState } = useForm();

	useEffect(() => {
		register({ name: "phone" });
		register({ name: "password" });
	}, [register]);

	const onSubmit = (data: LoginFormVariables) => {
		login( {variables: {phone: data.phone, password: data.password} })
	};

	const handleChange = (e: any) => {
		setValue(e.target.name, e.target.value);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group controlId="phone">
				<Form.Label>Phone</Form.Label>
				<Form.Control type="numeric" placeholder="Phone" name="phone" onChange={handleChange} ref={register} />
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>
			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} ref={register} />
			</Form.Group>
			<Button variant="primary" type="submit" disabled={formState.isSubmitting}>
				Login
			</Button>
		</Form>
	)

}
