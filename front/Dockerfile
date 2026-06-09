FROM node:24-bookworm-slim

WORKDIR /app

COPY front/package*.json ./
RUN npm ci

COPY front ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
