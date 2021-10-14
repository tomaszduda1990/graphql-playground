import { GraphQLServer } from 'graphql-yoga';

// type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        age: Int!
    }
`;

// resolvers
const resolvers = {
	Query: {
		hello() {
			return 'this is my first query';
		},
		name() {
			return 'TOMEK';
		},
		location() {
			return 'Cracow';
		},
		age() {
			return 30;
		},
	},
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});

server.start(() => {
	console.log('server is up');
});
