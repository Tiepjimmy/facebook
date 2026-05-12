FROM node:20-bullseye AS base

WORKDIR /usr/src/app

# Chỉ copy file package trước để tận dụng cache của Docker
COPY package*.json ./

# ================= DEV =================
FROM base AS development

# Cài đặt toàn bộ dependencies (bao gồm cả devDependencies để chạy nodemon/nest watch)
RUN npm install --legacy-peer-deps

# Copy toàn bộ code (lệnh này vẫn cần để build image ban đầu)
COPY . .

EXPOSE 3002

# Lệnh mặc định nếu không khai báo trong compose
CMD ["npm", "run", "start:dev"]

# ================= PROD =================
FROM base AS production

ENV NODE_ENV=production

# Chỉ cài dependencies cần thiết cho production
RUN npm ci --only=production

COPY . .

# Build code TypeScript sang JavaScript
RUN npm run build

EXPOSE 3002
CMD ["node", "dist/main"]
