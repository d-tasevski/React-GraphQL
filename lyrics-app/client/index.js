import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const link = createHttpLink({
	uri: '/graphql',
	credentials: 'same-origin',
});

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
	dataIdFromObject: o => o.id,
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Switch>
					<App>
						<Route path="/songs/new" component={SongCreate} />
						<Route path="/songs/:id" component={SongDetail} />
						<Route component={SongList} />
					</App>
				</Switch>
			</BrowserRouter>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector('#root'));
