/*
    Person list
*/
import React from 'react';

export default class PersonList extends React.Component {


    constructor(props) {
        super(props)

        let inputpersons = {
            'key1': 'value2',
            'key2': 'value2',
            'key3': 'value3',
        }


        this.listItems = [];

        // console.log(persons)
        for (const key of Object.keys(persons)) {
            this.listItems.push(key +  " -> " + persons[key])
        }
        // console.log(this.listItems)

        this.listItems = this.listItems.map( (person) => <li key = { person.toString() } > {person} </li>);
    }


    render() {
        return (<ul>{this.listItems}</ul>);
    }

}
