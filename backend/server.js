const firebase = require("./firebase.js");
const { FieldValue } = require('firebase-admin/firestore');
require("dotenv").config();

const express = require("express");
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(
  cors({origin: '*'})
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

app.post('/get-apt', async (req, res) => {
  try {
    console.log(req.body);
    const {apt_id} = req.body;
    const entryRef = await firebase.db.collection('houses').doc(apt_id+"");
    const doc = await entryRef.get();
    if (doc.exists) {
      res.status(200).send(doc.data());
    }
    else {
      res.status(200).send({ error: "No such apartment"});
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ error: "Can't retrieve this apartment"});
  }
})

app.post('/get-apts', async(req, res)=> {
  try {
    const {name} = req.body;
    const snapshot = await firebase.db.collection('houses').get();
    const aptlist = snapshot.docs.map(doc => doc.data());
    console.log(aptlist);
    console.log(name);
    apts = [];
    for (apt in aptlist) {
      if (aptlist[apt]["name"].toLowerCase().includes(name.toLowerCase())) {
        apts.push(aptlist[apt]);
      }
    }
    console.log(apts);
    res.status(200).send(apts);
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

app.post('/add-review', async(req, res)=> {
  try {
    const {email, apt_id, comment} = req.body;
    const snapshot = await firebase.db.collection('users').doc(email);
    const userinfo = await snapshot.get();
    const entryRef = await firebase.db.collection('houses').doc(apt_id+"");
    if (comment !== ""){
      entryRef.update(
        {
          reviews: FieldValue.arrayUnion({
            "name": userinfo.data()["name"],
            "review": comment
          })
        }
      )
      res.status(200).send({"message":"Review added successfully"});
    }
    else res.status(200).send({"message":"Review must not be empty"});
  }
  catch (error) {
    console.error(error);
    res.status(500).send({"error":"Error posting comment"});
  }
})

app.post('/get-user-apts', async(req, res)=> {
  try {
    const {email} = req.body;
    if (email === null) {
      res.status(200).send([]);
      return;
    }
    console.log(email);
    const aptids = await firebase.db.collection("users").doc(email).get();
    const houses = await firebase.db.collection('houses').get();
    const aptidlist = aptids.data();
    const houselist = houses.docs.map(doc => doc.data());
    console.log(aptidlist);
    console.log(houselist);
    var apts = [];
    for (aptid in aptidlist["apts"]) {
      for (house in houselist) {
        if (parseInt(aptidlist["apts"][aptid]) === parseInt(houselist[house]["apt_id"])) {
          apts.push(houselist[house]);
        }
      }
    }
    res.status(200).send(apts);
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Can't retrieve Apartment ID list");
  }
})

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
