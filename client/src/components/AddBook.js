import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import * as compose from 'lodash.flowright';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        };
    }
    showAuthors() {
        var data = this.props.getAuthorsQuery;
        if(data.loading) {
            return <option disabled>No Options Yet</option>
        } else {
            return data.authors.map(author => {
                return <option key={author.id} value={author.id}>{author.name}</option>;
            });
            
        }
    }
    setStateForForm(e) {
        let name = e.target.getAttribute("name");
        switch (name) {
            case "name":
                this.setState({name: e.target.value});
                break;
            case "genre":
                this.setState({genre: e.target.value});
                break;
            case "authorId":
                this.setState({authorId: e.target.options[e.target.selectedIndex].value});
                break;
            default:
                break;
        };
    }
    submitForm(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [
                {query: getBooksQuery}
            ]
        });
    }
    render() {
      return (
        <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
            <div className="field">
                <label>Book:</label>
                <input type="text" onChange={ (e) => this.setState({name: e.target.value}) }/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" name="genre" onChange={ this.setStateForForm.bind(this) }/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select name="authorId" onChange={ this.setStateForForm.bind(this) }>
                    {this.showAuthors()}
                </select>
            </div>
            <button type="submit">+Add</button>
        </form>
      );
    }
  }
  
  export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"}),
  )(AddBook);
  