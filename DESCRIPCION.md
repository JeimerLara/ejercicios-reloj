# Reloj y cuenta regresiva

Este proyecto muestra un reloj digital en tiempo real y una cuenta regresiva para el inicio del proximo año. La interfaz se genera con JavaScript dentro del contenedor existente del HTML, sin modificar la estructura de `index.html`.

## Archivos principales

- `index.html`: contiene el contenedor principal `#container` y carga `main.js`.
- `main.js`: crea la aplicacion con programacion orientada a objetos.
- `style.css`: archivo puente que carga la hoja de estilos real.
- `styles.css`: aplica estilos visuales, transiciones y animaciones.

## Programacion orientada a objetos

El archivo `main.js` esta organizado en clases:

- `StyleLoader`: carga dinamicamente el archivo `styles.css`.
- `DigitalClock`: muestra la hora y fecha actual, actualizandose cada segundo.
- `Countdown`: calcula y muestra los dias, horas, minutos y segundos restantes para el proximo año. Tambien detiene su intervalo cuando la cuenta llega a cero.
- `ClockApp`: coordina la creacion del reloj, la cuenta regresiva y el inicio de la aplicacion.

## Encapsulamiento

Se usan campos privados de JavaScript con el simbolo `#`, por ejemplo:

```js
#container;
#clock;
#countdown;
```

Esto evita que esas propiedades sean modificadas directamente desde fuera de cada clase. Asi cada clase controla su propio estado interno.

## Funcionamiento

Cuando carga la pagina:

1. `ClockApp` busca el elemento `#container`.
2. `StyleLoader` agrega `styles.css` al documento.
3. Limpia el contenedor para evitar contenido duplicado si la aplicacion se inicializa otra vez.
4. `DigitalClock` crea y actualiza el reloj digital.
5. `Countdown` calcula la diferencia entre la fecha actual y el 1 de enero del proximo año.
6. Ambos componentes se actualizan automaticamente cada segundo.

## Estilos y animaciones

El archivo `styles.css` incluye:

- Diseno responsivo para pantallas grandes y pequenas.
- Paneles con fondo semitransparente y efecto de desenfoque.
- Transiciones al pasar el cursor sobre los paneles.
- Animacion de pulso en el reloj cada segundo.
- Animacion tipo giro en los numeros de la cuenta regresiva.
- Fondo con movimiento suave.

## Modificaciones de verificacion

Despues de revisar el proyecto se agregaron estos ajustes:

- Prevencion de intervalos duplicados al iniciar el reloj o la cuenta regresiva.
- Limpieza del contenedor antes de renderizar la interfaz.
- Reinicio correcto de animaciones en cada cambio de segundo.
- Mensaje final cuando la cuenta regresiva llega a cero.
- Etiquetas descriptivas para los paneles generados desde JavaScript.

## Verificacion realizada

- Se reviso que `index.html` no fuera modificado.
- Se valido la sintaxis con `node --check main.js`.
- Se comprobo que el servidor local responde correctamente por HTTP.
- Se agrego `style.css` porque el HTML lo referencia y el archivo no existia.

## Como probarlo

Ejecuta un servidor local en la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Luego abre esta direccion en el navegador:

```text
http://localhost:8000/
```
