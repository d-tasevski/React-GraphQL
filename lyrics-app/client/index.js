import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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

const Root = () => (
	<ApolloProvider client={client}>
		<HashRouter>
			<div className="container">
				<Switch>
					<Route exact path="/" component={SongList} />
					<Route exact path="/songs/new" component={SongCreate} />
					<Route path="/songs/:id" component={SongDetail} />
					<Redirect to="/" />
				</Switch>
			</div>
		</HashRouter>
	</ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
