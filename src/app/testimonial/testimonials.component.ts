import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  public testimonialCol1: any = [
    {
      text: [
        'Möchte mich recht herzlich bei Ihrem Unternehmen bedanken. Dank der großartigen Mühe von Ihrer kompetenten Frau Uhlig Mitarbeiterin, die ein tolles zwischen Menschliches Feingefühl in Ihrer Stimme und Ihren Worten hat. Sie hat sich so engagiert, weil Sie genau wusste wo mein Problem liegt und Dank Ihrer Berichterstattung per Email, konnte mein Lachen im Gesicht ganz schnell wieder hergestellt, da mein Zahnarzt dadurch schon die Zahnbehandlung abgeschlossen hat, obwohl der Betrag noch nicht auf meinen Konto zu Verfügung stand.',
        'Das zeigt mir selbst, als freundlich netter herzlicher Mensch es gibt genauso tolle Menschen die Ihren job lieben. Sie haben in Frau Uhlig eine ganz tolle Persönlichkeit in Ihrem Unternehmen und ich als zufriedene Kundin, weiß Ihre Mitarbeitern sehr zu schätzen, hoffe Sie tun dies auch.',
        'Werde Ihr Unternehmen weiter empfehlen .',
      ],
      author: 'Ganz herzliche Grüße',
      authorItalic: 'Renate Bothe Gottfried',
    },
    {
      text: [
        'Hallo Frau Uhlig',
        'vielen herzlichen Dank für die super Betreuung. Sofort nach Ihrem ersten Anruf fühlte ich mich bei Ihnen bestens aufgehoben. Die Abwicklung war erstklassig und der Kontakt ebenfalls. Ihr Unternehmen und besonders SIE sind wärmstens weiter zu empfehlen.',
      ],
      author: 'Viele liebe Grüße vom Niederrhein in Emmerich',
      authorItalic: '',
    },
    {
      text: [
        'Liebe Frau Uhlig,',
        'ich wünsche Ihnen wunderbare, erholsame Weihnachtstage und ein sehr glückliches und gesundes Neues Jahr. Sollen alle Ihre Wünsche in Erfüllung gehen. Ich bedanke mich sehr herzlich für die tolle Zusammenarbeit und Ihre Hilfe und Unterstützung. Werde dies nicht vergessen. Sollte ich Freunde, Bekannte haben, die Ihre Hilfe mal benötigen, werde ich Sie und Ihre Firma immer weiterempfehlen. Sollten Sie mal nach Köln kommen, melden Sie sich doch, wenn Sie Lust und Zeit haben. Vielleicht treffen wir uns ja mal auf einen Kaffee.',
        'Alles Liebe und Gute von mir aus Köln Ihre',
      ],
      author: 'A.V.',
      authorItalic: '',
    },
    {
      text: [
        'Guten Tag Frau Uhlig,',
        'die Bearbeitung erfolgte schnell und unkompliziert. Mit der Serviceleistung war ich zufrieden.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Tobias Brix',
    },
    {
      text: [
        'Sehr geehrte Damen und Herren,',
        'kürzlich habe ich Ihnen zwei meiner Lebensversicherungen verkauft. Nun möchte ich Ihnen mitteilen, dass ich mit der Abwicklung sowie persönlichen Betreuung durch Ihre Mitarbeiter sehr zufrieden war. Eine Versicherung macht große Probleme und ignoriert über Wochen die Schreiben von Ihnen. Während dieser Zeit konnte ich mich an Ihre Firma wenden und meine Fragen wurden schnell und kompetent beantwortet. Durch mich angeforderte Kopien meiner Versicherungspolice wurden prompt per Email verschickt. Für diesen professionellen und persönlichen Service möchte ich mich noch einmal ausdrücklich bedanken und ich bin mir sehr sicher bei ähnlichen Geschäften wieder auf die PACTA zurückzugreifen.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Ingo G.',
    },
    {
      text: [
        'Hallo,',
        'vielen Dank Frau Uhlig ich muß Sie loben. Sie sind eine der zuverlässigsten und freundlichsten Kundenbetreuerin mit der ich je zu tun hatte. Vielleicht verkaufe ich ja mal wieder eine LV, dann werde ich mich auf jeden... an Sie wenden, wenn´s recht ist natürlich!?!',
      ],
      author: 'MfG Bernd Sackreuter',
      authorItalic: '',
    },
    {
      text: [
        'Sehr geehrte Frau Uhlig',
        'das Geld des letzten Ankaufs ist heute bei uns eingegangen. Ich möchte mich daher noch einmal für die schnelle und professionelle Unterstützung bedanken. Ihr Produkt hat mich nachhaltig überzeugt. Einige Wettbewerber haben jetzt überhaupt erst geantwortet, nachdem Pacta für uns bereits 2 Ankäufe vollzogen hat!',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Arnold Mergell',
    },
    {
      text: [
        'Hallo Frau Uhlig,',
        'der Ablauf mit Ihnen bzw. dem Unternehmen verlief unkompliziert und zuverlässig.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Anonym',
    },
    {
      text: [
        'Sehr geehrte Frau Uhlig,',
        'ich war mit Ihrer Arbeit sehr zufrieden.',
      ],
      author: 'Vielen Dank Mit freundlichen Grüßen',
      authorItalic: 'Heike Gensler',
    },
    {
      text: [
        'Sehr geehrte Frau Uhlig,',
        'mit der Abwicklung über Ihr Unternehmen war ich mehr als zufrieden und danke herzlich für die professionelle und freundliche Abwicklung.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Katharina Jaeger',
    },
    {
      text: [
        'Werte Frau Uhlig,',
        'Auf diesem Wege möchte ich mich noch einmal bei Ihnen und Ihrem gesamten Team für die unkomplizierte und unbürokratische Regelung meines Versicherungsverkaufes an PACTA Invest recht herzlich bedanken! Ihnen persönlich danke ich für Ihre freundliche Art mir den Lauf der Dinge zu erläutern.',
      ],
      author: 'Alles Gute und viele Grüße',
      authorItalic: 'Anonym',
    },
  ];
  public testimonialCol2: any = [
    {
      text: [
        'Hallo Frau Uhlig,',
        'ganz lieben Dank für die Mitteilung und die problemlose und zügige Bearbeitung gerne empfehle ich Ihr Unternehmen weiter. Wünsche Ihnen ebenfalls ein schönes Wochenende und Helau nach Landshut',
      ],
      author: 'Ulrike Weyand',
      authorItalic: '',
    },
    {
      text: [
        'Sehr geehrte Frau Uhlig',
        'ich möchte mich bei ihnen herzlich bedanken, dass sie mir im Namen der Pacta Invest bei meinen beiden Versicherungsverkäufen so kompetent und nett zur Seite standen.',
        'Obwohl jeweils die Luxemburger Gesellschaft wie auch die Ergo sich mit der Bearbeitung reichlich Zeit liessen, bemühten sie sich um eine Beschleunigung der Abläufe und erreichten dies schließlich auch zu meiner vollsten Zufriedenheit.',
        'Bei ihnen kam ich mir nicht wie ein Kunde von vielen vor und merkte bei unseren Gesprächen, dass ihnen meine persönlichen Anliegen wichtig sind. Ihre unbürokratische direkte Art hat bei mir einen bleibenden Eindruck hinterlassen.Für ihre berufliche und private Zukunft wünsche ich ihnen alles erdenklich Gute, bleiben sie bitte so wie sie sind!',
      ],
      author: 'Florian Stammler',
      authorItalic: '',
    },
    {
      text: [
        'Guten Morgen Frau Uhlig,',
        'zunächst vielen Dank für die unproblematische Abwicklung im Zusammenhang der Übernahme der Versicherung durch PACTA Invest. Herausheben möchten wir hierbei Ihr persönliches Engagement, insbesondere die immer wieder kurzfristigen Infos zum Stand der Dinge.! Schade das dies auf Seiten des Versicherers nicht auch so gehandhabt wird. Wie bereits besprochen gibt es noch zwei weitere Versicheurngen die wir ebenfalls auflösen wollen. Aus steuerlichen Gründen wird dies jedoch nicht mehr in 2010 passieren - aber seien Sie sich sicher auch zu diesem Thema werden wir auf Sie zukommen.',
      ],
      author: 'Vielen Dank und schöne Grüße',
      authorItalic: 'Eva & Michael Wellmann',
    },
    {
      text: [
        'Hallo,',
        'vielen Dank für die schnelle und unkomplizierte Abwicklung. Die persönliche Beratung und Beantwortung meiner Fragen haben meine Entscheidung, mich für PACTA Invest zu entscheiden, bestätigt.',
      ],
      author: '',
      authorItalic: 'FG I.Weise',
    },
    {
      text: [
        'Vielen Dank für Ihre Antwort. Unterlagen kamen eben per Post.',
        'Danke für die zügige Bearbeitung.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Guido P.',
    },
    {
      text: [
        'Sehr geerte Damen und Herren,',
        'das heut zu Tage in vielen Bereichen ein gewisses Misstrauen angebracht ist wissen viele, mein Vorurteil wurde bei Ihrer Firma völlig weggeblasen.',
        'Ihre Arbeit zeigt, daß es doch noch Firmen gibt, die den Menschen bei Problemen mit den Versicherungen zur Seite stehen. Ein Reibungsloser Ablauf, bei dem ich mich um nichts weiter kümmern mußte spricht für eine klassische Berufsauffassung.',
        'Dafür möchte ich mich bei Frau Uhlig und ihren Mitarbeitern bedanken. Ich wünsche Ihnen ein erfülltes Leben.',
      ],
      author: 'MfG',
      authorItalic: 'R.Sommer',
    },
    {
      text: [
        'Sehr geehrte Damen und Herren,',
        'vielen Dank für die gute und zuverlässige Abwicklung beim Verkauf bzw.',
        `Ankauf meiner Targoversicherungs-LV Police. Ganz herzlichen Dank für die tolle Kundenpflege und Kommunikation gilt Ihrer Sachbearbeiterin Frau Beate Uhlig. Vom ersten Moment stimmte die Chemie und mit ihrer lockeren Art nahm sie mir auch den letzten Rest von "Vorbehalt", oder wie ich es ausdrücken soll. Vor allem hat mir auch gefallen, daß Sie sich meines "Dringlichkeitswunsches" so angenommen hat.Hat alles super geklappt, die Kaution konnte ich für unser neues Domizil bezahlen und wir sind einfach nur rundherum zufrieden mit Ihnen und - ganz besonders natürlich Ihrer Frau Uhlig.`,
        'Sicher gibt es auf dem Markt viele schwarze Schafe, aber vor Ihrem Unternehmen braucht die Targoversicherung niemanden zu warnen, im Gegenteil.',
        'Ich möchte nicht wissen,wie lange ich auf das dringend benötigte Geld hätte warten müssen,wenn ich es direkt mit der Versicherung abgewickelt hätte. Ich hätte vielleicht 100,00 mehr gehabt, aber ich denke, die Zeit hätte nicht gereicht,mein Vorhaben zu einem guten Ende zu bringen.',
        'Nochmals herzlichen Dank für die korrekte Bearbeitung und die tolle Betreuung durch Ihre Mitarbeiterin.',
      ],
      author: 'Herzlichst grüsst aus Düsseldorf / Neuss,',
      authorItalic: 'Ihre Beate Mansi',
    },
    {
      text: [
        'Sehr geehrte Frau Uhlig,',
        'Ich war mit der Abwicklung sehr zufrieden. Es wurde alles so wie es besprochen war eingehalten, schnell und gut. Vielen Dank für den reibungslosen Ablauf.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Markus Bolz',
    },
  ];
  public testimonialCol3: any = [
    {
      text: [
        'Sehr geehrte Frau Schwarz und Frau Uhlig,',
        'Das Geld aus meiner Rentenversicherung ist auf meinem Konto angekommen.Ich moechte mich hiermit fuer die zuegige und unkomplizierte Abwicklung bedanken.',
        'Ich wuensche Ihnen ein frohes Weihnachtsfest und ein erfolgreiches Jahr 2014.',
      ],
      author: 'Mit freundlichen Gruessen',
      authorItalic: 'Christian Pravato',
    },
    {
      text: [
        'Sehr geehrte Damen und Herren,',
        'auf diese Weise möchte ich mich nochmals bei Ihnen für die korrekte und schnelle Abwicklung Ihrerseits bedanken. Sofern weitere Verkäufe anstehen werde ich mich wieder gerne an Sie und Ihr Haus wenden.',
        ,
        'Nochmals Danke und beste Grüße aus der Hallertau wunscht Ihnen/Euch',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Mario Hemmerling',
    },
    {
      text: [
        'Anonym,',
        'Frau Uhlig möchte ich herzlich für Ihre unkomplizierte nicht aufdringliche und zügige Bearbeitung meines Anliegens bedanken. Ich wünsche Frau Uhlig weiter alles Gute für die Zukunft. Frau Uhlig kann ich mit gutem Gewissen weiter empfehlen.',
        'Um es kurz zu machen, Service in Beratung und Abwicklung Spitze! Sehr netter Kontakt per Telefon. Leicht verständliche Formulare, Bearbeitungszeit bis zur Auszahlung kann nicht besser sein. Jederzeit wieder.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'D. Hartmann',
    },
    {
      text: [
        'Sehr geehrte Frau Uhlig,',
        'gerne werde ich Ihnen antworten. Die Telefonberatung wie auch der Schriftverkehr und die Abwicklung sind perfekt von Ihren Damen gestaltet gewesen. Für mich ist es eine angenehme Geschäftsbeziehung gewesen, weiter so.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Klaus Dieter Woehe',
    },
    {
      text: [
        'Sehr geehrte Damen und Herren,',
        'hiermit möchte ich eine kurze Rückinfo geben zu meinem Verkauf des Bausparvertrages. Die Abwicklung war von Anfang bis Ende optimal. Die telefonische Nachfrage kam gut an und zeigt das am anderen Ende doch jemand ist als Ansprechpartner. Ein einziger Wermutstropfen war lediglich das die Überweisung des Geldes am Ende eine ganze Woche gedauert hat. Wie gesagt Winzigkeit wäre aber verbesserungswürdig. Ich hoffe mein Feedback hilft Ihnen.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Frank A.-P.',
    },
    {
      text: [
        'Hallo Frau Uhlig',
        'jetzt noch einmal ein herzliches Dankeschön für die schnelle und komplikationslose Abwicklung meiner Lebensversicherung. Auch ein großes Danke für Ihre nette Betreuung. Hat alles super geklappt.',
      ],
      author: '',
      authorItalic: 'Sabine Paulsen',
    },
    {
      text: [
        'Sehr geehrte Frau Uhlig,',
        'ich möchte mich recht herzlich bei Ihnen bedanken für den sehr guten Service und die Betreuung. Ich kann Ihnen versichern, das ich jederzeit Ihre Dienste wieder in Anspuch nehmen würde. Auch kann ich Ihre Firma durchaus weiterempfehlen.',
      ],
      author: 'Mit besten Dank und freundlichen Grüßen',
      authorItalic: 'Michael Beckmann',
    },
    {
      text: [
        'Frau Uhlig ist eine sehr nette Frau, sie hat mich gut beraten und mich immer per Telefon oder Email auf dem Laufenden unserer Versicherung gehalten. Ich werde bald wieder mit ihr Kontakt aufnehmen. Es ging alles super schnell.',
      ],
      author: '',
      authorItalic: 'Maria Tietz',
    },
    {
      text: [
        'Liebe Frau Uhlig!',
        'Vielen Dank für die schnelle Abwicklung meiner Angelegenheiten. Vielen Dank nochmal.',
      ],
      author: 'Mit freundlichen Grüßen',
      authorItalic: 'Peter Ostermeier',
    },
    {
      text: [
        'Guten Abend,',
        'Vielen Dank, ich bin mit Ihren Diensten voll und ganz zufrieden! Vielleicht werde ich in Zukunft nochmals auf sie zurück kommen!',
      ],
      author: '',
      authorItalic: 'MfG Guido Stuckstedde',
    },
    {
      text: [
        'Wir möchten uns hiermit bedanken für die Hilfe die uns angeboten wurde, wir müsse uns aber auch bei Frau Uhlig bedanken die eine Engelsgeduld mit uns hatte, denn wen man soetwas zum ersten mal macht, unterlaufen einem Laien einige Fehler. Vielen Dank nochmals für die Mühe, für alle die dran mitgearbeitet haben und die es möglich gemacht haben, das wir wieder ruhig schlafen können.',
      ],
      author: 'Vielen Dank nochmals',
      authorItalic: 'Fa. Spendlinger',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
