import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { without, concat } from 'lodash';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      formDisplay: false,
      orderBy: 'aptDate',
      orderDir: 'asc',
      lastIndex: 0
    }
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
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

  addAppointment(apt) {
    let tempApts = this.state.appointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);

    this.setState({
      appointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }

  deleteAppointment(apt) {
    let tempApts = this.state.appointments;
    tempApts = without(tempApts, apt);

    this.setState({
      appointments: tempApts
    })
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  changeOrder(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    });
  }

  render() {

    let order;
    let filterApts = this.state.appointments;

    if(this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filterApts.sort((a,b) => {
      if(a[this.state.orderBy].toLowerCase() <
         b[this.state.orderBy].toLowerCase()) {

           return -1 * order;

         } else {

           return 1 * order;
         }
    });


    return (
      <main className="page bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
              <AddAppointments formDisplay={this.state.formDisplay}
                               toggleForm={this.toggleForm}
                               addAppointment={this.addAppointment}/>
              <SearchAppointments orderBy={this.state.orderBy}
                                  orderDir={this.state.orderDir}
                                  changeOrder={this.changeOrder}/>
              <ListAppointments appointments={filterApts}
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
