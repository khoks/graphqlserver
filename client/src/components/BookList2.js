import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        books{
            name,
            id
        }
    }
`
function displayBooks(context) {
    if(context){    
        let data = context.data;
        if(data.loading) {
            return <li>data is loading...</li>;
        } else {
            return data.books.map(book => {
                    return <li key={book.id}>{book.name}</li>
                }); 
        }
    }
};

function BookList2(props) {
    

  return (
    <div>
        {props.data.loading?<li>data is loading</li>:
        props.data.books.map(book => {
                    return <li key={book.id}>{book.name}</li>
                })}
      <ul id="book-list">
          {displayBooks(props)}
        </ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList2);
