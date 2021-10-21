import { GraphQLServer } from 'graphql-yoga';

const demoPostData = [{
		id: 'ID!',
		postedBy: "User!",
		title: "String!",
		body: "String!",
		published: false
},
{
		id: 'IDqweqd!',
		postedBy: "Suepsd!",
		title: "aeas!",
		body: "asdpasdaposdaposdiapsodi aisdpo aispod iaspd!",
		published: true
},
{
		id: 'ID121231!',
		postedBy: "User123sd21!",
		title: "Strin12eg!",
		body: "Strin asdas dasd asd asd asd asd zcxcsdg!",
		published: true
},
{
		id: 'ID21e3!',
		postedBy: "Uqweqweqser!",
		title: "Strweqweing!",
		body: "asdasdas!",
		published: true
}]

const demoUserData = [{
		id: "123asd",
		name: "tomek",
		email: "costam@dot.com",
},
{
		id: "123123",
		name: "radek",
		email: "cosvzvtam@dot.com",
		age: 40
},
{
			id: "312123",
		name: "tadek",
		email: "asdasd@dot.com",
		age: 11
},
{
		id: "123asad12e3sd",
		name: "Romek",
		email: "asdl@dot.com",
}]
// type definitions (schema)
const typeDefs = `
    type Query {
		users(query: String): [User!]!
		me: User!
		post: Post!
		posts(query: String): [Post!]!
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
		users: (parent, args, ctx, info) => {
			if(!args.query){
				return demoUserData
			}
			return demoUserData.filter(user => {
				return user.name.toLowerCase().includes(args.query.toLowerCase())
			})
		},
		post: () => ({
				id: "123ass",
				body: "this is chamski post",
				published: false,
				postedBy: {
					id: "asdq3as23"
				}
			}),
		posts: (parent, args, cts, info) => {
			if(!args.query) {
				return demoPostData
			}
			return demoPostData.filter(post => post.title.includes(args.query)) || post.body.includes(args.query);
		},
		me: () => ({
				id: "asdq3as23",
				name: "Tomek",
				email: 'tomaszduda@gmail.com'
			})
		
	},
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});

server.start(() => {
	console.log('server is up');
});
