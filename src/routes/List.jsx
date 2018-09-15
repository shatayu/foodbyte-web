import React from 'react';
import queryString from 'query-string';
import StatusMessage from '../components/StatusMessage.jsx';

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
        <StatusMessage status={fetching} />
      </div>
    );
  }
  
}

export default List;
