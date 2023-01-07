const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(bodyParser.json());
const db = require("./model");
db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

const parking = require("./controller/parking.controller");
// Create a new parking
app.post("/parkingslot", parking.create);
app.put("/carenter", parking.updateCarEnter);
app.put("/carleave", parking.updateCarleave);
app.get("/statusparking",parking.findStatusParking);
app.get("/platebycarsize", parking.findPlateByCarsize);
app.get("/slotbycarsize", parking.findAllocatedSlotByCarsize);

// Get data parking by carsize
app.get("/parkingbycarsize/:carsize", parking.findParkingByCarsize);

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log('server is running on port: ', port);
});