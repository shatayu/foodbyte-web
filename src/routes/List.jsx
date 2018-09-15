import React from 'react';
import queryString from 'query-string';
import StatusMessage from '../components/StatusMessage.jsx';
import RecipeCard from '../components/RecipeCard';

const exampleResults = require('../exampleQuery.json');

const redirect = (recipe) => {
  window.location.href = `/recipe?id=${recipe.id}&name=${recipe.title}`;
};

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fetching: true, recipes: [] };
  }

  componentDidMount() {
    let { query } = queryString.parse(this.props.location.search);
    new Promise((resolve, reject) => {
      setInterval(() => resolve(exampleResults), 1500);
    }).then((data) => {
      let recipes = data.results.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} onClick={() => redirect(recipe)}/>
      ));
      this.setState({ recipes, fetching: false });
    });
  }

  render() {
    let { fetching, recipes } = this.state;
    return (
      <div style = {{
        textAlign: 'center'
      }}>
        <StatusMessage status={fetching} />
        <div>
          {recipes}
        </div>
      </div>
    );
  }
  
}

export default List;
