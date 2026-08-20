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
    │   │   ├── final-countdown.css
    │   │   ├── panel.css
    │   │   └── total-countdown.css
    │   └── layout
    │       └── app.css
    └── js
        ├── main.js
        ├── components
        │   ├── Countdown.js
        │   ├── DigitalClock.js
        │   ├── FinalCountdown.js
        │   └── TotalCountdown.js
        ├── core
        │   └── ClockApp.js
        └── utils
            ├── celebration.js
            └── date.js
```

## Modulos principales

- `src/js/main.js`: punto de entrada de la aplicacion.
- `src/js/core/ClockApp.js`: inicializa la aplicacion, coordina los componentes y maneja las transiciones de cuenta regresiva.
- `src/js/components/DigitalClock.js`: renderiza y actualiza el reloj digital.
- `src/js/components/Countdown.js`: renderiza y actualiza la cuenta regresiva desglosada (años, meses, días, horas, minutos, segundos).
- `src/js/components/TotalCountdown.js`: renderiza y actualiza el tiempo restante acumulado.
- `src/js/components/FinalCountdown.js`: panel dedicado a la cuenta final de los últimos 60 segundos con animación crítica en los últimos 10 segundos.
- `src/js/utils/celebration.js`: genera efectos de confeti festivo y banners animados de celebración.
- `src/js/utils/date.js`: funciones reutilizables para calculos de fechas.
- `src/css/main.css`: punto de entrada de estilos.

## Caracteristicas

- Reloj digital actualizado cada segundo en la parte superior.
- Cuenta regresiva desglosada y panel de tiempo restante total acumulado en paralelo durante la mayor parte del año.
- Transición automática en el **último minuto** (< 60 segundos): oculta las dos secciones anteriores y despliega el panel de **Cuenta regresiva final en segundos**.
- **Animación crítica de alto impacto en los últimos 10 segundos**: efecto de pulso (*shockwave*), vibración y resplandor neón intenso.
- Mensaje animado de **¡Feliz Año Nuevo!** con brillo, rebote y lluvia de confeti al terminar la cuenta regresiva.
- Botones de prueba para simular y previsualizar la cuenta de 60s, los últimos 10s y el Fin de Año en vivo.
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
node --check src/js/components/FinalCountdown.js
node --check src/js/utils/celebration.js
node --check src/js/utils/date.js
```
