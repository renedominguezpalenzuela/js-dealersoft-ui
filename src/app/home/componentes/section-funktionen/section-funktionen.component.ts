import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-funktionen',
  templateUrl: './section-funktionen.component.html',
  styleUrls: ['./section-funktionen.component.scss'],
})
export class SectionFunktionenComponent implements OnInit {
  public cards: any = [
    {
      title: 'Fahrzeuge detailliert ins System einpflegen',
      text: [
        'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
      ],
      path: '1.png',
      link: '/',
      position: false,
      nameLink: 'Jetzt registrieren',
    },
    {
      title: 'Kund:innen-Karteien anlegen und mit Informationen verknüpfen',
      text: [
        'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
      ],
      path: '2.png',
      link: '/',
      position: true,
      nameLink: 'Jetzt registrieren',
    },
    {
      title:
        'Aktuelle Bestandsübersicht und ein Archiv mit allen bisher verkauften Fahrzeugen ',
      text: [
        'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
      ],
      path: '3.png',
      link: '/',
      position: false,
      nameLink: 'Jetzt registrieren',
    },
    {
      title:
        'Kaufverträge / Stornoverträge erstellen und diese bequem mit Fahrzeugen und Kund:innen verknüpfen',
      text: [
        'von Überall ob mit PC oder Handy in',
        '- Sekunden PDF Verträge und Rechnungen erstellen.',
      ],
      path: '4.png',
      link: '/',
      position: true,
      nameLink: 'Jetzt registrieren',
    },
    {
      title:
        'Fahrzeug- und Kund:innenstatistiken einsehen und den Gewinn und Verlust ihres Autohandels im Überblick behalten',
      text: [
        'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
      ],
      path: '5.png',
      link: '/',
      position: false,
      nameLink: 'Learn more about encryption',
    },
    {
      title: 'Rechnungen erstellen und verwalten',
      text: [
        'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
      ],
      path: '6.png',
      link: '/',
      position: true,
      nameLink: 'Learn more about encryption',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}