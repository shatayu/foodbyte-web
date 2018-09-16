import React from 'react';
import Autocomplete from 'react-autocomplete';

const style = {
};

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { diet: '', calories: 0, excluded: '' };
  }

  saveConfig(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.saveConfig.bind(this)}>
        Profile
        <div>
          Diet<br/>
          <Autocomplete
            getItemValue={(item) => item}
            items={[
              //pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
              'pescatarian',
              'lacto vegetarian',
              'ovo vegetarian',
              'vegan',
              'vegetarian'
            ]}
            renderItem={(item, isHighlighted) => {
              return (
                <p>{item}</p>
              );
            }}
            value={this.state.diet}
            onChange={(e) => this.setState({diet: e.target.value}) }
            onSelect={(val) => this.setState({ diet: val}) }
              />
        </div>
        <div>
          Target Calories<br />
          <input
            type='text'
            value={this.state.calories}
            onChange={(e) => this.setState({
              calories: e.target.value
            })}
            />
        </div>
        <div>
          Excluded Items<br />
          <input
            type='text'
            value={this.state.excluded}
            onChange={(e) => this.setState({ excluded: e.target.value })} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    );
  }

}
export default Profile;
