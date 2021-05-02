import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./resolvers";

const typeDefs = `
    type Item {
        id: ID!
        text: String!
        timeISO: String!
        time: Int!
        title: String!
        deleted: Boolean!
    }
    
    enum Gender {
        MALE
        FEMALE
        OTHER
    }
    
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        age: Int!
        gender: Gender
        items: [Item]
        createdAt: String!
    }

    type Post {
        id: ID!
        title: String!
        text: String!
        createdAt: String!
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String
        age: Int!
        gender: Gender
        items: [ID!]
    }

    input ItemInput {
        text: String!
        time: Int
        title: String!
        deleted: Boolean
    }

    input PostInput {
        title: String!
        text: String!
    }

    type Query {
        getItems: [Item]
        getUsers: [User]
        getPosts: [Post]
        getItem(id: ID!): Item!
        getUser(id: ID) : User!
        getPost(id: ID!): Post!
    }

    type Mutation {
        createItem(input: ItemInput) : Item!
        createUser(input: UserInput) : User!
        createPost(input: PostInput) : Post!
        updateItem(id: ID! input: ItemInput) : Item!
        updateUser(id: ID! input: UserInput) : User!
        updatePost(id: ID! input: PostInput) : Post!
        deleteItem(id: ID!) : String!
        deleteUser(id: ID!) : String!
        deletePost(id: ID!) : String!
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
