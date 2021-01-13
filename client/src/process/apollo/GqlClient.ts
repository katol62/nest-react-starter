import {ApolloClient, InMemoryCache, NormalizedCacheObject, gql, makeVar, createHttpLink, ApolloLink, from} from "@apollo/client";
import PersistentStorage from '../store/Storage'
import {Constants, IUser} from "../helpers/Models";
import {onError} from "@apollo/client/link/error";
import {NotificationService} from "../services/NotificationService";
import {LoadingService} from "../services/LoadingService";
import {AuthService} from "../services/AuthService";

const storage = PersistentStorage.instance;

const loggedIn = AuthService.isLoggedIn();
debugger;
// export const isLoggedInVar = makeVar<boolean>(!!(storage.getItem(Constants.TOKEN) && !isExpired(storage.getItem(Constants.TOKEN))));
export const isLoggedInVar = makeVar<boolean>(AuthService.isLoggedIn());
export const tokenVar = makeVar<string | null>(AuthService.getInitialToken());
export const loggedUserVar = makeVar<IUser | null>(AuthService.getInitialUser());

const typeDefs = gql`
		input UserFilterDto {
			id: Float,
			firstName: String,
			lastName: String,
			email: String,
			phone: String,
			role: String
	  	}
`;

const typePolicies = {
	Query: {
		fields: {
			isLoggedIn: {
				read() {
					return isLoggedInVar()
				}
			},
			me: {
				read() {
					return loggedUserVar()
				}
			},
			token: {
				read() {
					return tokenVar()
				}
			}
		}
	}
}

const cache = new InMemoryCache({typePolicies});


const httpLink = createHttpLink({
	uri: '/graphql',
});

// const baseHeaders = {
// 	'Content-Type': 'application/json',
// 	'Access-Control-Allow-Origin': '*',
// 	'Access-Control-Allow-Credentials': true,
// }

const middleware = new ApolloLink((operation, forward) => {
	LoadingService.showLoading(true);
	console.log('Starting', operation, new Date());

	return forward(operation);
});

const afterware = new ApolloLink((operation, forward) => {
	return forward(operation).map(response => {
		LoadingService.showLoading(false);
		console.log('Completed', operation, new Date());

		return response;
	});
});

const authLink = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers }: any) => ({ headers: {
			authorization: `Bearer ${AuthService.getToken()}` || null,
			...headers
		}}));
	return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) =>
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		);
		debugger;
		const statusCode = graphQLErrors[0].extensions ? graphQLErrors[0].extensions.exception.response.statusCode : null;
		if (statusCode && statusCode === 401) {
			AuthService.logOut();
		}
		NotificationService.sendNotification({
			variant: 'danger',
			title: 'Error',
			message: graphQLErrors[0].message
		})
	}
	if (networkError) {
		console.error(`[Network error]: ${networkError}`);
		NotificationService.sendNotification({
			variant: 'danger',
			title: 'Error',
			message: networkError.message
		})
	}
});

export class Gql {
	public apollo: ApolloClient<NormalizedCacheObject>;

	constructor() {
		this.apollo = this.initClient();
	}

	private initClient(): ApolloClient<NormalizedCacheObject> {
		const client = new ApolloClient({
			cache,
			typeDefs,
			link: from([authLink, errorLink, middleware, afterware, httpLink])
		});
		return client;
	}
}

export const client = new Gql().apollo;
