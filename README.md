# Todo App
En esta rama hemos utilizado redux para darle funcionalidad a la aplicación de TodoApp. La App permite:
- Agregar nuevas tareas
- Eliminar tareas
- Marcar tareas como completadas
- Visualizar el estado de las tareas
- Aplicar filtros 
- Eliminar tareas completadas

Hemos centralizado la creación y manejo de tareas en el reducer del Todo y la aplicación de filtros usando otro reducer. Por lo que esta aplicación usa dos estados. 

Para crear varios estados, estos se deben configurar en al app.module, sin embargo, es buena prática, crear la forma del estado en un archivo a parte como se puede ver en el [app.reducer](/src/app/app.reducer.ts).

