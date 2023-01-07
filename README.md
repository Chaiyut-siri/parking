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
