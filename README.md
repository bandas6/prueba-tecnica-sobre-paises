Metodo de ejecución en local

--primero instalamos todas las dependencias ne nuestro proyecto con el comando "npm install".
--despues ejecutamos el comando "ionic server"

con esto nuestro proyecto se lanzara en nuestro navegador,

por ultimo colocas el navegador en modo dispositivo mobil

Recuerda antes de todo debes tener instalado el compilador de ionic en el equipo

Problemas encontrados

Al alamcenar la información en el local y al momneto de obtenerla tuve algunos inconvenientes y errores para esta tarea se uso el storage nativo de ionic que require de ciertas configuraciones especiales para su correcto funionamiento para resolverlo y obtener con mas precicion los errores uste tryCath e importe el modulo correcto en el archivo app.module.ts

Para el disenio me guie sobre todo en el mock dado, decidi usar un modal para evitar realizar peticiones incesesarias