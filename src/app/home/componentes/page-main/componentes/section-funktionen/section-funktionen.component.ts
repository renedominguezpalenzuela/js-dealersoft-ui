import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-section-funktionen',
  templateUrl: './section-funktionen.component.html',
  styleUrls: ['./section-funktionen.component.scss'],
})
export class SectionFunktionenComponent implements OnInit {
  @Output() mensaje = new EventEmitter<string>();

  x:any;
  public naviagateToTab(tab_name: any) {

    if (tab_name === 'register') {
      if (this.x) {
        this.mensaje.emit('0');
      }
      
      const timeoutId = setTimeout(() => {
        this.x.scrollIntoView({ behavior: 'smooth' });
      }, 200);

      //clearTimeout(timeoutId);
    }

    if (tab_name === 'login-reg') {
      if (this.x) {
        this.x.scrollIntoView({ behavior: 'smooth' });
      }
      const timeoutId = setTimeout(() => {
        this.mensaje.emit('1');
      }, 700);
    }
  }
  public cards: any = [
    {
      title: 'Fahrzeuge detailliert ins System einpflegen',
      text: [
        'Vom Anlegen eines neuen Fahrzeugprofils bis zum Abschluss des Kaufvertrags: Dealersoft begleitet Sie im gesamten Verkaufsprozess.',
      ],
      path: '1.png',
      pathmovil: '1movil.png',
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
      pathmovil: '2movil.png',

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
      pathmovil: '3movil.png',

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
      pathmovil: '4movil.png',

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
      pathmovil: '5movil.png',

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
      pathmovil: '6movil.png',

      link: '/',
      position: true,
      nameLink: 'Learn more about encryption',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.x = document.getElementById('login-register-div');

  }
}
