FROM ubuntu:latest

# Instalar Node.js y npm
RUN apt-get update && \
    apt-get install -y nodejs npm

# Configurar el directorio de trabajo
WORKDIR /usr/src

# Copiar archivos de configuración e instalación de dependencias
COPY ["package.json", "package-lock.json", "/usr/src/"]
RUN npm install

# Copiar la aplicación
COPY [".", "/usr/src/"]

# Comando de inicio de la aplicación
CMD ["npm", "start"]

# Exponer el puerto necesario por tu aplicación
EXPOSE 8080
