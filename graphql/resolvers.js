const { users, posts } = require('../data');
const { DateType, EmailType } = require('./customTypes');

const resolvers = {
    DateType,
    EmailType,
    User: {
        posts(user) {
            return posts.filter(post => user.posts.includes(post.id));
        }
    },
    Post: {
        user(post) {
            return users.find(user => user.id == post.user);
        }
    },
    Query: {
        users() {
            return users;
        },
        user(_, { id }) {
            return users.find(user => user.id == id);
        },
        posts() {
            return posts;
        },
        post(_, { id }) {
            return posts.find(post => post.id == id);
        }
    },
    Mutation: {
        addUser(_, { input: { firstName, lastName, gender, phone, email, isMarried } }) {
            const user = {
                id: users.length + 1,
                firstName,
                lastName,
                gender,
                phone,
                email,
                isMarried,
                posts: [],
                createdAt: new Date()
            };

            users.push(user);
            return user;
        },
        updateUser(_, { id, input: { firstName, lastName, gender, phone, email, isMarried } }) {
            let updatedUser = null;
            users.forEach(user => {
                if (user.id == id) {
                    if (firstName) user.firstName = firstName;
                    if (lastName) user.lastName = lastName;
                    if (gender) user.gender = gender;
                    if (phone) user.phone = phone;
                    if (email) user.email = email;
                    if (isMarried) user.isMarried = isMarried;
                    updatedUser = user;
                }
            });

            return updatedUser;
        },
        deleteUser(_, { id }) {
            const index = users.findIndex(user => user.id == id);
            if (index >= 0) {
                users.splice(index, 1);
                return true;
            }
            return false;
        },
        addPost(_, { input: { title, description, user } }) {
            const post = {
                id: posts.length + 1,
                title,
                description,
                user
            };

            posts.push(post);
            // Have to add post in user's posts array
            return post;
        },
        updatePost(_, { id, input: { title, description, user } }) {
            let updatedPost = null;
            posts.forEach(post => {
                if (post.id == id) {
                    if (title) post.title = title;
                    if (description) post.description = description;
                    if (user) post.user = user;
                    updatedPost = post;
                }
            });

            return updatedPost;
        },
        deletePost(_, { id }) {
            const index = posts.findIndex(post => post.id == id);
            if (index >= 0) {
                posts.splice(index, 1);
                return true;
            }
            return false;
        }
    }
};

module.exports = resolvers;