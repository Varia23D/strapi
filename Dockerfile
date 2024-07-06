FROM node:20
WORKDIR /app

COPY ./ ./

ENV NODE_ENV=production

RUN npm install
RUN npm install pg --save
RUN npm run build

CMD npm run start
