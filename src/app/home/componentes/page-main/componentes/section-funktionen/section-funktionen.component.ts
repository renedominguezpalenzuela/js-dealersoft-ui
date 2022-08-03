import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-funktionen',
  templateUrl: './section-funktionen.component.html',
  styleUrls: ['./section-funktionen.component.scss'],
})
export class SectionFunktionenComponent implements OnInit {
  public cards: any = [
    {
      title: 'Fahrzeuge detailiert ins System einpflegen',
      text: [
        //'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
        'Perfekt auf Thren Autohandel abgestimmt: Pfiegen Sie alle relevanten Daten des Fahrzeuges in die Datenbank ein. Schnell&Unkompliziert von überall'
      ],
      path: '1.png',
      pathmovil: '1movil.png',
      link: '/',
      position: false,
      nameLink: 'Jetzt registrieren',
    },
    {
      //title: 'Kund:innen-Karteien anlegen und mit Informationen verknüpfen',
      title: 'Aktuelle Bestandsübersicht und in Archiv mit allen bisher verkauften Fahrzeugen',
      text: [
       // 'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
       'Behalten Sie den überblick über Ihren aktuellen Bestand und speichern verkaufte Fahrzeuge sicher in Ihrer eigenen Fahrzeug-Datenbank. Informieren Sie sich auf einen Blick über Ihren Bestandswert oder Standtage. Drucken Sie sich gezielt Bestandslisten beliebiger Monte aus - mit einem Klick'
      ],
      path: '2.png',
      pathmovil: '2movil.png',

      link: '/',
      position: true,
      nameLink: 'Jetzt registrieren',
    },
    {
      title:
        //'Aktuelle Bestandsübersicht und ein Archiv mit allen bisher verkauften Fahrzeugen ',
        'Kund:innen-Daten anlegen und mit Informationen verknüpfen',
      text: [
        //'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
        'Pflegen Sie Ihre Kundendaten gut strukturiert in Ihre Datenbank ein und ordnen Sie diese dem An- oder Verkauf Ihrer Fahrzeuge zu.'
      ],
      path: '3.png',
      pathmovil: '3movil.png',

      link: '/',
      position: false,
      nameLink: 'Jetzt registrieren',
    },
    {
      title:
       // 'Kaufverträge / Stornoverträge erstellen und diese bequem mit Fahrzeugen und Kund:innen verknüpfen',
       'Kaufverträge für An- und Verkauf, Rechnungen und Stornorechnungen mit einem Klick erstellen',
      text: [
       // 'von Überall ob mit PC oder Handy in',
       // '- Sekunden PDF Verträge und Rechnungen erstellen.',
       'Egal ob per App oder im Browser: Dealersoft ermöglicht Ihnen die Erstellung von Kaufverträgen und Rechnungen per Knopfdruck. Und das immer im gleichen Format, inklusive Firmenlogo blitzschnell per PDF aufs Handy oder den PC.'
      ],
      path: '4.png',
      pathmovil: '4movil.png',

      link: '/',
      position: true,
      nameLink: 'Jetzt registrieren',
    },
    {
      title:
        //'Fahrzeug- und Kund:innenstatistiken einsehen und den Gewinn und Verlust ihres Autohandels im Überblick behalten',
        'Rechnungen erstellen und verwalten',
      text: [
        // 'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
        'Generieren Sie mit einem Klick eine fortlaufende Rechnungsnummer und erstellen Sie Ihre PDF   Rechnung. Egal ob Netto Export, $25A oder inkl mwst, Dealersoft ist Ihr Tool für einen schnellen,  einfachen Verkaufsprozess.'
        
      ],
      path: '5.png',
      pathmovil: '5movil.png',

      link: '/',
      position: false,
      nameLink: 'Jetzt registrieren',
    },
    {
     // title: 'Rechnungen erstellen und verwalten',
     title:'Fahrzeug und Kund innen Statistiken einsehen und den Gewinn und Verlust Ihres Autohandels im Überblick behalten',
      text: [
        //'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
        ''
      ],
      path: '6.png',
      pathmovil: '6movil.png',

      link: '/',
      position: true,
      nameLink: 'Jetzt registrieren',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
