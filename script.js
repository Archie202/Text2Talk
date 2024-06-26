// Variables to store pitch and rate values
let pitchValue = 1.0;
let rateValue = 1.0;

// Function to initialize the webpage
function initialize() {
    // Populate language and voice options (adjust according to your needs)
    populateLanguages();
    populateVoices();
}

// Function to populate language select dropdown (dummy function)
function populateLanguages() {
    // Example: Dummy function to populate language options
    const languages = ['English', 'Spanish', 'French']; // Example languages
    const languageSelect = document.getElementById('languageSelect');
    languages.forEach(language => {
        const option = document.createElement('option');
        option.textContent = language;
        option.value = language.toLowerCase();
        languageSelect.appendChild(option);
    });
}

// Function to populate voice select dropdown (dummy function)
function populateVoices() {
    // Example: Dummy function to populate voice options
    const voices = ['Male Voice 1', 'Female Voice 1', 'Male Voice 2']; // Example voices
    const voiceSelect = document.getElementById('voiceSelect');
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice;
        option.value = voice.toLowerCase().replace(/\s/g, '-');
        voiceSelect.appendChild(option);
    });
}

// Function to update pitch value
function updatePitch(value) {
    pitchValue = parseFloat(value).toFixed(1); // Ensure value is a float with 1 decimal place
}

// Function to update rate value
function updateRate(value) {
    rateValue = parseFloat(value).toFixed(1); // Ensure value is a float with 1 decimal place
}

// Function to preview voice with current settings
function previewVoice() {
    const text = document.getElementById('textArea').value.trim();
    if (text === '') {
        alert('Please enter some text to preview.');
        return;
    }

    const language = document.getElementById('languageSelect').value;
    const voice = document.getElementById('voiceSelect').value;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.pitch = pitchValue;
    utterance.rate = rateValue;
    utterance.voice = speechSynthesis.getVoices().find(v => v.name.toLowerCase().replace(/\s/g, '-') === voice);

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
    const voice = document.getElementById('voiceSelect').value;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.pitch = pitchValue;
    utterance.rate = rateValue;
    utterance.voice = speechSynthesis.getVoices().find(v => v.name.toLowerCase().replace(/\s/g, '-') === voice);

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

// Initialize the webpage
initialize();
