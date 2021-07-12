import { ApolloClient, createHttpLink } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache/';
import { setContext } from '@apollo/client/link/context';

class Client {
	static _instance: Client;
	client: any;
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
			const token = localStorage.getItem('token');
			return {
				headers: {
					...headers,
					authorization: token ? `Bearer ${token}` : ''
				}
			};
		});

		const client = new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache()
		});
		return client;
	}
}

export const client = new Client().client;
