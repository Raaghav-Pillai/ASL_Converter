// This file will contain the JavaScript code for accessing the camera and processing the sign language.

const videoElement = document.getElementById('videoFeed');
const translatedTextOutputElement = document.getElementById('translatedTextOutput');
const speakButtonElement = document.getElementById('speakButton');

// Access camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            videoElement.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error accessing the camera: ", error);
            translatedTextOutputElement.textContent = "Could not access the camera. Please ensure you have a camera connected and have granted permission.";
            // alert("Could not access the camera. Please ensure you have a camera connected and have granted permission.");
        });
} else {
    console.error("getUserMedia not supported on this browser.");
    translatedTextOutputElement.textContent = "Your browser does not support camera access. Please try a different browser.";
    // alert("Your browser does not support camera access. Please try a different browser.");
}

// Text-to-Speech
if (speakButtonElement && translatedTextOutputElement && 'speechSynthesis' in window) {
    speakButtonElement.addEventListener('click', function() {
        let textToSpeak = translatedTextOutputElement.textContent;
        if (!textToSpeak || textToSpeak.trim() === "" || textToSpeak.trim() === "Translated text will appear here...") {
            textToSpeak = "Hello, this is a test of text to speech.";
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        speechSynthesis.speak(utterance);
    });
} else {
    console.error("Text-to-Speech or required elements are not available.");
    if (speakButtonElement) {
        speakButtonElement.disabled = true;
        speakButtonElement.textContent = "TTS Not Available";
    }
    // Optionally, inform the user that TTS is not available.
}
