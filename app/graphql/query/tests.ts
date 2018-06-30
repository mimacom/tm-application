import gql from 'graphql-tag';

const tests = gql`
    query {
        tests {
            name
            description
        }
    }
`;

export {tests};
