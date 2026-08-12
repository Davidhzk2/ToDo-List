# ToDo List App (Ionic + Angular + Cordova)

Aplicación móvil y web para la gestion de básica de tareas y categorias.

---
## 📋 Tabla de Contenido
- [Estructura de Ramas](#estructura-de-ramas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
  - [Comprobación de requisitos](#comprobación-de-requisitos)
- [Configuración Inicial del Proyecto](#configuración-inicial-del-proyecto)
- [Modos de Ejecución](#modos-de-ejecución)
  - [1. Ejecución en Entorno Web (Navegador)](#1-ejecución-en-entorno-web-navegador)
  - [2. Ejecución en Emulador de Android](#2-ejecución-en-emulador-de-android)
  - [3. Ejecución en Dispositivo Físico Android](#3-ejecución-en-dispositivo-físico-android)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Integración con Firebase Remote Config (Feature Flags)](#integración-con-firebase-remote-config-feature-flags)
- [Entregables y Evidencias](#entregables-y-evidencias)

---
## Estructura de Ramas 

El proyecto está distribuido en diferentes ramas para mantener un historial limpio y auditable de la evolución de la aplicación:

* **`develop`**: Contiene la aplicación base. Consiste en una lista de tareas sencilla que utiliza almacenamiento local y permite:
  * Agregar tareas.
  * Marcar tareas como completadas.
  * Eliminar tareas.

* **`features`**: Incorpora las características avanzadas y mejoras sobre la lista base, separando estructura, arquitectura para que sea escalable y agregando también la gestión completa de categorías persistidas localmente:
  * Crear, editar y eliminar categorías.
  * Asignar una categoría específica a cada tarea (con selector interactivo).
  * Filtrar la lista de tareas por categoría seleccionada.

* **`firabese/feature-flag`**: Integra la arquitectura de **Firebase Remote Config** para controlar la visibilidad y disponibilidad de la gestión de categorías en tiempo real mediante *Feature Flags* sin necesidad de redesplegar la aplicación.

**`IMPORTANTE:`** El resultado del APK se genara con base a esta rama `firebase/feature-flag` ya que es la que contiene el acumulado de cambios. 

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

Ubicate en la carpeta en la que vas a trabajar y clona  el repositorio.

Enlace: [Código fuente/ Respositorio](https://github.com/Davidhzk2/ToDo-List.git)

Luego de haber clonado el proyecto ubicate en la carpeta raiz y realiza los siguientes pasos.

### Comprobación de requisitos

```bash
npx cordova requirements android
```
Todos los ítems (Java JDK, Android SDK, Android target y Gradle) deben marcar *`installed`*.

## Configuración Inicial del Proyecto
Si estás clonando el proyecto por primera vez:

```bash
# 1. Instalar dependencias de Node
npm install

# 2. Asegurar el builder de Cordova para Angular CLI
npm install --save-dev @ionic/cordova-builders

# 3. Preparar la plataforma Android
npx cordova prepare android
```

**Verificación clave en** `angular.json`:
Asegúrate de que la propiedad outputPath esté apuntando directamente a la carpeta `www`:

```JSON
"options": {
  "outputPath": "www",
  ...
}

```

### 1. Ejecución en Entorno Web (Navegador)

Para desarrollo rápido de la interfaz de usuario con recarga en vivo :

```bash
# Iniciar servidor de desarrollo
ionic serve

```
La aplicación se abrirá automaticamente en *`http://localhost:8100`*.

### 2. Ejecucipon en Emulador de Android

#### Paso 1: Encender el emulador 
> Abre Android Studio > More Actions > Virtual Device Manager e inicia tu dispositivo virtual (ej. Pixel 9 Pro / API 36+).

verifica que el sistema lo detecte ejecutando:
```cmd
adb devices
```
(Debe aparecer `emulator-5554 device`)

#### Paso 2: Flujo de compilación y despliegue

```bash
# 1. Transpilar el código Angular hacia la carpeta /www
npx ng build

# 2. Sincronizar activos web con la plataforma Android
npx cordova prepare android

# 3. Compilar el APK de depuración
npx cordova build android

# 4. Instalar y forzar reemplazo en el emulador activo con uno de los siguientes comandos:
ionic cordova run android --target=emulator-5554 --no-build

ionic cordova run android --device --no-build

adb install -r platforms\android\app\build\outputs\apk\debug\app-debug.apk

```

### 3. Ejecución en Dispositivo Físico Android
#### Paso 1: Preparar el Celular
1. Activa las Opciones de Desarrollador en tu teléfono (Ajustes > Acerca del teléfono > Presionar 7 veces Número de compilación).
2. Activa la Depuración por USB.
3. Conecta el teléfono a la PC mediante cable USB y acepta la ventana emergente "¿Permitir depuración por USB?".

#### Paso 2: Verficar Conexion
```
adb devices
```
(Debe aparecer el código de tu teléfono seguido de `device`)

#### Paso 3: Compilar e instalar
```
# 1. Transpilar y preparar
npx ng build
npx cordova prepare android

# 2. Desplegar directamente al dispositivo físico
npx cordova run android --device --no-build

```


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

**Bandera Dinámica** `(enable_categories)`: Permite habilitar o deshabilitar la funcionalidad de categorías desde la Consola de Firebase en tiempo real, impactando la visibilidad del módulo en la interfaz sin requerir un nuevo despliegue de la aplicación.

Inicialmente la bandera tiene el valor *true* lo que permite que se muetre el botón de gestionar tareas, input para selecionar la categoria al momento de agregar una tarea y el filtro de las categorias, si en el Firebase se cambia el valor de la bandera a *false* no se visualizaran dichos elementos en la aplicación . 

## Entregables y Evidencias

Los entregables correspondientes al proyecto (APK final, respuestas, pruebas y evidencias de funcionamiento) se encuentran disponibles en el siguiente enlace de Google Drive:

Enlace a Drive: [Entregables](https://drive.google.com/drive/folders/1bTUyi5gR-vAIrEnnbQjD3U0pV3lxl31f?usp=drive_link)