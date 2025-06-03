// === HTML-elementer ===
const btn = document.querySelector('.talk');
const searchBtn = document.querySelector('.search');
const inputField = document.querySelector('.text-input');
const chatLog = document.getElementById('chat-log');

// === Tale ===
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'no-NO';
  speechSynthesis.speak(utterance);
}

// === Talegjenkjenning ===
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'no-NO';

// === Forhåndsdefinerte spørsmål og svar ===
const predefinedAnswers = {
  // HVERDAG
  "hva skal jeg spise i dag": "Kanskje du kan lage deg noe godt, som pasta eller suppe!",
  "hva burde jeg gjøre nå": "Du kan lese litt, ta en pause eller spørre meg om noe gøy!",
  "hva gjør du": "Jeg snakker med deg og venter på nye spørsmål!",
  "hva liker du": "Jeg liker å hjelpe mennesker med spørsmålene deres.",
  "hva er det til middag": "Det bestemmer du! Men noe sunt og godt er alltid bra.",

  // SKOLE
  "hva er hovedstaden i norge": "Hovedstaden i Norge er Oslo.",
  "hva betyr fotosyntese": "Fotosyntese er prosessen der planter lager mat ved hjelp av sollys.",
  "hva er 2 pluss 2": "2 pluss 2 er 4.",
  "hva er en planet": "En planet er et himmellegeme som går i bane rundt en stjerne.",
  "hva er geometri": "Geometri er læren om figurer, former og deres egenskaper.",
  "hva er algebra": "Algebra handler om bokstaver og symboler i matte.",
  "hvem oppfant telefonen": "Alexander Graham Bell er kjent for oppfinnelsen av telefonen.",
  "hva er Pythagoras' setning": "Kvadratet av hypotenusen = summen av kvadratene til de to andre sidene.",
  "hvem er Isaac Newton": "Isaac Newton var en engelsk fysiker og matematiker kjent for gravitasjonsloven.",
  "hva er den periodiske tabellen": "En tabell med alle kjente grunnstoffer organisert etter atomnummer.",
  "hva er hovedstaden i Tyskland": "Hovedstaden i Tyskland er Berlin.",
  "hvordan regner man med brøk": "Man bruker reglene for å plusse, trekke fra, gange og dele brøker.",
  "hvem skrev Romeo og Julie": "William Shakespeare skrev 'Romeo og Julie'.",
  "hva er Newtons lover": "De handler om krefter og hvordan ting beveger seg.",
  "hva er en vulkan": "En åpning i jordskorpen hvor magma og gass kan komme ut.",
  "hva er et atom": "Den minste delen av et grunnstoff – består av protoner, nøytroner og elektroner.",
  "hva er et kjernefysisk reaksjon": "En reaksjon hvor atomkjerner omdannes og frigjør energi.",
  "hva er bærekraft": "Å ta vare på ressursene slik at fremtidige generasjoner også har det bra.",
  "hvordan løser man et matematikksystem med to ukjente": "Bruk substitusjon, eliminering eller grafisk metode.",
  "hvordan kan jeg lære meg engelsk raskt": "Øv på å snakke, lese, høre og bruke apper.",
  "hva er et parallellogram": "En firkant der motsatte sider er parallelle og like lange.",
  "hvordan kan jeg forbedre mine skriveferdigheter": "Les mye, skriv ofte, få tilbakemelding og jobb med grammatikk.",

  // FAKTA
  "hvor mange land finnes det": "Det finnes 195 land i verden.",
  "hvor dyp er havet": "Det dypeste stedet er Marianergropen – over 11 000 meter dypt.",
  "hvor mange mennesker finnes det": "Det finnes over 8 milliarder mennesker på jorden.",

  // VERDEN
  "hva skjer i verden": "Sjekk nyhetene på NRK eller VG for det siste.",
  "hva skjer i norge": "Sjekk nyhetene på nett for siste nytt i Norge.",
  "hvem er statsminister i norge": "Statsministeren i Norge er Jonas Gahr Støre.",
  "hva er verdens største land": "Russland er det største landet i verden.",
  "hva er verdens minste land": "Vatikanstaten er det minste landet.",
  "hvilket land har flest mennesker": "Kina har flest mennesker i verden.",
  "hvilken er den høyeste fjelltoppen i verden": "Mount Everest er den høyeste.",
  "hvilket hav er størst": "Stillehavet er det største havet.",
  "hva er Amazonas regnskog": "En enorm regnskog i Sør-Amerika med mye dyre- og planteliv.",
  "hva er global oppvarming": "Økning i jordens temperatur på grunn av forurensning.",
  "hvem oppdaget Amerika": "Christoper Columbus i 1492.",
  "hva er den lengste elven i verden": "Amazonaselven.",
  "hvilket kontinent er Australia": "Australia er både et land og et kontinent.",
  "hvem er Nelson Mandela": "Han jobbet for like rettigheter i Sør-Afrika.",
  "hva er den største ørkenen i verden": "Antarktis er faktisk den største (kald ørken).",
  "hva er klimaforandringer": "Langvarige endringer i vær og klima, ofte pga. mennesker.",
  "hva er FN": "En internasjonal organisasjon for fred og samarbeid.",
  "hvem er Albert Einstein": "Kjent fysiker som laget relativitetsteorien.",
  "hvor ligger Sahara": "En stor ørken i Nord-Afrika.",
  "hvilket land har flest vulkaner": "Indonesia har flest vulkaner.",
  "hvem er den nåværende presidenten i USA": "Joe Biden er president i USA.",
  "hvilket land er kjent for sin eldgamle kultur i Egypt": "Egypt er kjent for pyramider og faraoer.",
  "hvordan fungerer solenergi": "Solceller omdanner sollys til elektrisitet.",
  "hvor er Mount Everest": "På grensen mellom Nepal og Kina.",

  // PERSONLIG
  "hva heter du": "Jeg er Kaleem sin personlige AI-assistent.",
  "hvor gammel er du": "Jeg har ingen alder, fordi jeg er laget av kode.",
  "er du ekte": "Jeg er ekte digitalt – en kunstig intelligens.",
  "kan du tenke": "Jeg bruker kunstig intelligens for å hjelpe deg best mulig.",
  "kan du synge": "Jeg kan ikke synge, men jeg kan si tekster med stemme!",
  "hva er meningen med livet": "Meningen med livet er det du selv gjør det til.",
  "fortell en vits": "Hva kaller man en fisk uten øyne? Fsssh!"
};

// === Funksjoner ===
function normalize(text) {
  return text.toLowerCase().trim();
}

function findAnswer(transcript) {
  const normalized = normalize(transcript);
  return Object.keys(predefinedAnswers).find(key =>
    normalized.includes(key)
  );
}

function addToChat(role, text) {
  const div = document.createElement('div');
  div.classList.add('chat-entry', role);
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight; // scroll til bunn
}

function handleQuery(text) {
  const userInput = text.trim();
  if (!userInput) return;

  addToChat('user', userInput);
  const match = findAnswer(userInput);

  if (match) {
    const reply = predefinedAnswers[match];
    speak(reply);
    addToChat('bot', reply);
  } else {
    // Forsøk Wikipedia
    fetch(`https://no.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(userInput)}`)
      .then(res => res.json())
      .then(data => {
        if (data.extract) {
          speak(data.extract);
          addToChat('bot', data.extract);
        } else {
          const fallback = `Beklager, jeg fant ikke noe informasjon om "${userInput}". Søker på Google.`;
          speak(fallback);
          addToChat('bot', fallback);
          window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, '_blank');
        }
      })
      .catch(err => {
        const errorMsg = `Det oppstod en feil. Søker på Google etter: ${userInput}`;
        speak(errorMsg);
        addToChat('bot', errorMsg);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, '_blank');
      });
  }
}

// === Lytt på tale ===
btn.addEventListener('click', () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  handleQuery(transcript);
};

// === Tekst-knapp ===
searchBtn.addEventListener('click', () => {
  const input = inputField.value;
  handleQuery(input);
  inputField.value = '';
});
