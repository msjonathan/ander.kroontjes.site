# Marketing- & content-analyse — Ander Kroontjes

Analyse van de portfolio-website (Hugo, `anderkroontjes.be`) met concrete
verbeterpunten om de site beter vindbaar te maken en meer bestellingen op te leveren.
Bekeken: `config.toml`, de About-pagina, de portfolio-structuur (48 kroontjes),
enkele individuele kroontjes en de thema-`<head>`.

## Wat goed zit
- Warme, duidelijke About-pagina met de essentie (prijs €20, verwisselbaar cijfer, velcro 42–55 cm, ophalen Olen/Herentals, verzenden vanaf €3,78).
- Een rijke catalogus — **48 kroontjes** met foto's, en een taxonomie-systeem (`kleuren`, `geslachten`, `patronen`, `tags`) waarmee bezoekers op kleur/thema zouden kunnen bladeren.
- Instagram + WhatsApp voor laagdrempelig bestellen.

## De grootste hiaten (meeste impact)

### 1. Elke pagina had dezelfde `<title>` en meta-omschrijving ✅ OPGELOST
In `head.html` was de titel enkel `.Site.Title` en de omschrijving de site-brede tekst — alle 48 kroontjes zagen er voor Google identiek uit. Dit is de #1 reden waarom zo'n portfolio niet gevonden wordt.
**Gedaan:** per-pagina unieke `<title>` (`Kroontje – Ander Kroontjes`), per-pagina meta-omschrijving (uit de eigen tekst van elk kroontje), plus Open Graph/Twitter-tags met de eigen foto als deel-afbeelding. Landingspagina `/portfolio/` kreeg de titel "Kroontjes" met een Nederlandse, zoekwoordrijke omschrijving.

### 2. Taxonomieën waren nauwelijks ingevuld ✅ OPGELOST
`patronen` ontbrak op 45/48, `kleuren` op 26/48 kroontjes — waardoor bladeren/filteren niet werkte.
**Gedaan:** alle 48 kroontjes hebben nu `kleuren` én `patronen` (via beeldanalyse van de foto's). Zie `kleuren-patronen-analyse.md` voor de volledige tabel. Hugo genereert nu term-pagina's per kleur en patroon (bv. `/kleuren/muntgroen/`, `/patronen/dinos/`).
**Nog te doen:** die term-pagina's zichtbaar/klikbaar maken in de UI (tags op elk kroontje + filterbalk op de portfolio-pagina).

### 3. 8 kroontjes hebben géén omschrijving ⏳ OPEN
En de bestaande omschrijvingen zijn kort (één regel). Een korte 1–2 zinnen per kroontje ("Voor een echte dino-fan: felgroen met kleine dino's aan de binnenkant, perfect voor een 3de verjaardag") voegt warmte, zoekwoorden en indexeerbare tekst toe.

### 4. Alt-teksten bij afbeeldingen zijn generiek ⏳ OPEN
Elke afbeelding is `Kroontje haaien` e.d. Ouders googelen letterlijk "kroontje verjaardag jongen paw patrol" — beschrijvende alt-tekst vangt die beeld-zoekopdrachten én helpt de toegankelijkheid.

## Conversie (bezoekers → bestellingen)

### 5. Geen echt bestelpad op de site ⏳ OPEN
Bestellen gebeurt via "stuur een berichtje". Er staat een `bestelformulier.docx` in de repo die nooit op de site kwam. Een eenvoudige bestel-/contactpagina (het thema ondersteunt Formspree) met een duidelijke "Bestel dit kroontje"-knop verlaagt de drempel.

### 6. Geen social proof ⏳ OPEN
Geen reviews/testimonials en de Instagram-feed is niet ingebed. Een paar korte quotes van tevreden ouders + foto's van kindjes met de kroontjes bouwt snel vertrouwen op voor een handgemaakt product.

## Vindbaarheid & meten

### 7. Lokale SEO onbenut ⏳ OPEN
Je bedient Olen/Herentals (Kempen). Locatiewoorden toevoegen ("handgemaakte kroontjes in de Kempen – ophalen in Olen of Herentals") en een Google Bedrijfsprofiel winnen lokale zoekopdrachten goedkoop.

### 8. Geen analytics actief ⏳ OPEN
`googleAnalytics = ""` en Matomo staat uitgecommentarieerd (`config.toml`). Je vliegt nu blind. Zet privacy-vriendelijke Matomo aan (al voorzien in het thema) om te zien welke kroontjes bekeken worden en waar bezoekers afhaken.

### 9. Geen Open Graph / deel-tags ✅ OPGELOST (bij punt 1)
Bij delen op WhatsApp/Instagram/Facebook was er geen voorbeeldafbeelding of titel. Nu tonen gedeelde links een nette productkaart met de foto van het kroontje.

## Voorgestelde volgorde
1. ✅ Per-pagina titels + meta-omschrijvingen + Open Graph
2. ⏳ Analytics aanzetten om te meten
3. ✅ `kleuren` + `patronen` invullen op alle 48 kroontjes → ⏳ zichtbaar maken (tags + filterbalk)
4. ⏳ Beschrijvende alt-tekst + de 8 ontbrekende omschrijvingen
5. ⏳ Bestel-/contactpagina met duidelijke call-to-action
6. ⏳ Testimonials + Instagram-embed

---

_Detail over kleuren en patronen per kroontje: zie `kleuren-patronen-analyse.md`._
