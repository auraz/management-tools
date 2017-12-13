/*
    ./client/components/App.jsx
    Question, why components is working dir? (if i set client in webpack context.)
    Where to store css?
*/
import React from 'react';
import './dashboard.css';

export  default class App extends React.Component {
  render() {
        return (
         <div>Hello Manager</div>
        );
  }
}
