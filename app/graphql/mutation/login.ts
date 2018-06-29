import gql from 'graphql-tag';

const standard = gql`
mutation loginLdap($email: String!, $password: String!) {
    loginLdap (email: $email, password: $password) {
        token
        user {
            name
        }
    }
}`;

export {standard};
