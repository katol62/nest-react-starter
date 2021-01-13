import {Subject} from "rxjs";

const subject = new Subject<boolean>();

export const LoadingService = {

	showLoading: (flag: boolean) => {
		console.log(`loading: ${flag}`);
		subject.next(flag)
	},

	onLoading: () => {
		return subject.asObservable();
	}
}
