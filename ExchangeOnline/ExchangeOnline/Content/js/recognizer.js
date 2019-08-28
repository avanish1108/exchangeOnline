//var r = document.getElementById('result');
function startConverting() {
	var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	recognition.lang = 'en-IN';
	recognition.interimResults = false;
	//recognition.maxAlternatives = 5;
	recognition.continuous = true;
	recognition.start();
	var finalTranscripts = '';
	recognition.onresult = function (e) {
		document.getElementById('result').value= e.results[0][0].transcript;
		recognition.stop();
		//document.getElementById('labnol').submit();
	};

	recognition.onerror = function (e) {
		recognition.stop();
	};
	//recognition.onresult = function (event) {
	//	var interimTranscripts = "";
	//	for (var i = event.resultIndex; i < event.results; i++) {
	//		var transcript = event.results[i][0].transcript;
	//		transcript.replace("/n", "<br>");
	//		if (event.results[i].isFinal) {
	//			finalTranscripts = transcript;
	//		}
	//		else {
	//			interimTranscripts = transcript;
	//		}
	//	}
	//	r.innerHTML = '<span>' + event.results[0][0].transcript + '</span>'
		//console.log('You said: ', event.results[0][0].transcript);
	//};
}