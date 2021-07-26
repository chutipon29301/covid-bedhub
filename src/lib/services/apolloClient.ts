import { ApolloClient, createHttpLink, from } from '@apollo/client/core/core.cjs.js';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache/cache.cjs.js';
import { setContext } from '@apollo/client/link/context/context.cjs.js';
import { onError } from '@apollo/client/link/error/error.cjs.js';
import cookie from 'cookie';

class Client {
	static _instance: Client;
	client: ApolloClient<NormalizedCacheObject>;
	constructor() {
		if (Client._instance) {
			return Client._instance;
		}
		Client._instance = this;

		this.client = this.setupClient();
	}

	setupClient() {
		const httpLink = createHttpLink({
			uri: `${import.meta.env.VITE_API_URL}/graphql`
		});

		const authLink = setContext((_, { headers }) => {
			const accessToken = cookie.parse(document.cookie).access_token;
			if (!accessToken) return { headers };

			const authorization = import.meta.env.VITE_DEVELOP
				? `Developer ${accessToken}`
				: `Bearer ${accessToken}`;
			return {
				headers: {
					...headers,
					authorization
				}
			};
		});

		const errorLink = onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				const error = graphQLErrors[0].extensions.exception.response || {
					message: graphQLErrors[0].message
				};
				throw new Error(JSON.stringify({ title: error.error, message: error.message }));
			}
			if (networkError)
				throw new Error(JSON.stringify({ title: 'Network Error', message: networkError.message }));
		});

		const client = new ApolloClient({
			link: from([errorLink, authLink, httpLink]),
			cache: new InMemoryCache(),
			defaultOptions: {
				watchQuery: {
					errorPolicy: 'all',
					fetchPolicy: 'network-only'
				},
				query: {
					errorPolicy: 'all',
					fetchPolicy: 'network-only'
				},
				mutate: {
					errorPolicy: 'all'
				}
			}
		});
		return client;
	}
}

const client = new Client().client;

export default client;
