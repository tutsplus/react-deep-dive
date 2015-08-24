// -----------------------------------------------
// Importing Modules
// -----------------------------------------------
import React from 'react';













// -----------------------------------------------
// Destructuring
// -----------------------------------------------

var { start, end } = {start: 'yesterday', end: 'tomorrow'},
    [first, second, ...rest] = [1, 2, 3, 4, 5],
    {list:[inner]} = {list: ['deep-thinker', 'values']};

console.log('[Destructuring]: ', start, end, first, second, rest, inner);












// -----------------------------------------------
// Template Strings
// -----------------------------------------------
var template = `<ul>
                    <li>${first}</li>
                    <li>${second}</li>
                </ul>`;
console.log(template);














// -----------------------------------------------
// Arrow functions
// -----------------------------------------------

// "this" is undefined
var config = {
    onChange: function () {
        console.log(this);
    },
    arrowChange: ()=> {
        console.log(this);
    }
};

config.onChange();
config.arrowChange(); // lexically capture this and pre-bind to it.









// -----------------------------------------------
// Object literals
// -----------------------------------------------
var simpleConfig = {
    prop: 'value',
    onChange() {}
};












// -----------------------------------------------
// Classes
// -----------------------------------------------
class MyComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (<h1>My Component</h1>);
    }
}












// -----------------------------------------------
// Exporting Modules
// -----------------------------------------------
var constants = {};

//export default class HelloComponent extends React.Component {
class HelloComponent extends React.Component {
    render(){
        return <h1>React Deep Dive</h1>
    }
}

export {constants, HelloComponent};
//export default HelloComponent;

