# parking
 test parking lot

### USE DOCKER BUILD APP ONLY
```
docker build -t parking .
docker run -dp 3000:3000 parking
```
### USE DOCKER COMPOSE BUILD APP AND MYSQL
```
docker-compose up -d
```
### MYSQL TABLE PARKING
```
CREATE TABLE `parking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slot` int(11) NOT NULL,
  `plate` varchar(255) DEFAULT NULL,
  `car_size` varchar(255) DEFAULT NULL,
  `is_available` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `plate` (`plate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

### API
nodejs port:3000
mysql port:3306
```
1. api to create parking lot
method : post 
url : localhost:3000/parkingslot
send body json : { 
    "slot" : n //int } 

======================================================================
2. api to park the car
method : put 
url : localhost:3000/carenter
send body json : { 
    "plate" : "XXX-xxx1", //string
    "car_size" : "large" //(small, medium, large) } 

======================================================================
3. api to leave the slot
method : put 
url : localhost:3000/carleave
send body json : { 
    "plate" : "XXX-xxx1", //string } 

======================================================================
4. api to get status of parking lot
method : get 
url : localhost:3000/statusparking

======================================================================
5. api to get registration plate number list by car size
method : get 
url : localhost:3000/platebycarsize?carsize=? //(small, medium, large)

======================================================================
6. api to get registration allocated slot number list by car size
method : get 
url : localhost:3000/slotbycarsize?carsize=? //(small, medium, large)

======================================================================
7. api to get registration all data list by car size
method : get 
url : localhost:3000/parkingbycarsize/? //(small, medium, large)  

```

## TEST API 
```
1. call api : localhost:3000/parkingslot
send body json : { 
    "slot" : n } 
------------------------------------------------------------------
send n = 5; return {"message": "create parking lot success"}
send n < 0; return  {"message": "data is incorrect or require a value greater than 0"}
}

2. call api : localhost:3000/carenter
send body json : { 
    "plate" : "plate Number", 
    "car_size" : "car size" } 
------------------------------------------------------------------
send plate = "XXX-1" , car_size = "small" ; return {
    "message": "car enter success",
    "plate": "XXX1",
    "car_size": "large"
};
send plate = duplicate ; return {"message": "Plate number duplicate"};
send car_size = not match ("small","medium","large") ;{"message": "car_size is incorrect"};
send slot not enough return {"message": "parking lot is full or not have parking slot"};

3. call api : localhost:3000/carleave
send body json : { 
    "plate" : "plate Number"} 
------------------------------------------------------------------
send plate = "XXX1" ; return {
    "message": "car leave success",
    "plate": "XXX1"
};
send plate = not match ; return {}"message": "message": "Not Found Plate";

4. call api : localhost:3000/statusparking
------------------------------------------------------------------
return [
    {
        "slot": 1,
        "status": "not available"
    },
    {
        "slot": 2,
        "status": "available"
    },...n
];

5. call api : localhost:3000/platebycarsize?carsize=large  <--- result by car size
------------------------------------------------------------------
return [
    {
        "plate": "XXX5"
    },
    {
        "plate": "XXX3"
    }
];

6. localhost:3000/slotbycarsize?carsize=small  <--- result by car size
------------------------------------------------------------------
return [
    {
        "slot": 4
    }
];

==== get /params
7. localhost:3000/slotbycarsize/small  <--- result by car size
------------------------------------------------------------------
return [
    {
        "slot": 1,
        "plate": "XXX5",
        "car_size": "large",
        "status": "not available"
    },
    {
        "slot": 3,
        "plate": "XXX3",
        "car_size": "large",
        "status": "not available"
    }
];
```