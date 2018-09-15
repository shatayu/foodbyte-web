import React from 'react';
import queryString from 'query-string';

const status = {

};

const StatusMessage = ({ status, style }) => {
  let message = status ? 'We are fetching your recipes!' : 'Here are your recipes:';
  return <div style={style}>{message}</div>;
};

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fetching: true, recipes: [] };
  }

  componentDidMount() {
    let { query } = queryString.parse(this.props.location.search);
  }

  render() {
    let { fetching } = this.state;
    return (
      <div>
        <StatusMessage status={fetching} style={status} />
      </div>
    );
  }
  
}

export default List;
