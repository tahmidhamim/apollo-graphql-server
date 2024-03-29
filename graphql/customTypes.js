const { GraphQLError, GraphQLScalarType, Kind } = require('graphql');

// Date Validator
const validateDate = (value) => {
    const date = new Date(value);
    if (date.toString() !== 'Invalid Date') {
        return date.toISOString();
    }
    throw new GraphQLError(`${value} is not a valid date`);
}

// Date Type
const DateType = new GraphQLScalarType({
    name: 'DateType',
    description: 'It represents a date',
    parseValue: validateDate,
    parseLiteral: (AST) => {
        if (AST.kind === Kind.STRING || AST.kind === Kind.INT) {
            return validateDate(AST.value);
        }
        throw new GraphQLError(`${AST.value} is not a number or string!`);
    },
    serialize: validateDate
});

// Email Validator
const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regex)) {
        return email;
    }
    throw new GraphQLError(`${email} is not a valid email!`);
}

// Email Type
const EmailType = new GraphQLScalarType({
    name: 'EmailType',
    description: 'It represents an email',
    parseValue: validateEmail,
    parseLiteral: (AST) => {
        if (AST.kind === Kind.STRING) {
            return validateEmail(AST.value);
        }
        throw new GraphQLError(`${AST.value} is not a string!`);
    },
    serialize: validateEmail
});

module.exports = {
    DateType,
    EmailType
};