import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//imported components
import BookList from './components/BookList';
import BookList2 from './components/BookList2';
import AddBook from './components/AddBook';

//Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Test React App</h1>
        <BookList param1="value1"/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
