import React from 'react';
import Logo from '../components/Logo.jsx';
import STYLE_CONSTS from '../style';

let COLORS = STYLE_CONSTS.COLORS;

const page = {
  textAlign: 'center'
};

const input = {
  fontSize: '1.5em',
  margin: '1em 1em 1em 1em',
  padding: '10px',
  width: '65vw',
  height: '2.25em',

  borderRadius: '16px',
  border: 'none'
};

const button = {
  width: "500px",
  height: "80px",
  backgroundColor: COLORS.PINK,

  borderRadius: "35px",
  border: "10px solid " + COLORS.YELLOW,

  color: COLORS.YELLOW,
  fontSize: "30px"
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
        <form onSubmit={this.search} style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
          <input id='text' type='text' value={this.state.query} onChange={this.queryChange} style={input} />
          <br/>
          <button id='submit' type='submit' style={button}           
            onMouseEnter={() => {
              let button = document.getElementById("submit");
              button.style.borderColor = COLORS.WHITE,
                button.style.color = COLORS.WHITE
            }}
            onMouseLeave={() => {
              let button = document.getElementById("submit");
              button.style.borderColor = COLORS.YELLOW,
                button.style.color = COLORS.YELLOW
          }}>
            FIND FOOD
          </button>
        </form>
      </div>
    );
  }
  
}

export default Search;
