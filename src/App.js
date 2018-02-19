import React, { Component } from 'react';
import Card from './Card';

const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRcjfFLuJ09-f6QHgGzUQyDKs7teuBQaUcBZDX1SnINFERPopy5VR0h0hJ0CFXOwHtFGWnxFixtDCas/pub?output=csv';
const parseCSV = (csv) => {
  const rows = csv.split('\n');
  const times = rows.shift().split(',').slice(3);
  const people = rows.map(value => {
    const row = value.split(',');
    const person = {};
    person['name'] = row.shift();
    person['image'] = row.shift();
    person['slots'] = row.splice(-6);
    person['title'] = row.reduce((a,b) => `${a},`.concat(b));
    return person;
  });
  return { people, times };
}

const getData = async () => {
  const response = await fetch (sheetUrl);
  const body = await response.text();
  return parseCSV(body);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      times: [],
      selected: [],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const response = await fetch (sheetUrl);
    const body = await response.text();
    this.setState(parseCSV(body));
  }

  handleChange = e => {
    let selected = this.state.selected;
    selected = selected.filter((value) => value.name !== e.target.name);
    if (selected.length === 2) {
      selected.shift();
    }
    selected.push({ name: e.target.name, time: e.target.value });
    this.setState({ selected });
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
          <div className="row justify-content-center mt-4 py-5">
            <p className="lead px-5">
              Please select up to three meeting slots with the mentors you would
              like to meet with during the community office hours. Not all slots
              are guaranteed and some mentors may have changes in schedule
              making them unavailable at the time you requested. Thanks for
              participating!
            </p>
          </div>
          <div className="row justify-content-center">
            {this.state.people.map(value => (
              <Card
                key={value.name}
                name={value.name}
                title={value.title}
                image={value.image}
                times={this.state.times}
                slots={value.slots}
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
              <input className="form-control form-control-lg" type="email" placeholder="Your Email Address" />
            </div>
            <div className="row justify-content-sm-center mt-4 mx-0 px-0">
              <div className="col-md-6">
                <div className="btn btn-lg btn-primary">
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
