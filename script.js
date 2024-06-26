// Variables to store pitch and rate values
let pitchValue = 1.0;
let rateValue = 1.0;
let voices = []; // Array to store available voices

// Function to initialize the webpage
function initialize() {
    populateLanguages();
    populateVoices();
    setupEventListeners();
}

// Function to populate language select dropdown (dummy function)
function populateLanguages() {
    const languages = ['English', 'Spanish', 'French']; // Example languages
    const languageSelect = document.getElementById('languageSelect');
    languages.forEach(language => {
        const option = document.createElement('option');
        option.textContent = language;
        option.value = language.toLowerCase();
        languageSelect.appendChild(option);
    });
}

// Function to populate voice select dropdown
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

// Function to update pitch value
function updatePitch(value) {
    pitchValue = parseFloat(value).toFixed(1); // Ensure value is a float with 1 decimal place
    document.getElementById('pitchValue').textContent = `${(pitchValue * 100).toFixed(0)}%`;
}

// Function to update rate value
function updateRate(value) {
    rateValue = parseFloat(value).toFixed(1); // Ensure value is a float with 1 decimal place
    document.getElementById('rateValue').textContent = `${(rateValue * 100).toFixed(0)}%`;
}

// Function to preview voice with current settings
function previewVoice() {
    const text = 'Hello, this is a test sentence.'; // Test sentence for preview
    const language = document.getElementById('languageSelect').value;
    const voiceIndex = document.getElementById('voiceSelect').value;
    const selectedVoice = voices[parseInt(voiceIndex)];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.pitch = pitchValue;
    utterance.rate = rateValue;
    utterance.voice = selectedVoice;

    speechSynthesis.cancel(); // Stop any previous speech
    speechSynthesis.speak(utterance);
}

// Function to generate speech and create audio element
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

    speechSynthesis.cancel(); // Stop any previous speech
    speechSynthesis.speak(utterance);

    // Display audio player and set audio source
    const audioContainer = document.getElementById('audioContainer');
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(utterance)], { type: 'text/xml' }));

    audioContainer.style.display = 'block'; // Show audio player
}

// Function to play generated audio
function playAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play();
}

// Function to download generated audio as MP3
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

// Function to setup event listeners for pitch and rate sliders
function setupEventListeners() {
    const pitchSlider = document.getElementById('pitch');
    const rateSlider = document.getElementById('rate');

    pitchSlider.addEventListener('input', function() {
        updatePitch(this.value);
    });

    rateSlider.addEventListener('input', function() {
        updateRate(this.value);
    });
}

// Initialize the webpage
initialize();
