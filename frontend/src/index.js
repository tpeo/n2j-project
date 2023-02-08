import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <br></br>
      <label>
        Distance to campus in meters:
        <input type="number" name = "distance" />
      </label>
      <br></br>
      <label>
        Star rating:
        1 <input type="radio" id="star1" name="star" value="1"></input>
        2 <input type="radio" id="star2" name="star" value="2"></input>  
        3 <input type="radio" id="star3" name="star" value="3"></input>  
        4 <input type="radio" id="star4" name="star" value="4"></input>  
        5 <input type="radio" id="star5" name="star" value="5"></input>  
      </label>
      <br></br>
      <input type="submit" value="Submit" />
    </form>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
