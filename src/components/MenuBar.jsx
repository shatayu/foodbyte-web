import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Star, User, Search } from 'react-feather';
import STYLE_CONSTS from '../style';

const margin = {
  margin: '5px 5px 5px'
};

class MenuBar extends React.Component {

  state = {
    starColor: STYLE_CONSTS.COLORS.YELLOW,
    bookColor: STYLE_CONSTS.COLORS.YELLOW,
    homeColor: STYLE_CONSTS.COLORS.YELLOW,
    userColor: STYLE_CONSTS.COLORS.YELLOW
  };

  constructor(props) {
    super(props);
    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    let COLORS = STYLE_CONSTS.COLORS;
    let state = {
      starColor: COLORS.YELLOW,
      bookColor: COLORS.YELLOW,
      homeColor: COLORS.YELLOW,
      userColor: COLORS.YELLOW
    }
    switch (page) {
      case '/favorites': state.starColor = COLORS.WHITE; break;
      case '/mealplan': state.bookColor = COLORS.WHITE; break;
      case '/search': state.homeColor = COLORS.WHITE; break;
      case '/profile': state.userColor = COLORS.WHITE; break;
    }
    this.setState(state);
  }

  starEnter() {
    this.setState({ starColor: STYLE_CONSTS.COLORS.WHITE });
  }
  starLeave() {
    if (!window.location.pathname.toString().startsWith('/favorites'))
      this.setState({ starColor: STYLE_CONSTS.COLORS.YELLOW });
  }

  bookEnter() {
    this.setState({ bookColor: STYLE_CONSTS.COLORS.WHITE });
  }
  bookLeave() {
    if (!window.location.pathname.toString().startsWith('/mealplan'))
      this.setState({ bookColor: STYLE_CONSTS.COLORS.YELLOW });
  }

  homeEnter() {
    this.setState({ homeColor: STYLE_CONSTS.COLORS.WHITE });
  }
  homeLeave() {
    if (!window.location.pathname.toString().startsWith('/search'))
      this.setState({ homeColor: STYLE_CONSTS.COLORS.YELLOW });
  }

  userEnter() {
    this.setState({ userColor: STYLE_CONSTS.COLORS.WHITE });
  }
  userLeave() {
    if (!window.location.pathname.toString().startsWith('/profile'))
      this.setState({ userColor: STYLE_CONSTS.COLORS.YELLOW });
  }

  componentDidMount() {
    let location = window.location.pathname.toString();
    let WHITE = STYLE_CONSTS.COLORS.WHITE;
    if (location.startsWith('/favorites')) {
      this.setState({ starColor: WHITE });
    } else if (location.startsWith('/mealplan')) {
      this.setState({ bookColor: WHITE });
    } else if (location.startsWith('/profile')) {
      this.setState({ userColor: WHITE });
    } else if (location.startsWith('/search')) {
      this.setState({ homeColor: WHITE });
    }
  }

  render() {
    let { starColor, bookColor, homeColor, userColor } = this.state;
    return (
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '25px'
      }}>
        <Link to='/favorites'>
          <Star size={45}
            onMouseEnter={this.starEnter.bind(this)}
            onMouseLeave={this.starLeave.bind(this)}
            color={starColor} style={margin} onClick={() => this.setPage('/favorites')} />
        </Link>
        <Link to='/mealplan'>
          <Book size={45}
            onMouseEnter={this.bookEnter.bind(this)}
            onMouseLeave={this.bookLeave.bind(this)}
            color={bookColor} style={margin} onClick={() => this.setPage('/mealplan')} />
        </Link>
        <Link to='/profile'>
          <User size={45}
              onMouseEnter={this.userEnter.bind(this)}
              onMouseLeave={this.userLeave.bind(this)}
              color={userColor} style={margin} onClick={() => this.setPage('/profile')} />
        </Link>
        <Link to='/search'>
          <Search size={50} 
            onMouseEnter={this.homeEnter.bind(this)} 
            onMouseLeave={this.homeLeave.bind(this)} 
            color={homeColor} style={margin} onClick={() => this.setPage('/search')} />
        </Link>
      </div>
    );
  }

}
export default MenuBar;
