import React from 'react';
import Logo from '../components/Logo.jsx';

const logo = {
  backgroundColor: 'red'
};

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state =  { query: '' };
    this.search = this.search.bind(this);
    this.queryChange = this.queryChange.bind(this);
  }

  search(e) {
    e.preventDefault();
    window.location.href = `/list?query=${this.state.query}`;
  }

  queryChange(e) {
    this.setState({ query: e.target.value});
  }

  render() {
    return (
      <div>
        <Logo styles={logo} />
        <form onSubmit={this.search}>
          <input type='text' value={this.state.query} onChange={this.queryChange} />
          <br/>
          <button type='submit'>Find</button>
        </form>
      </div>
    );
  }
  
}

export default Search;
