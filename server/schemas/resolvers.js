const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async(parent, args, context) => {
          if (context.user){
            const userData = await User.findOne({ _id: context.user._id})
                .select('-__v -password')
            return userData;
          }
          throw new AuthenticationError('Not Logged In');
      }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            //check to see if there is a user
            if(!user){
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPW = await user.isCorrectPassword(password);
            //checks to see if correct password for user
            if(!correctPW) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },
        saveBook: async(parent, {userData}, context) => {
            if(context.user) {
                const book = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $push: { savedBooks: userData}},
                    {new:true}
                );
                return book;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        deletePost: async(parent, {bookId}, context) => {
            if(context.user){
                const book = await User.findByIdAndDelete(
                    {_id: context.user._id},
                    {$pull: {saveBook:{bookId}}},
                    {new: true}
                );
                return book;
            }
            throw new AuthenticationError('You need to be logged in');
        },
    }
  };
  
  module.exports = resolvers;