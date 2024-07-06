FROM node:14-alpine as build

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Etapa 2: Configuración del servidor web
FROM nginx:alpine

# Copiar los archivos compilados de Angular al directorio HTML de Nginx
COPY --from=build /app/dist/UCES-WEB-PAGE /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]