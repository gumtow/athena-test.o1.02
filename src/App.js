import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./StudentTable.json";
import useCustomForm from "./hooks/useCustomForm"

function App() {
  const [myData, setData] = useState([]);

  const initialValues = {
    name:"",
    lastName:"",
    age:0,
    scores:{
      test1:0,
      test2:0,
      test3:0
    }
  };


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  } = useCustomForm({ 
    initialValues, 
    onSubmit: values => setData({ ...myData, values })
  });





  useEffect(() => {
    let newData = data.map((data) => {
      let scoreSum = data.scores.test1 + data.scores.test2 + data.scores.test3;
      return { ...data, scoreSum };
    });

    newData.sort((a, b) => (a.scoreSum < b.scoreSum ? 1 : -1));

    setData(newData);
  }, []);

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
        <div >
          <form onSubmit={handleSubmit}>
            <h1>Custom Hooks Form</h1>
            <label>Age</label>
            <input type="number" name="age"  onChange={handleChange} value={values.age} />
            <br />
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} value={values.name} />
            <br />
            <label>LastName</label>
            <input type="text" name="lastName"  onChange={handleChange} value={values.lastName} />
            <br />
            <label>Test Score 1</label>
            <input type="number" name="values.scores.test1"  onChange={handleChange} value={values.scores.test1} />
            <br />
            <label>Test Score 2</label>
            <input type="number" name={values.scores.test2}  onChange={handleChange} value={values.scores.test2} />
            <br />
            <label>Test Score 3</label>
            <input type="number" name={values.scores.test3}  onChange={handleChange} value={values.scores.test3} />
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
