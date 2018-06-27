import gql from 'graphql-tag';

const drafts = gql(
    `
{
    drafts{
        title
    }
}
`);

export {drafts};
