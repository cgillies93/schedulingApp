import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';

class App extends Component {

  render() {
    return (
      <main className="page bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
              <AddAppointments />
              <div>Search Appointments</div>
              <div>List Appointments</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
