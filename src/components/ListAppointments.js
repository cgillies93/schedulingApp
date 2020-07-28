import React, { Component } from 'react';
import Moment from 'react-moment';
import { IoMdClose } from "react-icons/io";

class ListAppointments extends Component {

  render() {

    return (
      <>
        <h4 className="text-center">Upcoming Appointments</h4>
        <div className="appointment-list">
          {this.props.appointments.map(apt => (
            <div className="appointment-card card" key={apt.id}>
              <button className="delete btn btn-sm btn-danger"
                      onClick={() => this.props.deleteAppointment(apt)}>
                <IoMdClose className="delete-x"/>
              </button>
              <div className="pet-name">
                <h6>Pet Name</h6>
                <p>{apt.pet_name}</p>
              </div>
              <div className="owner-name">
                <h6>Owner Name</h6>
                <p>{apt.owner_name}</p>
              </div>
              <div className="notes">
                <h6>Notes:</h6>
                <p>{apt.notes}</p>
              </div>
              <div className="date">
                <h6>Appointment {'Date'}</h6>
                <span>
                  <Moment
                    date={apt.date}
                    parse="YYYY-MM-dd hh:mm"
                    format="MMM-D h:mma"
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </>

    );
  }
}

export default ListAppointments;
