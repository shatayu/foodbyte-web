import React from 'react';
import Logo from '../components/Logo.jsx';

const COLORS = {
  WHITE: '#FFFFFF',
  YELLOW: '#FEE608',
  ORANGE: '#FB9D07',
  PINK: '#EC5357',
  RED: '#971D12'
};

const page = {
  textAlign: 'center'
};

const input = {
  fontFamily: 'Trebuchet MS',
  fontSize: '1.5em',
  margin: '1em 1em 1em 1em',
  width: '26.25%'
};

const button = {
  fontFamily: 'Trebuchet MS',
  fontSize: '1em',
  backgroundColor: COLORS.YELLOW,
  color: COLORS.RED,
  border: `2px solid ${COLORS.RED}`
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
        <form onSubmit={this.search}>
          <input type='text' value={this.state.query} onChange={this.queryChange} style={input} />
          <br/>
          <button type='submit' style={button}>Find Food</button>
        </form>
      </div>
    );
  }
  
}

export default Search;
