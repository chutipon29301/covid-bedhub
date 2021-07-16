import { ApolloClient, createHttpLink } from '@apollo/client/core';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
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

		const client = new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache()
		});
		return client;
	}
}

const client = new Client().client;

export default client;
