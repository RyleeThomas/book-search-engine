import { gql } from '@apollo/client';

//get logged in user data
export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;