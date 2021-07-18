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
			uri: `http://178.128.221.77:3000/graphql`
		});

		const authLink = setContext((_, { headers }) => {
			const { access_token } = cookie.parse(document.cookie);
			return {
				headers: {
					...headers,
					authorization: access_token ? `${access_token}` : ''
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
			cache: new InMemoryCache()
		});
		return client;
	}
}

const client = new Client().client;

export default client;
