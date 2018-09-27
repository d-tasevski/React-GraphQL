const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const PORT = process.env.PORT || 4040;
const app = express();

app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true,
	})
);

app.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));
