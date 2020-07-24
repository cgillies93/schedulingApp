import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { without } from 'lodash';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      lastIndex: 0
    }
    this.deleteAppointment = this.deleteAppointment.bind(this);
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

  deleteAppointment(apt) {
    let tempApts = this.state.appointments;
    tempApts = without(tempApts, apt);

    this.setState({
      appointments: tempApts
    })
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
              <ListAppointments appointments={this.state.appointments}
                                deleteAppointment={this.deleteAppointment}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
