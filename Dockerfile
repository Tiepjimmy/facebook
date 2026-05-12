FROM node:20-bullseye AS base

WORKDIR /usr/src/app

COPY package*.json ./

FROM base AS production

ENV NODE_ENV=production
ENV TZ=Asia/Ho_Chi_Minh

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start:prod"]
