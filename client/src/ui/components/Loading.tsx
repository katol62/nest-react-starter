import {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {LoadingService} from "../../process/services/LoadingService";

export const Loading = () => {

	const [show, setShow] = useState(false);

	useEffect( () => {
		const subscriber = LoadingService.onLoading().subscribe({
			next: (value: boolean) => {
				setShow(value);
			}
		});
		return subscriber.unsubscribe();
	}, [])

	const spinner = (
		<div className="overlay" style={show ? {display: 'block'} : {display: 'none'}} >
			<Spinner className="spinner" animation="border" role="status" variant="light">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	)

	return spinner;

}
