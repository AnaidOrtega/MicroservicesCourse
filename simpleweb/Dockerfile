#Specify base image, alpine version most simple version without any other things installed, node js and nothing else
FROM node:alpine

WORKDIR /usr/app

#copy current directory in simple web > current directory inside container
COPY ./package.json ./
#Install Dependencies
RUN npm install 
COPY ./ ./

#Default Command
CMD ["npm","start"]