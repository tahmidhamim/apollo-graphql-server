const typeDefs = `#graphql

    scalar DateType
    scalar EmailType

    enum GenderEnum {
        MALE
        FEMALE
    }

    """ It represents a single user """
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        gender: GenderEnum!
        phone: String!
        email: EmailType!
        isMarried: Boolean!
        posts: [Post!]
        createdAt: DateType!
    }

    input UserInput {
        firstName: String!
        lastName: String!
        gender: GenderEnum!
        phone: String!
        email: EmailType!
        isMarried: Boolean!
    }

    input UpdateUserInput {
        firstName: String
        lastName: String
        gender: GenderEnum
        phone: String
        email: EmailType
        isMarried: Boolean
    }

    """ It represents a single post """
    type Post {
        id: ID!
        title: String!
        description: String!
        user: User!
    }

    input PostInput {
        title: String!
        description: String!
        user: ID!
    }

    input UpdatePostInput {
        title: String
        description: String
        user: ID
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        posts: [Post!]!
        post(id: ID!): Post
    }

    type Mutation {
        addUser(input: UserInput): User
        updateUser(id: ID!, input: UpdateUserInput): User
        deleteUser(id: ID!): Boolean!
        addPost(input: PostInput): Post
        updatePost(id: ID!, input: UpdatePostInput): Post
        deletePost(id: ID!): Boolean!
    }
`;

module.exports = typeDefs;