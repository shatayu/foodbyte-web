import React from 'react';
import Logo from '../components/Logo.jsx';

const page = {
  textAlign: 'center'
};

const input = {
  fontFamily: 'Trebuchet MS',
  fontSize: '1.5em'
};

const button = {
  fontFamily: 'Trebuchet MS',
  fontSize: '1em'
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
      <div style={page}>
        <Logo />
        <form onSubmit={this.search}>
          <input type='text' value={this.state.query} onChange={this.queryChange} style={input} />
          <br/>
          <button type='submit' style={button}>Find</button>
        </form>
      </div>
    );
  }
  
}

export default Search;
