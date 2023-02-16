const firebase = require("./firebase.js");
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.post('/add-entry', async (req, res) => {
  try {
    console.log(req.body)
    const { name, apt_id } = req.body; // Assuming request body contains 'name' and 'description' fields
    
    // Add new entry to Firestore collection
    const entryRef = await firebase.db.collection('houses').doc("wntun3OGZXkvB6GMSKKZ").set({
      name,
      apt_id
    });

    res.status(200).send({ message: 'Entry added successfully', id: entryRef.id });
  } catch (error) {
    console.error('Error adding entry:', error);
    res.status(500).send({ error: 'Error adding entry' });
  }
});
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
