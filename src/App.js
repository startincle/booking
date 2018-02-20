import React, { Component } from 'react';
import Card from './Card';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      times: ['2:00 PM', '2:20 PM', '2:40 PM', '3:00 PM', '3:20 PM', '3:40 PM'],
      selected: [],
      email: '',
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const response = await fetch(`https://startincle-booking.herokuapp.com/`);
    const people = await response.json();
    this.setState({ people });
    this.forceUpdate();
  }

  handleChange = e => {
    let selected = this.state.selected;
    selected = selected.filter((value) => value.name !== e.target.name);
    if (selected.length === 3) {
      selected.shift();
    }
    selected.push({ name: e.target.name, time: e.target.value, index: this.state.times.findIndex(value => value === e.target.value) });
    this.setState({ selected });
  }

  handleEmail = e => {
    this.setState({ email: e.target.value })
  }

  submit = async e => {
    if (this.state.email === '') {
      alert('Please enter a valid email!');
      return;
    }
    if (this.state.selected.length === 0) {
      alert('Please select at least one time slot');
      return;
    }
    await fetch(`https://startincle-booking.herokuapp.com/submit`, {
      method: 'POST',
      body: JSON.stringify({ selected: this.state.selected, email: this.state.email }),
      headers: {
        'content-type': 'application/json'
      },
    });
    this.setState({ selected: []}, () => { this.getData() })
    alert('Your slots have been booked!')
  }

  render() {
    return (
      <div className="App">
        <div className="jumbotron jumbotron-fluid">
          <div className="container text-center">
            <a href="https://startincle.com">
              <img
                alt="logo"
                src="https://static1.squarespace.com/static/5978f97d17bffcf8717aff7e/t/5979190703596ea773d2002c/1517452615378/?format=1500w"
                className="logo img-fluid"
              />
            </a>
            <h1 className="display-4">Community Office Hours</h1>
            <p className="lead">
              February 23rd from 2pm to 4pm @{' '}
              <a href="https://goo.gl/maps/QwLeKRLHcbM2" target="_blank" rel="noopener noreferrer">
                Gypsy Bean in Gordon Square
              </a>
            </p>
          </div>
        </div>
        <div className="people container">
          <div className="justify-content-center mt-4 py-5">
            <p className="lead px-5">
              Please select up to three meeting slots with the mentors you would
              like to meet with during the community office hours. Not all slots
              are guaranteed and some mentors may have changes in schedule
              making them unavailable at the time you requested. Thanks for
              participating!
            </p>
          </div>
          <div className="row justify-content-center mx-0">
            {this.state.people.map(value => (
              <Card
                key={value.name}
                person={value}
                name={value.name}
                title={value.title}
                image={value.image}
                slots={value.slots}
                times={this.state.times}
                handleChange={this.handleChange}
                selected={this.state.selected}
              />
            ))}
          </div>
        </div>
        <hr style={{ width: '75%' }} />
        <div className="submit text-center">
          <div className="row justify-content-sm-center mx-0 px-0">
            <div className="col-md-6">
              <input
                className="form-control form-control-lg"
                type="email"
                placeholder="Your Email Address"
                onChange={this.handleEmail}
              />
            </div>
            <div className="row justify-content-sm-center mt-4 mx-0 px-0">
              <div className="col-md-6">
                <div className="btn btn-lg btn-primary" onClick={this.submit}>
                  Request Time Slots
                </div>
                <p className="mt-4">
                  We will send you an email confirming the selections shortly. If you have questions or issues, please contact us at <a href="mailto:getinvolved@startincle.com">getinvolved@startincle.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>
            All Rights Reserved &copy; 2018 - <a href="https://startincle.com">StartInCLE</a> LLC
          </p>
        </div>
      </div>
    );
  }
}

export default App;
