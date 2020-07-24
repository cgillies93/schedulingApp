import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      lastIndex: 0
    }
  }


  componentDidMount() {
    fetch('./data.json')
    .then(response => response.json())
    .then(jsonResponse => {
      const appointments = jsonResponse.map(appointment => {
        appointment.aptId = this.state.lastIndex;
        this.setState({
          lastIndex: this.state.lastIndex + 1
        });
        return appointment;
      });

      this.setState({
        appointments: appointments
      });
    });
  }

  render() {

    return (
      <main className="page bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
              <AddAppointments />
              <SearchAppointments />
              <ListAppointments appointments={this.state.appointments}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
