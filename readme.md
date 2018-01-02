# Welcome


# Developer usage

## Using Docker

### Create image
$ docker image build -t react:app .

### See image details
docker image ls react:app

### Go into image
docker container run -it react:app bash

### Run
docker container run -it -p 80:8080 -p 35729:35729 -v $(pwd):/app react:app


# Print app output
$ docker logs <container id>

# Enter the container
$ docker exec -it <container id> /bin/bash

# Test
curl -i localhost:35729


## Using Docker-compose

# start
$ docker-compose up

# remove
$ docker-compose down

# See container IDs
$ docker ps

# Go into postgres container
$ docker exec -it [POSTGRES_CONTAINER_ID] /bin/bash
root@[CONTAINER_ID] $ su - postgres
root@[CONTAINER_ID] $ psql db

