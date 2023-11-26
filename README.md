### Cliente Rest 
Es un cleinte hecho en Node.js para consumir apis

Instalar dependencias
 ```
npm i
```

Correr Cliente
 ```
npm start
```
### Preview
<p aling="center">
    <img src="readMeImages/restClientSimpleTest.gif"/>     
</p>

Ya desde este cliente se pueden consumir cualquier API REST que cuente con CORS, cabe mencionar que se pueden consumir apis de un servidor remoto, local, o de una maquina virtual

los endpoints suelen ser de este estilo 

Endpoints:
 ```
http://192.168.60.3:5000/books | http:<MACHINE IP>:<PORT>/books
```
```
http://192.168.60.3:5000/books/:id | http:<MACHINE IP>:<PORT>/books/:id
```
