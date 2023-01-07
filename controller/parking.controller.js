const db = require("../model");
const Parking = db.parking;
const { QueryTypes } = require('sequelize');

// Create parking slot
exports.create = async (req, res) => {
  // Validate request and Check condition 
  if (!req.body.slot) {
    res.status(400).send({
      message: "data is incorrect or require a value greater than 0"
    }); 
    return;
  }else if (req.body.slot < 1) {
      res.status(400).send({
          message: "require a value greater than 0"
      });
      return;
  }

  // Truncate table paring for new use
  await Parking.destroy({
    truncate: true
  });

  let createSlot = [];
  for (let index = 1; index <= req.body.slot; index++) {
      const parkingObj = {
          slot: 1, 
          plate: null,
          car_size: "",
          is_available : 1
      };
      parkingObj.slot = index;
      createSlot.push(parkingObj);     
  }

  // Create parking slot
  Parking.bulkCreate(createSlot)
  .then(() => {
    res.status(200).send({
      message: "create parking lot success"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "data is incorrect"
    });
  });
};

// Update car enter parking
exports.updateCarEnter = async (req, res) => {
  // Validate request
  if ((!req.body.plate)&&(!req.body.plate)) {
      res.status(400).send({
        message: "data is incorrect"
      });
      return;
  }

  let sizeList = ["small", "medium", "large"]
  if (sizeList.indexOf(req.body.car_size) < 0) {
    res.status(200).send({
      message: "car_size is incorrect"
    });
    return;
  }

  const parking = {
    plate: req.body.plate,
    car_size: req.body.car_size,
    is_available : 0
  };

  // Get parking slot nearest to the entry
  const result = await db.sequelize.query("SELECT MIN(slot) as slot FROM parking WHERE is_available = 1", { type: QueryTypes.SELECT });
  if (result[0].slot == null){
    res.status(200).send({
      message: "parking lot is full or not have parking slot"
    });
    return;
  }

  // Update car enter pringking slot in mysql
  Parking.update(parking, {
      where: {
        slot: result[0].slot
      }
  }).then(data => {
      res.status(200).send({
        message: "car enter success",
        plate: req.body.plate,
        car_size: req.body.car_size
      });
  }).catch(err => {
      res.status(500).send({
        message: "Plate number duplicate"
      });
  });
};

// Update car leave parking
exports.updateCarleave = async (req, res) => {
  // Validate request
  if ((!req.body.plate)&&(!req.body.plate)) {
      res.status(400).send({
        message: "data is incorrect"
      });
      return;
  }

  const parking = {
    plate: null,
    car_size: "",
    is_available : 1
  };

  // Update car leave pringking slot in mysql
  Parking.update(parking,  {
    where: {
      plate: req.body.plate
    }
  }).then(data => {
    if (data[0] == 1){
      res.status(200).send({
        message: "car leave success",
        plate: req.body.plate
      });
      return;
    }else {
      res.status(200).send({
        message: "Not Found Plate"
      });
      return;
    }
    
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "data is incorrect"
    });
  });
};

// Get status parking
exports.findStatusParking = (req, res) => {
  db.sequelize.query('SELECT slot, IF(is_available=1, "available", "not available") as status FROM parking', { type: QueryTypes.SELECT }
  ).then(data => {
    if (data=="") {
      res.status(200).send({
        message : "Not found data"
      });
      return;
    }
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send({
      message : err.message || "data is incorrect"
    });
  });
};

// Get plate by car size
exports.findPlateByCarsize = (req, res) => {
  let {
    carsize
  } = req.query
  // Validate request
  if (!carsize) {
    res.status(400).send({
      message: "data is incorrect"
    });
    return;
  }

  let sizeList = ["small", "medium", "large"]
  if (sizeList.indexOf(carsize) < 0) {
    res.status(200).send({
      message: "car_size is incorrect"
    });
    return;
  }

  Parking.findAll({
    where: {
      car_size: carsize
    },
    attributes: ['plate']
  }).then(data => {
    if (data=="") {
      res.status(200).send({
        message : "Not found data"
      });
      return;
    }
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "data is incorrect"
    });
  });
};

// Find allocated slot number by car size
exports.findAllocatedSlotByCarsize = (req, res) => {
  // Validate request
  let {
    carsize
  } = req.query
  // Validate request
  if (!carsize) {
    res.status(400).send({
      message: "data is incorrect"
    });
    return;
  }

  let sizeList = ["small", "medium", "large"]
  if (sizeList.indexOf(carsize) < 0) {
    res.status(200).send({
      message: "car_size is incorrect"
    });
    return;
  }

  Parking.findAll({
    where: {
      car_size: carsize
    },
    attributes: ['slot']
  }).then(data => {
    if (data=="") {
      res.status(200).send({
        message : "Not found data"
      });
      return;
    }
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "data is incorrect"
    });
  });
};

// Find data Parking by car size
exports.findParkingByCarsize = (req, res) => {
  // Validate request
  let {
    carsize
  } = req.params
  // Validate request
  if (!carsize) {
    res.status(400).send({
      message: "data is incorrect"
    });
    return;
  }

  let sizeList = ["small", "medium", "large"]
  if (sizeList.indexOf(carsize) < 0) {
    res.status(200).send({
      message: "car_size is incorrect"
    });
    return;
  }

  db.sequelize.query(`SELECT slot, IFNULL(plate, "") as plate, car_size, IF(is_available=1, "available", "not available") as status FROM parking WHERE car_size = "${carsize}"`, { type: QueryTypes.SELECT }
  ).then(data => {
    if (data=="") {
      res.status(200).send({
        message : "Not found data"
      });
      return;
    }
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send({
      message : err.message || "data is incorrect"
    });
  });
};