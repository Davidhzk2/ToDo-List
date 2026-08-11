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

**Importante:** El resultado del APK se genara con base a esta rama ya que es la que contiene el acumulado de cambios. 

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
│   ├── components/       # Modales 
│   ├── core/
│   │   ├── models/       # Interfaces de datos (Task, Category)
│   │   └── services/     # TodoService, RemoteConfigService
│   ├── home/             # Vista principal (HomePage)
│   └── app.module.ts     # Configuración e inicialización de Firebase
└── environments/         # Credenciales de entorno (environment.ts)

```


## Integración con Firebase Remote Config (Feature Flags)

* **Bandera Dinámica** `(enable_categories)`: Permite habilitar o deshabilitar la funcionalidad de categorías desde la Consola de Firebase en tiempo real, impactando la visibilidad del módulo en la interfaz sin requerir un nuevo despliegue de la aplicación.

Inicialmente la bandera tiene el valor *true* lo que permite que se muetre el botón de gestionar tareas, input para selecionar la categoria al momento de agregar una tarea y el filtro de las categorias, si en el Firebase se cambia el valor de la bandera a *false* no se visualizaran dichos elementos en la aplicación . 

## Entregables y Evidencias

Los entregables correspondientes al proyecto (APK final, respuestas, pruebas y evidencias de funcionamiento) se encuentran disponibles en el siguiente enlace de Google Drive:

    Enlace a Drive: [https://drive.google.com/drive/folders/1bTUyi5gR-vAIrEnnbQjD3U0pV3lxl31f?usp=drive_link]