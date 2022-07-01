FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000
# 로컬에서 정의한 Nginx 설정 파일을 컨테이너 내로 덮어씌운다 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
