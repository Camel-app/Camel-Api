FROM node:latest as base
WORKDIR /api
COPY ./package*.json .
RUN npm install
COPY . .
ENV KEY_JWT=""
ENV DB_LINK=""


FROM base as production
ENV NODE_PATH=./build
ENV KEY_JWT=""
ENV DB_LINK=""
RUN npm run build