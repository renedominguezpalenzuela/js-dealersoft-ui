export const environment = {
  production: true,
  URL_HOST: 'https://js-dealersoft-backend.herokuapp.com',
  URL_API: 'https://js-dealersoft-backend.herokuapp.com/api',
  sourcesOptions: [
    { label: 'Telefonische Ankündigungen', value: 'telefon_ads' },
    { label: 'Organisches Telefon', value: 'telefon_organic' },
    { label: 'Empfehlungskunden', value: 'client_recommend' },
    { label: 'Austausch', value: 'deal' },
    { label: 'Netzwerkfreunde', value: 'network_friend' },
    { label: 'Angebotsagent', value: 'ofert_agent' },
    { label: 'Organische Website', value: 'organic_website' },
    { label: 'Website-Anzeigen', value: 'ads_website' }
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
