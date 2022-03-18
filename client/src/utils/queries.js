import { gql } from '@apollo/client';

//get logged in user data
export const QUERY_ME_BASIC = gql`
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