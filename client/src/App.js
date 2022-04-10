//before connecting to the server setup the proxy in the react package.json file:   "proxy": "http://localhost:5000/",
// proxy server server as a gateway between your app and the client
// proxy server is an intermediate server between client and servers by forwarding client requests to resources.


//import the react and component to create a class component 
import React, { Component } from 'react';
//import axios(http library) for making request
import axios from 'axios';
//FileSaver.js is the solution to saving files on the client-side, and is perfect for web apps that generates files on the client
// we are importing a function call saveAs to specify what we are saving our file as
import { saveAs } from 'file-saver';
//import css file
import './App.css';

//class component created
class App extends Component {
  //create a state to accept and store data
  state = {
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0,
  }

  //handlechange function that take the target as an arguement and return the set state with a passed dynamic data
  //just like e.target.value or name
  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  //on submot function that occur when data is submitted to the browser
  createAndDownloadPdf = () => {
    //create an http request for post with a route of create post
    axios.post('/create-pdf', this.state)
    //The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a ReadableStream so its methods can be used for processing the data. 
    //  axios return promise(what happen when the data go through) that can be read as binary data
    .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      //get the response from the server and created a binary data of pdf
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      //and save the response as a binary data with a name(newPdf)
      saveAs(pdfBlob, 'newPdf.pdf');
    })
  }

  render() {
    //name in form can be used to provide data to the server
    //onChange function that occur when form is onchange
    return (
      <div className="App">
        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
    //onclick function that occur when data is click
  }
}


//export the content to index.js
export default App;
