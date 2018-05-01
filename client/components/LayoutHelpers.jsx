import React from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'


export class Table extends React.PureComponent {
    render() {
        return (
            <div className="table-responsive">
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
            </div>
        )
    }
}


export class TopNav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="#">Dashboard</a>
                <button
                    className="navbar-toggler navbar-toggler-right hidden-lg-up"
                    type="button" data-toggle="collapse" data-target="#top-navbar"
                    aria-controls="top-navbar" aria-expanded="false" aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="top-navbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link" exact>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/settings'} className="nav-link">Settings</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/profile'} className="nav-link">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/help'} className="nav-link">Help</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        )
    }
}


export class LeftNav extends React.Component {
    render() {
        return (
            <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar navbar-light bg-light">
                <ul className="nav nav-pills flex-column">
                    {
                        this.props.children && this.props.children.map((item, indx) => (
                            <li className="nav-item">
                                <NavLink to={item.path} className="nav-link" exact={item.exact}>{item.title}</NavLink>
                            </li>
                        ))
                    }
                </ul>
             </nav>
        )
    }
}
