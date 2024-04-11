let express = require("express");
let path = require("path");
let cors = require("cors");
require('dotenv').config();
let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const firebase = require("firebase-admin");
// console.log(JSON.parse(process.env.DATABASE_KEY))
// console.log(JSON.stringify())
firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(process.env.DATABASE_KEY)),
});
const db = firebase.firestore();
const PORT = process.env.PORT || 3000;
app.get("/",async(req,res)=>{
  try{
    const data = req.body;
  const jsonData = {
    data: data,
  };
  const respo = await db
    .collection("user")
    .doc(process.env.USER_ID)
    .update(jsonData);
  res.send(jsonData);
  }catch (err){
    res.send("Internal Error")
  }
})
app.post("/upload", async (req, res) => {
  const data = req.body;
  const jsonData = {
    data: data,
  };
  const respo = await db
    .collection("user")
    .doc(process.env.USER_ID)
    .update(jsonData);
  res.send(jsonData);
});

app.get("/getdata", async (req, res) => {
  const userRef = db.collection("user").doc(process.env.USER_ID);
  const respo = await userRef.get();
  res.send(respo.data());
});
app.listen(PORT, () => {
  console.log("running",PORT);
});
