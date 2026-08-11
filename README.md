# ToDo List App (Ionic + Angular + Cordova)

Aplicación móvil y web para la gestion de básica de tareas y categorias.

---

## Estructura de Ramas (Trazabilidad)

El proyecto está distribuido en diferentes ramas para mantener un historial limpio y auditable de la evolución de la aplicación:

* **`develop`**: Contiene la aplicación base. Consiste en una lista de tareas sencilla que utiliza almacenamiento local y permite:
  * Agregar tareas.
  * Marcar tareas como completadas.
  * Eliminar tareas.
* **`feature`**: Incorpora las características avanzadas y mejoras sobre la lista base, separando estructura, arquitectura para que sea escalable y agregando también la gestión completa de categorías persistidas localmente:
  * Crear, editar y eliminar categorías.
  * Asignar una categoría específica a cada tarea (con selector interactivo).
  * Filtrar la lista de tareas por categoría seleccionada.
* **`firabese/feature-flag`**: Integra la arquitectura de **Firebase Remote Config** para controlar la visibilidad y disponibilidad de la gestión de categorías en tiempo real mediante *Feature Flags* sin necesidad de redesplegar la aplicación.

El resultado del APK se genara con base es esta rama ya que es la que tiene el acumulado de cambios. 

---
## Requisitos Previos

Asegurate de contar con las siguientes herramientas instaladas en tu entorno de desarrollo para poder ejecutar la aplicación. 

* **Node.js**: `v18.x` o superior.
* **npm**: `v9.x` o superior.
* **Ionic CLI**: `npm install -g @ionic/cli`
* **Android Studio**: (Para emulación y compilación en Android) con SDK de Android configurado.
* **Java Development Kit (JDK)**: `JDK 17` recomendado.
* **Android Debug Bridge (ADB)**: Configurado en las variables de entorno del sistema.

## Instalación 

ubicate en la carpeta en la que vas a trabajar y clona  el repositorio.

https://github.com/Davidhzk2/ToDo-List.git

Luego de haber clonado el proyecto ubicate en la carpeta raiz y realizar los siguientes pasos.

## Ejecución de la Aplicación

### 1. Entorno Web (Desarrollo)

Para ejecutar la aplicación localmente en el navegador:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
ionic serve

```

### 2. Entorno Android Emulador


## Estructura del proyecto

```Plaintext
src/
├── app/
│   ├── components/       # Modales y componentes secundarios (CategoryModalComponent)
│   ├── core/
│   │   ├── models/       # Interfaces de datos (Task, Category, FeatureFlags)
│   │   └── services/     # TodoService, RemoteConfigService
│   ├── home/             # Vista principal optimizada (HomePage)
│   └── app.module.ts     # Configuración e inicialización de Firebase
└── environments/         # Credenciales de entorno (environment.ts)

```