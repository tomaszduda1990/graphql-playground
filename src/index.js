import { GraphQLServer } from 'graphql-yoga';

const demoPostData = [{
		id: 'ID!',
		author: '1',
		title: "String!",
		body: "String!",
		published: false
},
{
		id: 'IDqweqd!',
		author: '2',
		title: "aeas!",
		body: "asdpasdaposdaposdiapsodi aisdpo aispod iaspd!",
		published: true
},
{
		id: 'ID121231!',
		author: '1',
		title: "Strin12eg!",
		body: "Strin asdas dasd asd asd asd asd zcxcsdg!",
		published: true
},
{
		id: 'ID21e3!',
		author: '2',
		title: "Strweqweing!",
		body: "asdasdas!",
		published: true
}]

const demoUserData = [{
		id: "1",
		name: "tomek",
		email: "costam@dot.com",
},
{
		id: "2",
		name: "radek",
		email: "cosvzvtam@dot.com",
		age: 40
},
{
		id: "3",
		name: "tadek",
		email: "asdasd@dot.com",
		age: 11
},
{
		id: "4",
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
		posts: [Post!]!
	}

	type Post {
		id: ID!
		author: User!
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
				author: {
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
	Post: {
		author: (parent, args, ctx, info) => {
			return demoUserData.find(user => user.id === parent.author)
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});

server.start(() => {
	console.log('server is up');
});
