import './App.css';
import axios from 'axios';
import { useEffect, useState,useRef } from 'react';

function App() {
  const [input, setInput] = useState({});
  const [notesdata, setNotesData] = useState([]);
  const handleChange = (e) => {
    const payload = {
      [e.target.name]: e.target.value,
      date:new Date()
    }
    
    setInput({ ...input,...payload });
  };

  const getNotesData = () => {
    axios.get('http://localhost:3001/notes').then((res) => {
      return res;
    }).then(({data}) => {
      setNotesData(data);
      return data;
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3001/notes').then((res) => {
      return res;
    }).then(({data}) => {
      setNotesData(data);
    })
  })

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3001/notes', input).then((res) => {
    e.target.reset();
    getNotesData();
  }).catch((err) => {
    alert(err);
  })
}

  var on = useRef(null);
  
  var ba = false;
  
  const handleDelete = (e) =>
  {
    axios.delete(`http://localhost:3001/notes/${e.target.value}`);
    getNotesData();
  }

  const handleUpdate = (e) => {
    axios.patch(`http://localhost:3001/notes/${e.target.value}`,{description:on.current.value});
    getNotesData();
  }



  const handleSort = () => {
    axios.get('http://localhost:3001/notes?_sort=date&_order=desc').then((res) => {
      return res;
    }).then(({ data }) => {
      console.log(data);
      setNotesData(data);
    })

  }
  return (
    <div className="App">
      <h1>Notes - App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} placeholder="Enter Notes Title"/>
        <br/>
        <textarea name="description" onChange={handleChange} placeholder="Enter Description" width="200" height="200px"></textarea>
        <br/>
        <input type="submit" value="Save Notes"/>
      </form>

        <button onClick={()=>{handleSort()}}>Sort Data DateWise</button>
      {
        notesdata.map((e) => {
          
          return <div className="styleBox">
            <h1>{e.title}</h1>
            <p>{e.date}</p>
            <textarea ref={on}>{e.description}</textarea>
            <br/>
            <button onClick={handleDelete} value={e.id}>Delete</button><button onClick={handleUpdate} value={e.id}>Update</button>
             
          </div>
          
        })
      }
      
    </div>
  );
}

export default App;
