# Reloj y cuenta regresiva

Proyecto web que muestra un reloj digital en tiempo real y una cuenta regresiva para el inicio del proximo año.

La interfaz se construye con JavaScript usando programacion orientada a objetos y encapsulamiento. El estilo visual se maneja con CSS, incluyendo animaciones, transiciones y diseno responsivo.

## Archivos

- `index.html`: estructura base del proyecto.
- `main.js`: logica del reloj y la cuenta regresiva.
- `style.css`: estilos principales, animaciones y transiciones.
- `DESCRIPCION.md`: explicacion detallada del proyecto.

## Caracteristicas

- Reloj digital actualizado cada segundo.
- Cuenta regresiva hacia el 1 de enero del proximo año.
- Uso de clases en JavaScript.
- Encapsulamiento con campos privados usando `#`.
- Animaciones en los numeros del reloj y la cuenta regresiva.
- Diseno adaptable para escritorio y movil.

## Como ejecutar

Desde la carpeta del proyecto, inicia un servidor local:

```bash
python3 -m http.server 8000
```

Luego abre en el navegador:

```text
http://localhost:8000/
```

## Verificacion

Para revisar la sintaxis de JavaScript:

```bash
node --check main.js
```
