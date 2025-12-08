# Ballot

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Implementation

### Translation

This uses neither Angular's i18n module (which works statically, and builds single-language apps only), nor Transloco (which only translates strings and does not support translating and styling HTML elements in templates).

Instead, content-rich components (those with big chunks of text), as well as the routable pages displaying them, are duplicated in each of the other languages.
As for "play" components, which are shown dynamically based on user interactions, when they display translatable content (not all of them do), they are using two things. First, Angular's `@switch`, to display text depending on the language selection. Second, some constants written in central services, linking keys and languages to translated strings.

The way these dynamic translations know what language to use is by a LANG injectable that is routing-based (it is not `providedIn: "root"`, its providers are defined in the router, separately for different routes). Because of that, it can't be injected in services that are common to all routes, instead, the components inject it then use it themselves and pass them by parameter to the central service.
