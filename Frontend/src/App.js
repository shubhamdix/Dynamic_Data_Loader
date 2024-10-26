import { useState, useEffect } from 'react';
/*import Data from './data.csv';*/
/*import Data from './project.csv';*/
import React from 'react'
import Papa from 'papaparse';
import './App.css';
import "./Style.css"
import axios from 'axios';


/*const CSVDataTable = ({ data }) => {*/
  /*const headers = data.length > 0 ? Object.keys(data[0]) : [];*/


function App(props) {
  
  const [data, setData] = useState([]);
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  // parse CSV data & store it in the component state


  {/*const onSubmit=async (e)=> {
    e.preventDefault();
    await axios.post("http://localhost:8081",App)
    navigate("/log")
    console.log(App)  
};*/}

const [post, setPost] = useState({
  file: '',
})

const [get, setget] = useState({
  file: '',
})

const [urow, usetRow] = useState('')
const [editId, setEditID] = useState(-1)


const handleSubmit=async (event)=> {
  event.preventDefault()
   /*axios.post("http://jsonplaceholder.typicode.com/posts", {post})*/
   axios.post("http://localhost:8081/users", {post})
   .then(Response => console.log(data))
   .catch(err => console.log(err))
   console.log("Data Inserted...")

   event.preventDefault()
   /*axios.post("http://jsonplaceholder.typicode.com/posts", {post})*/
   axios.get("http://localhost:8081/users", {get})
   .then(Request => console.log(data))
   .catch(err => console.log(err))
   
   
  /*navigate("/log")*/
  
    
};



 /* var handleSubmit = function(e){
    e.preventDefault()
    var temp = {
        productName : e.target.productName.value,
        priceName : e.target.priceName.value,
        stockName : e.target.stockName.value,
        supplierId : e.target.supplierId.value,
        productDesc : e.target.productDesc.value, 
    }
    console.log(temp)
    props.save(temp)
}*/

   const handleFileUpload = (event) => {

    setPost({...post, [event.target.name]: event.target.value})

     const file = event.target.files[0];
     Papa.parse(file, {
       header: true,
       complete: (results) => {
         setData(results.data);
       },
     });
   };

   useEffect(()=> {
    fetch('http://localhost:8081/users')
    .then(res => res.json())
    //.then(res =>setData(res.data))
    .then(data => console.log(data))
    .catch(err => console.log(err));
   }, []);


   const handleEdit = (id) => {
    axios.get('http://localhost:8081/users/'+id)
    .then(res => {
      console.log(res.data)
      usetRow(res.data.row)
    })
    .catch(er =>console.log(er));
    setEditID(id)
   }

   const handleUpdate = () => {
    axios.put('http://localhost:8081/users'+editId, {id: editId, row: urow})
    .then(res => {
      console.log(res);
      //location.reload();
      setEditID(-1);
    }).catch(err => console.log(err));
   }

   const handleDelete = (id) => {
    axios.delete('http://localhost:8081/users'+id)
    .then(res => {
      //location.reload();
    })
    .catch(er =>console.log(er));
   }
   
  

 /* useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, { 
        header: true, 
        skipEmptyLines: true 
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);*/


  return (
    <div className="App">

<div className="container"> 
    
    <nav class="navbar navbar-expand-lg navbar-dark shadow mynav">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Dynamic Data Loader-CSV File : </a>
        
            <div class="collapse navbar-collapse" id="navbarNav">        
        <ul class="navbar-nav mb-2 mt-2">
            {<li class="nav-item"> <input type="file" accept=".csv" name="file" onChange={handleFileUpload}  /></li> }   
        </ul>
        </div>
        </div>
    </nav> 
    </div>
    

      {/*{ <input type="file" accept=".csv" onChange={handleFileUpload} /> }*/}

      {data.length === 0 ? (
      <p>No data available.</p>
    ) : (
    
      <form /*onSubmit={(e)=>onSubmit(e)}*/ onSubmit={handleSubmit}  >
        <table className="table" align='center'>
          <thead>
            <tr>
              {/*<th>Name</th>
              <th>Age</th>
              <th>Occupation</th>*/}
              {headers.map((header, index) => (
                <th key={index} /*style={tableHeaderStyle}*/> 
                  {header}
                </th>
              ))}
              <td><b>Action</b></td>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              row.id === editId ?
              <tr>
                <td>{row.id}</td>
                <td>{row}</td>
                <td><input type="file" accept=".csv" name="file" value={urow} onChange={e => usetRow(e.target.value)}/></td>
                <td><button onClick={handleUpdate}>Update</button></td>
              </tr>
              :
              <tr key={index}>
                {/*<td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.occupation}</td>*/}
                {headers.map((header, columnIndex) => (
                  <td key={columnIndex} /*style={tableCellStyle}*/>
                    {row[header]}
                    
                    

                  </td>
                ))}
                <td>
                    {/*<a href="" class="btn btn-success">EDIT</a>
                    <a href="" class="btn btn-danger">DELETE</a>*/}
                    <button class="btn btn-success" onClick={() => handleEdit(row.id)}>EDIT</button>
                    <button class="btn btn-danger"  onClick={() => handleDelete(row.id)}/*onClick={handleEdit}*/>DELETE</button>
                </td>
              </tr>
            ))}
             
          </tbody>
          <button colspan="2" class="btns btn-secondary" /*onClick={handleClick}/*{() => {navigate("/login")}}*/ >Submit</button>
          {/*<tr>
                <td colspan="2"><center><input type="submit" class="btns" value="Insert Product"/></center></td>
            </tr>*/}
        </table>
        </form>
        
      )}
          

      <br /><br />
      <footer><b> ~ Dynamic Data Loader ~</b></footer>
      

    </div>
  )
}


export default App;
/*export default CSVDataTable;*/