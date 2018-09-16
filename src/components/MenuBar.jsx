import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Book, Star } from 'react-feather';
import STYLE_CONSTS from '../style';

const margin = {
  margin: '5px 5px 5px'
};

class MenuBar extends React.Component {

  state = {
    starColor: STYLE_CONSTS.COLORS.YELLOW,
    bookColor: STYLE_CONSTS.COLORS.YELLOW,
    homeColor: STYLE_CONSTS.COLORS.YELLOW
  };

  starEnter() {
    this.setState({ starColor: STYLE_CONSTS.COLORS.WHITE });
  }
  starLeave() {
    this.setState({ starColor: STYLE_CONSTS.COLORS.YELLOW });
  }

  bookEnter() {
    this.setState({ bookColor: STYLE_CONSTS.COLORS.WHITE });
  }
  bookLeave() {
    this.setState({ bookColor: STYLE_CONSTS.COLORS.YELLOW });
  }

  homeEnter() {
    this.setState({ homeColor: STYLE_CONSTS.COLORS.WHITE });
  }

  homeLeave() {
    this.setState({ homeColor: STYLE_CONSTS.COLORS.YELLOW });
  }

  render() {
    let { starColor, bookColor, homeColor } = this.state;
    return (
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '25px'
      }}>
        <Link to='/favorites'>
          <Star size={50}
            onMouseEnter={this.starEnter.bind(this)} 
            onMouseLeave={this.starLeave.bind(this)} 
            color={starColor} style={margin} />
        </Link>
        <Link to='/history'>
          <Book size={50} 
            onMouseEnter={this.bookEnter.bind(this)} 
            onMouseLeave={this.bookLeave.bind(this)} 
            color={bookColor} style={margin} />
        </Link>
        <Link to='/'>
          <Home size={50} 
            onMouseEnter={this.homeEnter.bind(this)} 
            onMouseLeave={this.homeLeave.bind(this)} 
            color={homeColor} style={margin} />
        </Link>
      </div>
    );
  }

}
export default MenuBar;