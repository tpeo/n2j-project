import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';

const Newapt = () => {
  return <form>
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
  </form>;
}

export default Newapt;