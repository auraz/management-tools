FROM node:carbon

# Add dependencies
ADD yarn.lock /yarn.lock
ADD package.json /package.json

# Do we need to add package-lock as well?

# Add node_path to sys variables and install dependencies
# it puts it in the root of the container, so it did not get synced by Docker.
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
ENV DOCKER=yes

RUN yarn

# Create app folder in root of a docker container image folder and copy all files from current dir to the app folder. Set current dir to app
WORKDIR /app

EXPOSE 8080
EXPOSE 35729

# run create.sql on init
# ADD create.sql /docker-entrypoint-initdb.d
#RUN mkdir -p /usr/src/app  # Prepare app directory

CMD [ "yarn", "start" ]

