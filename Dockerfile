FROM  node:20-bullseye AS base

WORKDIR /usr/src/app
COPY package*.json ./

# ================= DEV =================
FROM base AS development

ENV TZ=Asia/Ho_Chi_Minh

RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3002
CMD ["npm", "run", "start:dev"]

# ================= PROD =================
FROM base AS production

ENV NODE_ENV=production
ENV TZ=Asia/Ho_Chi_Minh

RUN npm ci --only=production
COPY . .
RUN npm run build

CMD ["node", "dist/main"]
