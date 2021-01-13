import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useHistory} from "react-router";

export const HomePage = () => {

	return (
		<Container fluid>
			<Row className={'justify-content-start'}>
				<Col>
					Home
				</Col>
			</Row>
		</Container>
	);
};
