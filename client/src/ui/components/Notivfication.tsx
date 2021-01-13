import React, {useEffect, useState} from "react";
import {Alert, Button} from "react-bootstrap";
import {IMessage, NotificationService, TVariant} from "../../process/services/NotificationService";

export const Notification = () => {

	const initialMessage: any = {
		variant: "success",
		title: '',
		message: ''
	}
	const autoCloseInterval = 4000;
	const closeAlert = () => {
		setCurrentMessage(initialMessage);
		setShow(false);
	}

	const [show, setShow] = useState(false);
	const [currentMessage, setCurrentMessage] = useState(initialMessage);

	useEffect(() => {
		const subscription = NotificationService.onNotification().subscribe(
			{
				next: ( notification: any ) => {
					if (notification) {
						setCurrentMessage({...notification});
						setShow(true);
						setTimeout(() => closeAlert(), autoCloseInterval);
					} else {
						closeAlert();
					}
				},
				error: err => {
				}
			}
		);
		return subscription.unsubscribe;
	}, [])

	return (
		<Alert className="notification" show={show} variant={currentMessage.variant} onClose={() => setShow(false)} dismissible>
			<Alert.Heading>{currentMessage.title}</Alert.Heading>
			<p>
				{currentMessage.message}
			</p>
		</Alert>
	)

}
