import { Subject } from "rxjs";

const subject = new Subject<IMessage>();

export type TVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export interface IMessage {
	variant: TVariant,
	title: string;
	message: string
}

export const NotificationService = {

	sendNotification: (notification: IMessage) => {
		subject.next(notification);
	},

	clear: () => {
		subject.next();
	},

	onNotification: () => {
		return subject.asObservable();
	}

}
