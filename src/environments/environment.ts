// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // URL_HOST: 'http://localhost:1337',
  // URL_API: 'http://localhost:1337/api',

  URL_HOST: 'https://js-dealersoft-server.herokuapp.com',
  URL_API: 'https://js-dealersoft-server.herokuapp.com/api',
  sourcesOptions: [
    { label: 'Telefon Ads', value: 'telefon_ads' },
    { label: 'Telefon Organisch', value: 'telefon_organic' },
    { label: 'Weiterempfehlung Kunden', value: 'client_recommend' },
    { label: 'Inzahlungnahme', value: 'deal' },
    { label: 'Netzwerk Freunde', value: 'network_friend' },
    { label: 'Angebotsagent', value: 'ofert_agent' },
    { label: 'Website Organisch', value: 'organic_website' },
    { label: 'Website Ads', value: 'ads_website' }
  ],
  months: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'November',
    'Dezember'
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
//  import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
