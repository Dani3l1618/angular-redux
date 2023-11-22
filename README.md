# Uso de Redux en Angular

En este proyecto se muestra nu ejemplo sencillo sobre el uso de la librería redux para Angular.

Para poder hacer uso de esto, debemos tener en cuenta los siguientes conceptos:

- **actions**: son eventos que se disparan desde un componente o servicio.
- **reducer**: es una función pura que cambia el estado de la aplicación, toma el estado actual y la acción a tomar y calcula el nuevo estado.
- **store**: es el lugar que contiene al state, podemos acceder a un state a partir de observables.

## Crear una nueva acción

Las acciones las hemos guardado en el archivo de [contador.action]('/src/app/contador/contador.actions.ts').

Creamos una acción al usar la función que nos provee la librería, le ponemos un nombre y si es necesario, podemos pasarle parámetros con la función props.

## Registrar la acción en el reducer

Las acciones son manejadas por el reducer principal [(ver)]('/src/app/contador/contador.reducer.ts'). Este reducer es quien toma el valor del state actual y calcula el nuevo estado. Para hacer eso, nos ayudamos de la función **on()**. Hemos creado este reducer con el función **createReducer** que nos provee la librería. Le pasamos como primer argumento el estado inicial de la aplicación.
También observa que este archivo, solo hemos exportado la función que llama a nuestro reducer con el nuevo state y la acción a tomar.

```typescript
export function contadorReducer(state: number | undefined, action: Action) {
  return _contadorReducer(state, action);
}
```

## Obtener el state

Para obtener el estado actual de la aplicación, nos tenemos que subscribir al store de la aplicación. Podemos obtener todo el estado, o el estado que nos interesa con el método _select_.

```typescript
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('contador').subscribe({
      next: (contador) => {
        this.contador?.set(contador);
      },
    });
  }
```

Antes de subscribirnos, debemos importar el modulo StoreModule en al AppModule y configurar el root, le pasamos la forma de nuestro estado. En esta caso solo tenemos el contador.

```typescript
...
 imports: [
    ...,
    StoreModule.forRoot({ contador: contadorReducer }),
  ],
...

```

## Actualizar el estado

Los reducers actualizan el estado, pero solo cuando se llama a la acción correcta. Para mandar o disparar una acción usamos el dispatch, que acepta como parámetro la acción, y quizás los argumentos que nececita la función.

```typescript
import * as actions from './contador/contador.actions';

  increment(value = 1) {
    this.store.dispatch(actions.increment());
  }


  multiplicar(value = 2) {
    this.store.dispatch(actions.multiplicar({ value }));
  }

```
