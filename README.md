# Proyecto – Pruebas Automatizadas Pokémon

Este repositorio contiene una aplicación web de gestión de Pokémons desarrollada en Node.js con Express y Handlebars, junto con un conjunto de **pruebas automatizadas** usando Python, Selenium y Pytest.

## Estructura del repositorio

```
Pokedex/                # Aplicación web Node.js
├── app.js
├── Controllers/
├── Models/
├── Routes/
├── Views/
├── Public/
│   └── ...           # Recursos estáticos (CSS, JS)
├── package.json

pokemon-tests/         # Pruebas automatizadas
├── tests/             # Casos de prueba con Selenium + Pytest
├── report.html        # Reporte HTML generado por pytest-html
├── requirements.txt   # Dependencias de Python

docs/                  # Documentación y evidencias
└── Documentacion_Pruebas_Pokedex.pdf

.gitignore
README.md
```

## Tecnologías utilizadas

- **Node.js**, **Express** y **Handlebars** para la aplicación web.
- **Python 3**, **Selenium WebDriver**, **pytest** y **pytest-html** para las pruebas automatizadas.

## Instalación y ejecución de la aplicación

Para poner en marcha la aplicación web:

1. Instala las dependencias de Node.js en el directorio `Pokedex`:
   ```bash
   cd Pokedex
   npm install
   ```
2. Inicia el servidor:
   ```bash
   node app.js
   ```
3. Abre tu navegador en `http://localhost:5001/pokemons` para acceder al listado de Pokémons.

## Instalación y ejecución de las pruebas

Para ejecutar las pruebas automatizadas:

1. Ingresa al directorio `pokemon-tests`:
   ```bash
   cd pokemon-tests
   ```
2. (Opcional pero recomendado) crea un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate        # En Windows: venv\Scripts\activate
   ```
3. Instala las dependencias necesarias:
   ```bash
   pip install -r requirements.txt
   ```
4. Ejecuta los tests y genera el reporte HTML:
   ```bash
   pytest -v --html=report.html --self-contained-html
   ```

## Video demostrativo

Mira el video de ejecución de las pruebas automatizadas en el siguiente enlace:  
[https://youtu.be/1Dx7T1HQFEs](https://youtu.be/1Dx7T1HQFEs)

## Autores

- Felipe José Solórzano Michel — Proyecto Pokedex y pruebas automatizadas

## Licencia

Este proyecto se desarrolla con fines académicos y de demostración.
