import gql from 'graphql-tag';

const standard = gql(
`
mutation login($email: String!, $password: String!) {
    login (email: $email, password: $password) {
        token
        user {
            name
        }
    }
}
`);

export {standard};