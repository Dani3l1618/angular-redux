# Ingreso Egreso App
En esta sección se ha creado una aplicación un poco más compleja que incluye:
- inicio de sesión con Firebase
- store con firebase
- reducer para manejar el estado de la autenticación
- reducer para manejar el estado de la aplicación
- reducer para manejar el estado de registros.
- reducers que se crean en lazy-load
- uso total de standalone components

## Firebase
Se ha usado la librería @angular/firebase en la versión para angular 17. En el que los métodos estan modulados. Firebase sirve para crear nuevos usuarios y manejar la información de cada usuario. 



## Recucer
Se ha creado un manejo de estado un poco más complejo. Una de las ventajas que le veo, es que no tenemos que estar comunicando padres con hijos usando @inputs y @outputs. Solo nos subscribimos al estado que desaemos escuchar y podemos enviar eventos para actualizar dicho estado, y al estar basado en observables, nuestra aplicación se va actualizando. Solo hay que manejar las subscripciones, eliminandolas. 


## Uso de StandAlone Components
En este proyecto no se ha usando ningún modulo con ngModule. En algunas carpetas, como la de share, se ha creado un archivo index.ts para juntar los componentes y que sea más sencillo poderlos importar en otros componentes. 

También permitio crear un lazy-load más granular, y solo cargar aquellos componentes que sean necesario [ejemplo](./src/app/dashboard/dashboard.routes.ts).

También, con NGRX, podemos crear nuevos reducer al cargar componentes, por ejemplo al hacer lazy-load,con la implementación "forFeature()". Nota que debemos al cargar el store, le debemos pasar la forma del storage, [AppStateWithIngresoEgreso](./src/app/app.reducer.ts), por ejemplo. Para configurarlo fue diferente a la documentación, ya que no tenemos modulos. Entonces importamos el provider en la ruta del componente, y al cargar el componente, se crear el nuevo storage. 


Nota: Si no funciona, verifica que tengas una instancia de la app de firebase y que hayas configurado bien las credenciales, se debe ver algo así el environment (las credenciales no son reales):

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCXRgt6PGgEITkApKjg6pJ3peSnwm4wuL4',
    authDomain: 'ingreso-egreso-1184c.firebaseapp.com',
    projectId: 'ingreso-egreso-1184c',
    storageBucket: 'ingreso-egreso-1184c.appspot.com',
    messagingSenderId: '794242427330',
    appId: '1:743142467320:web:cd1ac3b6f47fcd3237214f',
  },
};
```