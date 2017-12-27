FROM node:carbon

# Add dependencies
ADD yarn.lock /yarn.lock
ADD package.json /package.json

# Add node_path to sys variables and install dependencies
# it puts it in the root of the container, so it did not get synced by Docker.
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
ENV DOCKER=yes

RUN yarn

# Create app folder in root of a docker container image. Sync will be done by docker-compose.
WORKDIR /app

EXPOSE 8080
EXPOSE 35729

CMD [ "yarn", "start" ]
