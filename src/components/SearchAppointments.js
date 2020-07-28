import React, { Component } from 'react';

class SearchAppointments extends Component {

  render() {

    return (
          <div className="search-form">
            <form className="form-inline my-2 my-lg-0">
              <div>
                <input className="form-control mr-sm-2" type="search"
                       placeholder="Search Appointments" aria-label="Search"
                       onChange={e => this.props.search(e.target.value)}/>
              </div>
              <a className="nav-link dropdown-toggle sort-btn" href="#"
                 id="filter" role="button" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
                Sort By
              </a>
              <div className="dropdown-menu" aria-labelledby="filter">

                <a className={
                              "dropdown-item filter-item " +
                              (this.props.orderBy === "pet_name" ? "active" : "")
                            }
                   onClick={ e => {
                     this.props.changeOrder("pet_name", this.props.orderDir);
                    }
                   }
                   href="#">Pet Name</a>
                <a className={
                              "dropdown-item filter-item " +
                              (this.props.orderBy === "owner_name" ? "active" : "")
                            }
                  onClick={ e => {
                    this.props.changeOrder("owner_name", this.props.orderDir);
                    }
                   }
                   href="#">Owner Name</a>
                <a className={
                              "dropdown-item filter-item " +
                              (this.props.orderBy === "date" ? "active" : "")
                            }
                    onClick={ e => {
                      this.props.changeOrder("date", this.props.orderDir);
                     }
                    }
                    href="#">{"Date"}</a>

                <div className="dropdown-divider"></div>
                <a className={
                              "dropdown-item filter-item " +
                              (this.props.orderDir === "asc" ? "active" : "")
                            }
                    onClick={ e => {
                      this.props.changeOrder(this.props.orderBy, "asc");
                     }
                    }
                    href="#">Asc</a>
                <a className={
                              "dropdown-item filter-item " +
                              (this.props.orderDir === "desc" ? "active" : "")
                            }
                    onClick={ e => {
                      this.props.changeOrder(this.props.orderBy, "desc");
                     }
                    }
                    href="#">Desc</a>
              </div>
            </form>
          </div>
    );
  }
}

export default SearchAppointments;
