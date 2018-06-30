import gql from 'graphql-tag';

const standard = gql`
mutation login($username: String!, $password: String!) {
    login (username: $username, password: $password) {
        token
        user {
            email
            firstName
            lastName
        }
    }
}`;

export {standard};
