FROM node:alpine

# setting a working directory
WORKDIR /app
# copy over package.json file
COPY package.json ./
#install depencies
RUN npm install
# then copy over everything else
COPY ./ ./

# setup default command
CMD ["npm","start"]