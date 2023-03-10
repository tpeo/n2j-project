const firebase = require("./firebase.js");
require("dotenv").config();

const express = require("express");
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(
  cors({origin:['http://localhost:3000', 'http://127.0.0.1:3000']})
)
app.post('/add-apt', async (req, res) => {
  try {
    console.log(req.body)
    const { name, apt_id, rating } = req.body; // Assuming request body contains 'name' and 'description' fields
    
    // Add new entry to Firestore collection
    // Apartment ID will be used to identify it in the database
    const entryRef = await firebase.db.collection('houses').doc(apt_id + "").set({
      name,
      apt_id,
      rating
    });

    res.status(200).send({ message: 'Entry added successfully', id: entryRef.id });
  } catch (error) {
    console.error('Error adding entry:', error);
    res.status(500).send({ error: 'Error adding entry' });
  }
});

app.get('/get-apt', async (req, res) => {
  try {
    console.log(req.body);
    const {apt_id} = req.body;
    const entryRef = await firebase.db.collection('houses').doc(apt_id+"");
    const doc = await entryRef.get();
    if (doc.exists) {
      res.status(200).send(doc.data());
    }
    else {
      res.status(200).send("No such apartment");
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Can't retrieve this apartment");
  }
})

app.get('/get-all', async(req, res)=> {
  try {
    const snapshot = await firebase.db.collection('houses').get();
    res.status(200).send(snapshot.docs.map(doc => doc.data()));
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Can't retrieve Apartment ID list");
  }
})

app.post('/get-user', async(req, res)=> {
  try {
    const {email} = req.body;
    const snapshot = await firebase.db.collection('users').get(email);
    res.status(200).send(snapshot.docs.map(doc => doc.data()));
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Can't retrieve Apartment ID list");
  }
})

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
