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
    │   │   ├── celebration.css
    │   │   ├── clock.css
    │   │   ├── countdown.css
    │   │   ├── panel.css
    │   │   └── total-countdown.css
    │   └── layout
    │       └── app.css
    └── js
        ├── main.js
        ├── components
        │   ├── Countdown.js
        │   ├── DigitalClock.js
        │   └── TotalCountdown.js
        ├── core
        │   └── ClockApp.js
        └── utils
            ├── celebration.js
            └── date.js
```

## Modulos principales

- `src/js/main.js`: punto de entrada de la aplicacion.
- `src/js/core/ClockApp.js`: inicializa la aplicacion y conecta los componentes y controles.
- `src/js/components/DigitalClock.js`: renderiza y actualiza el reloj digital.
- `src/js/components/Countdown.js`: renderiza y actualiza la cuenta regresiva desglosada (años, meses, días, horas, minutos, segundos) con mensaje festivo de fin de año.
- `src/js/components/TotalCountdown.js`: renderiza y actualiza el tiempo restante acumulado con mensaje festivo de fin de año.
- `src/js/utils/celebration.js`: genera efectos de confeti festivo y banners animados de celebración.
- `src/js/utils/date.js`: funciones reutilizables para calculos de fechas.
- `src/css/main.css`: punto de entrada de estilos.

## Caracteristicas

- Reloj digital actualizado cada segundo en la parte superior.
- Cuenta regresiva desglosada en años, meses, días, horas, minutos y segundos.
- Panel de tiempo restante total acumulado simultáneo en días, horas, minutos y segundos.
- Mensaje animado de **¡Feliz Año Nuevo!** con brillo, rebote y lluvia de confeti al terminar la cuenta regresiva.
- Botón de prueba para simular y previsualizar la animación de fin de año en vivo.
- Formato numérico con separadores de miles y animaciones de actualización.
- JavaScript separado por responsabilidades.
- CSS separado por base, layout y componentes.
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
node --check src/js/components/TotalCountdown.js
node --check src/js/utils/celebration.js
node --check src/js/utils/date.js
```
