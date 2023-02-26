const firebase = require("./firebase.js");
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.post('/add-apt', async (req, res) => {
  try {
    console.log(req.body)
    const { name, apt_id } = req.body; // Assuming request body contains 'name' and 'description' fields
    
    // Add new entry to Firestore collection
    // Apartment ID will be used to identify it in the database
    const entryRef = await firebase.db.collection('houses').doc(apt_id + "").set({
      name,
      apt_id
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

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
