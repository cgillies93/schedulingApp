import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { without } from 'lodash';

const API_URI = 'http://localhost:5000';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      formDisplay: false,
      orderBy: 'date',
      orderDir: 'asc',
      queryParams: '',
      numApts: 0
    }
    this.getAppointments = this.getAppointments.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getAppointments();
  }

  getAppointments() {
    fetch(`${API_URI}/`)
    .then(response => response.json())
    .then(jsonResponse => {
      this.setState({
        appointments: jsonResponse.appointments,
        numApts: jsonResponse.number_of_appointments
      })
    });
  }

  addAppointment(apt) {
    console.log(apt);
    fetch(`${API_URI}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apt)
    })
    .then(response => {
      let tempApts = this.state.appointments;
      tempApts.push(apt);
      this.setState({
        appointments: tempApts
      });
    })
    .catch(error => {console.log(error)})
  }

  deleteAppointment(apt) {
    console.log(apt);
    fetch(`${API_URI}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apt)
    })
    .then(response => {
      let tempApts = this.state.appointments;
      tempApts = without(tempApts, apt);
      this.setState({
        appointments: tempApts
      });
    })
    .catch(error => {console.log(error);})

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

  search(queryParams) {
    this.setState({
      queryParams: queryParams
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

    filterApts = filterApts.sort((a,b) => {
      if(a[this.state.orderBy].toLowerCase() <
         b[this.state.orderBy].toLowerCase()) {

           return -1 * order;

         } else {

           return 1 * order;
         }
    })
    .filter(apt => {
      return (
        apt['pet_name']
        .toLowerCase()
        .includes(this.state.queryParams.toLowerCase()) ||
        apt['owner_name']
        .toLowerCase()
        .includes(this.state.queryParams.toLowerCase()) ||
        apt['notes']
        .toLowerCase()
        .includes(this.state.queryParams.toLowerCase())
      );
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
                                  changeOrder={this.changeOrder}
                                  search={this.search}/>
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
