FROM node:18-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# FROM nginx
# COPY --from=builder /app/.next /usr/share/nginx/html 