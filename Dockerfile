# Stage 1: Base - Thiết lập môi trường chung
FROM node:20-bullseye AS base
WORKDIR /usr/src/app
COPY package*.json ./

# Stage 2: Development - Dùng để code hoặc build code
FROM base AS development
ENV TZ=Asia/Ho_Chi_Minh
# Thêm --legacy-peer-deps nếu bạn gặp lỗi xung đột version thư viện
RUN npm install --legacy-peer-deps
COPY . .
# Chạy build tại đây để tạo ra thư mục /dist
RUN npm run build
EXPOSE 3002
CMD ["npm", "run", "start:dev"]

# Stage 3: Production - Image cuối cùng chỉ chứa code đã build và thư viện cần thiết
FROM node:20-bullseye-slim AS production

ENV NODE_ENV=production
ENV TZ=Asia/Ho_Chi_Minh
WORKDIR /usr/src/app

# Chỉ copy file package.json và lock để cài thư viện production
COPY package*.json ./

# Sử dụng --only=production để giảm dung lượng image
# Thêm --legacy-peer-deps nếu cần thiết
RUN npm ci --only=production --legacy-peer-deps

# Copy thư mục dist từ stage development sang
COPY --from=development /usr/src/app/dist ./dist

# Lệnh chạy ứng dụng
CMD ["node", "dist/main"]
