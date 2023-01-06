# parking
 test parking lot

# USE DOCKER BUILD APP AND START
docker build -t parking .
docker run -dp 3000:3000 parking

# USE DOCKER COMPOSE BUILD APP AND MYSQL
docker-compose up -d