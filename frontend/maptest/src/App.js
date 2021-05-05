import React,{useEffect} from 'react';
import './App.css';

function App() {


  useEffect(()=> {
    async function getAddress(){
      let url= "http://postcodes.io/postcodes/b10/autocomplete";
    let response =  await fetch(url);
    let data = await response.json();
      console.log(data);
      console.log('got it?');

  
    }
    getAddress();
  } ,[]);



  return (
    <div className="App">
  
    </div>
  );
}

export default App;
