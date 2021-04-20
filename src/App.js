import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./StudentTable.json";

function App() {
  const [myData, setData] = useState(data);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [test1, setTest1] = useState(0);
  const [test2, setTest2] = useState(0);
  const [test3, setTest3] = useState(0);

  useEffect(() => {
    let newData = data.map((data) => {
      let scoreSum = data.scores.test1 + data.scores.test2 + data.scores.test3;
      return { ...data, scoreSum };
    });

    newData.sort((a, b) => (a.scoreSum < b.scoreSum ? 1 : -1));

    setData(newData);

    
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let scores = {
      "test1": test1,
      "test2": test2,
      "test3": test3
    };
    const addEntry = (entry) => {
      let scoreSum = entry.scores.test1 + entry.scores.test2 + entry.scores.test3;
      let totaledEntry = { ...entry, scoreSum };
      let entries = [...myData, totaledEntry];
      entries.sort((a,b) => (a.scoreSum < b.scoreSum ? 1: -1));
      console.log(entries);
      setData(entries);
      setFirstName("");
      setLastName("");
      setAge(0);
      setTest1(0);
      setTest2(0);
      setTest3(0);
    };

    addEntry({ firstName, lastName, age, scores });
  };

  if (myData.length > 0) {
    return (
      <div className="App">
        <div>
          <table>
            <thead>
              <tr>
                <td>Student Name</td>
                <td>Age</td>
                <td>Test 1</td>
                <td>Test 2</td>
                <td>Test 3</td>
                <td>Score Sum</td>
              </tr>
            </thead>
            <tbody>
              {myData.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{`${data.firstName} ${data.lastName}`}</td>
                    <td>{data.age}</td>
                    <td>{data.scores.test1}</td>
                    <td>{data.scores.test2}</td>
                    <td>{data.scores.test3}</td>
                    <td>{data.scoreSum}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h1>New Entry</h1>
            <label>Age</label>
            <input
              type="number"
              name="age"
              onChange={(e) => {
                setAge(parseInt(e.target.value));
              }}
              value={age}
            />
            <br />
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
            />
            <br />
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
            />
            <br />
            <label>Test 1</label>
            <input
              type="number"
              name="test1"
              onChange={(e) => {
                setTest1(parseInt(e.target.value));
              }}
              value={test1}
            />
            <br />
            <label>Test 2</label>
            <input
              type="number"
              name="test2"
              onChange={(e) => {
                setTest2(parseInt(e.target.value));
              }}
              value={test2}
            />
            <br />
            <label>Test 3</label>
            <input
              type="number"
              name="test3"
              onChange={(e) => {
                setTest3(parseInt(e.target.value));
              }}
              value={test3}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <p>Loading....</p>
      </div>
    );
  }
}

export default App;
