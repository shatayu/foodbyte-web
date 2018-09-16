import React from 'react';
import Autocomplete from 'react-autocomplete';

const style = {
};

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { diet: '', calories: 0 };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
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
              calories: parseInt(e.target.value) ? parseInt(e.target.value) : this.state.calories
            })}
            />
        </div>
      </div>
    );
  }

}
export default Profile;
