import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get('/api/values')
    .then(res => {
      console.log('Response : ', res.data);
      setLists(res.data);
    })
  }, []);

  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post('/api/value', {value})
    .then(res => {
      if(res.data.success){
        console.log('Response : ', res.data);
        setLists([...lists, res.data]);
        setValue("");
      }
      else{
        alert("DB Faild!!")
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className="container">
          {lists && lists.map((list, idx) => {
            <li key={idx}>list.value</li>
          })}


          <form className="example" onSubmit={submitHandler}>
            <input 
            type="text"
            placeholder="입력해주세요"
            onChange={changeHandler}
            value={value}/>
            <button type="submit">확인</button>
          </form>
        </div>

      </header>
    </div>
  );
}

export default App;
