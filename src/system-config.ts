// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material',
  'videogular2': 'vendor/videogular2',
   'firebase': 'vendor/firebase/firebase.js',
  'angularfire2': 'vendor/angularfire2'
  // 'flexboxgrid': 'vendor/flexboxgrid',
  // 'ng2-material': 'vendor/ng2-material'
};

/** User packages configuration. */
var packages: any = {
  'videogular2' : {defaultExtension: 'js'},
    'angularfire2': {
    defaultExtension: 'js',
    main: 'angularfire2.js'
  }
  // 'flexboxgrid' : {defaultExtension: 'js'},
  // 'ng2-material' : {
  //   defaultExtension: 'js',
  //   main:'index.js'
  //   }
};

// Angular2 Material components here
const materialPkgs:string[] = [
  'button',
  'core',
  'icon',
  'input',
  'radio',
  'toolbar',
  'grid-list',
  'checkbox',
  'sidenav',
  'list',
  'menu'
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

  


////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/video-controls',
  'app/video-elements',
  'app/sidenav',
  'app/mvp',
  /** @cli-barrel */
];

var cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages});
