import { GraphQLServer } from 'graphql-yoga';

// type definitions (schema)
const typeDefs = `
    type Query {
		greeting(name: String): String!
		me: User!
		post: Post!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
	}

	type Post {
		id: ID!
		postedBy: User!
		title: String!
		body: String!
		published: Boolean
	}
`;

// resolvers
const resolvers = {
	Query: {
		post: () => ({
				id: "123ass",
				body: "this is chamski post",
				published: false,
				postedBy: {
					id: "asdq3as23"
				}
			}),
		me: () => ({
				id: "asdq3as23",
				name: "Tomek",
				email: 'tomaszduda@gmail.com'
			}),
		greeting: (parent, args, ctx, info) => {
			if(args.name) {
				return "Hello " + args.name
			}else {
				return "Hello anonymous guy"
			}
			
		}
	},
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});

server.start(() => {
	console.log('server is up');
});
