import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Roles from './Roles.jsx'

export class Table extends React.Component {
    render() {
        return (
        <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1,001</td>
                  <td>Lorem</td>
                  <td>ipsum</td>
                  <td>dolor</td>
                  <td>sit</td>
                </tr>
                <tr>
                  <td>1,002</td>
                  <td>amet</td>
                  <td>consectetur</td>
                  <td>adipiscing</td>
                  <td>elit</td>
                </tr>
              </tbody>
        </table>
        )
    }
}

export class TopNav extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
                    <button className="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Dashboard</a>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Settings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Help</a>
                        </li>
                    </ul>
                    <form className="form-inline mt-2 mt-md-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    </div>
                </nav>
            </div>
        )
    }
}


export class LeftNav extends React.Component {
    render() {
        return (
            <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="/">Overview <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <Link to={'/teams'} className="nav-link">Teams</Link>
            </li>
            <li className="nav-item">
              <Link to={'/people'} className="nav-link">People</Link>
            </li>
            <li className ="nav-item">
                <Link to={'/roles'} className="nav-link">Roles</Link>
            </li>
          </ul>

             </nav>
            )
    }
}

export class MainPart extends React.Component {
    render() {
        return (
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
            <h1>Vision</h1>
            <section className="row text-center placeholders">
                <div className="col-6">
                    <Route path="/roles" component={Roles}/>
                </div>
          </section>

        </main>
            )
    }
}


