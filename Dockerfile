# Указываем базовый образ для Node.js
FROM node:latest as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install -g @angular/cli && npm install

# Копируем исходные файлы и создаем сборку
COPY . .
RUN ng build

# Устанавливаем базовый образ для Nginx
FROM nginx:alpine

# Копируем сгенерированные файлы Angular в Nginx
COPY --from=0 /app/dist/hr-platform/browser /usr/share/nginx/html

# Добавляем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт для приложения
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

