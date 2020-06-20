import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookDetails extends Component {
    
    render() {
      console.log(this.props);
      return (
        <div>
            <div id="book-details">
                <p>Book Details</p>
            </div>
        </div>
      );
    }
  }
  
  export default graphql(getBooksQuery)(BookDetails);
  