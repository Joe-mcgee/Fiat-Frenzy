#!/bin/bash

set -e

docker-compose up -d

sleep 5

CLIENT="${docker ps | grep client | awk '{print $1}'}"

docker exec -it $CLIENT bash -c 'npm install drizzle --save'
docker exec -it $CLIENT bash -c 'npm install drizzle-react --save'
docker exec -it $CLIENT bash 'npm run start'
