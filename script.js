let pitchValue = 1.0;
let rateValue = 1.0;
let voices = [];

function initialize() {
    populateLanguages();
    setupEventListeners();
}

function populateLanguages() {
    const languages = ['English', 'Spanish', 'French'];
    const languageSelect = document.getElementById('languageSelect');
    languages.forEach(language => {
        const option = document.createElement('option');
        option.textContent = language;
        option.value = language.toLowerCase();
        languageSelect.appendChild(option);
    });
}

function populateVoices() {
    voices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voiceSelect');
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = voice.name;
        option.value = index.toString();
        voiceSelect.appendChild(option);
    });
}

function updatePitch(value) {
    pitchValue = parseFloat(value).toFixed(1);
    document.getElementById('pitchValue').textContent = `${(pitchValue * 100).toFixed(0)}%`;
}

function updateRate(value) {
    rateValue = parseFloat(value).toFixed(1);
    document.getElementById('rateValue').textContent = `${(rateValue * 100).toFixed(0)}%`;
}

function previewVoice() {
    const text = 'Hello, this is a test sentence.';
    const language = document.getElementById('languageSelect').value;
    const voiceIndex = document.getElementById('voiceSelect').value;
    const selectedVoice = voices[parseInt(voiceIndex)];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.pitch = pitchValue;
    utterance.rate = rateValue;
    utterance.voice = selectedVoice;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

function generateSpeech() {
    const text = document.getElementById('textArea').value.trim();
    if (text === '') {
        alert('Please enter some text to generate speech.');
        return;
    }

    const language = document.getElementById('languageSelect').value;
    const voiceIndex = document.getElementById('voiceSelect').value;
    const selectedVoice = voices[parseInt(voiceIndex)];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.pitch = pitchValue;
    utterance.rate = rateValue;
    utterance.voice = selectedVoice;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);

    const audioContainer = document.getElementById('audioContainer');
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(utterance)], { type: 'text/xml' }));

    audioContainer.style.display = 'block';
}

function playAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play();
}

function downloadAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioUrl = audioPlayer.src;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'generated_audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function setupEventListeners() {
    const pitchSlider = document.getElementById('pitch');
    const rateSlider = document.getElementById('rate');

    pitchSlider.addEventListener('input', function() {
        updatePitch(this.value);
    });

    rateSlider.addEventListener('input', function() {
        updateRate(this.value);
    });

    // Wait for voices to be loaded before populating voice options
    speechSynthesis.onvoiceschanged = function() {
        populateVoices();
    };
}

// Initialize the webpage
initialize();
