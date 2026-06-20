# Faircharity e.V. — 5 große Verbesserungen für die neue Website

*Fünf Funktionen, die die Stärke der Marke — Transparenz und „Hilfe mit System" — in echte digitale Vorteile verwandeln. Jede ist so beschrieben, dass du sie deinem Freund direkt vorstellen (und verkaufen) kannst.*

---

## 1. Live-Wirkungs- & Transparenz-Dashboard

**Was:** Eine öffentliche Seite, die pro Projekt zeigt, wie viel gesammelt wurde, wohin es floss und welche Wirkung erzielt wurde — inklusive einer Galerie mit datumsgestempelten Foto- und Videonachweisen (z. B. Kurban-Namensschilder, fertige Brunnen, Patenkinder-Updates).

**Warum es zu Faircharity passt:** Das Alleinstellungsmerkmal ist „Transparenz durch Offenlegung, nicht durch Siegel." Heute steht das nur als Text da. Ein Dashboard *beweist* es und macht aus dem Versprechen ein sichtbares Produkt — der stärkste Vertrauens- und Verkaufshebel der ganzen Seite.

**Wie:** Kleine Datenbank (z. B. Supabase) mit Projekten, Beträgen und Medien; Admin-Upload für neue Nachweise; automatische Fortschrittsbalken. Optional ein QR-Code auf der Spendenquittung, der direkt zum jeweiligen Projektnachweis führt.

---

## 2. Integrierte Online-Zahlung mit „100 %-Policy"-Schalter

**Was:** Echtes Spenden-Checkout direkt auf der Seite (Kreditkarte, PayPal, Apple/Google Pay, SEPA-Lastschrift) statt nur manueller Überweisung. Beim Bezahlen ein Schalter: *„Ich übernehme die Umsetzungskosten, damit meine Zakat zu 100 % ankommt."*

**Warum es zu Faircharity passt:** Die Transparenz-Seite beschreibt genau dieses freiwillige Zusatzbeitrags-Modell — aber aktuell muss der Spender selbst rechnen und überweisen. Direkt im Checkout abgebildet, steigert das die Abschlussrate massiv und macht die 100 %-Donation-Policy zum aktiven Feature statt zur Fußnote.

**Wie:** Stripe oder PayPal als Zahlungsdienst, Twingle ist bereits im Einsatz und kann eingebettet werden. Der „Fees-decken"-Schalter addiert die 20 % (Pflichtspenden) bzw. den Zusatzbeitrag (Zakat) automatisch zum Betrag.

---

## 3. Intelligenter Zakat-Assistent mit Hawl-Erinnerung

**Was:** Der eingebaute Zakat-Rechner wird zum vollwertigen Assistenten: aktueller Nisab automatisch aus tagesaktuellen Gold-/Silberpreisen, Speichern des persönlichen Stichtags (Hawl) und eine Erinnerung per E-Mail, wenn das Zakat-Jahr abgelaufen ist — mit direktem Bezahllink.

**Warum es zu Faircharity passt:** Die Zakat-Seite sagt selbst: „Viele Muslime kennen Nisab & Regeln nicht — Milliarden bleiben falsch berechnet." Genau hier kann Faircharity zur Referenz werden. Ein Assistent, der korrekt rechnet *und* zur richtigen Zeit erinnert, bindet Spender langfristig und positioniert die Organisation als Bildungs-Autorität.

**Wie:** Live-Preis-API für Gold/Silber, ein einfaches E-Mail-Erinnerungssystem (Hawl-Datum + ein Jahr), Speicherung optional im Spenderkonto (siehe Punkt 4).

---

## 4. Spenderkonto „Mein Faircharity" mit digitaler Spendenquittung

**Was:** Ein Login-Bereich, in dem Spender ihre Beiträge sehen, wiederkehrende Spenden/Mitgliedschaften verwalten, Patenkinder-Updates abrufen und ihre **Zuwendungsbestätigung (Spendenquittung) als PDF** selbst herunterladen.

**Warum es zu Faircharity passt:** Patenschaften und die „Fa(ir)mily"-Mitgliedschaften (Supporter bis Guardian) leben von wiederkehrenden Beziehungen — die brauchen einen Ort. Die automatische Steuerquittung ist in Deutschland ein starkes Argument und spart enorm Verwaltungsaufwand (passt zum Ziel, Kosten unter 10 % zu senken).

**Wie:** Nutzerkonten + Datenbank, automatische PDF-Generierung pro Spende/Jahr, Bereich für projektbezogene Updates und Nachweise. Baut direkt auf Punkt 1 und 2 auf.

---

## 5. Kurban- & Patenschafts-Tracking mit persönlichem Nachweis-Versand

**Was:** Beim Kurban gibt der Spender beim Bestellen seinen Namen für das Namensschild an und verfolgt anschließend den Status (*bestellt → durchgeführt → Nachweis verfügbar*). Sobald Foto/Video bereitstehen, kommt automatisch eine Benachrichtigung per E-Mail oder WhatsApp. Dasselbe Prinzip für Patenkinder-Updates.

**Warum es zu Faircharity passt:** Die Kurban-Seite verspricht bereits „persönlichen Bild- und Videonachweis mit Datumsstempel und Namensschild" — heute aber ohne System dahinter. Ein Tracking macht aus diesem Versprechen ein begeisterndes Erlebnis, erzeugt Weiterempfehlungen und hebt Faircharity klar von anonymen Großspenden-NGOs ab.

**Wie:** Status-Feld pro Bestellung, Medien-Upload durch das Team vor Ort, automatischer Versand der Nachweise. WhatsApp-Benachrichtigung über einen Business-API-Dienst; Updates landen zusätzlich im Spenderkonto.

---

### Empfohlene Reihenfolge

| Priorität | Funktion | Aufwand | Wirkung |
|---|---|---|---|
| 1 | Online-Zahlung + 100 %-Schalter (Nr. 2) | mittel | sehr hoch — direkter Umsatz |
| 2 | Transparenz-Dashboard (Nr. 1) | mittel | sehr hoch — Vertrauen & Marke |
| 3 | Spenderkonto + Quittung (Nr. 4) | hoch | hoch — Bindung & Entlastung |
| 4 | Zakat-Assistent + Erinnerung (Nr. 3) | niedrig–mittel | hoch — wiederkehrende Spenden |
| 5 | Kurban-/Patenschafts-Tracking (Nr. 5) | mittel | hoch — Differenzierung |

*Die Punkte 1, 2 und 4 teilen sich dieselbe Datenbank und können als ein zusammenhängendes System gebaut werden — das senkt den Gesamtaufwand erheblich.*
