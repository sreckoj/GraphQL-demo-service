import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DataStore } from 'notarealdb';

// ----------------------------------------------
// Database
// ----------------------------------------------
const store = new DataStore('./data');
const employees = store.collection('employees');
const departments = store.collection('departments');

// ----------------------------------------------
// Schema definition
// ----------------------------------------------
const typeDefs = `#graphql
    type Query { 
        employees:[Employee]
        departments:[Department]
    }

    type Employee {
        id:ID!
        firstName:String
        lastName:String
        deptId:String
        hireDate:String
        role:String
        salary:Float
    }

    type Department {
        deptId:ID!
        departmentName:String
    }
`;

// ----------------------------------------------
// Resolvers
// ----------------------------------------------
const resolvers = {
    Query : {
        employees:() => employees.list(),
        departments:() => departments.list()
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