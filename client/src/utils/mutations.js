import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

//must be logged in to use
//will return Username and savedBooks
export const SAVE_BOOK = gql`
    mutation saveBook($input: bookData) {
        saveBook(input: $input) {
            username
            savedBooks {
                bookId
                description
                title
                image
                link
                authors
            }
        }
    }
`;

//must be logged in to use 
//will return username and new savedBooksId
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            username
            savedBooks {
                bookId
            }
        }
    }
`;