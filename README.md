# Reloj y cuenta regresiva

Proyecto web que muestra un reloj digital en tiempo real y una cuenta regresiva para el inicio del proximo año.

La aplicacion esta organizada por modulos para que sea mas facil mantenerla y escalarla.

## Estructura

```text
.
├── index.html
├── README.md
└── src
    ├── css
    │   ├── main.css
    │   ├── base
    │   │   ├── animations.css
    │   │   ├── reset.css
    │   │   ├── responsive.css
    │   │   └── tokens.css
    │   ├── components
    │   │   ├── clock.css
    │   │   ├── countdown.css
    │   │   └── panel.css
    │   └── layout
    │       └── app.css
    └── js
        ├── main.js
        ├── components
        │   ├── Countdown.js
        │   └── DigitalClock.js
        ├── core
        │   └── ClockApp.js
        └── utils
            └── date.js
```

## Modulos principales

- `src/js/main.js`: punto de entrada de la aplicacion.
- `src/js/core/ClockApp.js`: inicializa la aplicacion y conecta los componentes.
- `src/js/components/DigitalClock.js`: renderiza y actualiza el reloj digital.
- `src/js/components/Countdown.js`: renderiza y actualiza la cuenta regresiva.
- `src/js/utils/date.js`: funciones reutilizables para calculos de fechas.
- `src/css/main.css`: punto de entrada de estilos.

## Caracteristicas

- Reloj digital actualizado cada segundo.
- Cuenta regresiva hacia el 1 de enero del proximo año.
- JavaScript separado por responsabilidades.
- CSS separado por base, layout y componentes.
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
node --check src/js/main.js
node --check src/js/core/ClockApp.js
node --check src/js/components/DigitalClock.js
node --check src/js/components/Countdown.js
node --check src/js/utils/date.js
```
