import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DataStore } from 'notarealdb';

// ----------------------------------------------
// Database
// ----------------------------------------------
const store = new DataStore('./data');
const accounts = store.collection('accounts');

// ----------------------------------------------
// Schema definition
// ----------------------------------------------
const typeDefs = `#graphql
    type Query { 
        accounts:[Account]
    }

    type Account {
        id:ID!
        name:Name
    }

    type Name {
        first:String
        last:String
    }
`;

// ----------------------------------------------
// Resolvers
// ----------------------------------------------
const resolvers = {
    Query : {
        accounts:() => accounts.list(),
    }
}

// ----------------------------------------------
// Server
// ----------------------------------------------
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`Server ready at: ${url}`);