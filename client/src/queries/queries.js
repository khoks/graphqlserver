import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books{
            name,
            id
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors{
            name,
            age,
            id
        }
    }
`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name,
            id
        }
    }
`

const getBookQuery = gql`
    query($id: String!){
        books($id: ID!) {
            id,
            name,
            genre,
            author{
                id,
                name,
                age,
                books{
                    name,
                    id
                }
            }
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};