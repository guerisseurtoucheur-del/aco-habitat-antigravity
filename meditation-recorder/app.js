const scriptText = `
Prenez un instant pour trouver une position confortable.
Vous pouvez être assis sur une chaise, les pieds bien à plat sur le sol, ou allongé sur le dos.
[Pause de 5 secondes]
À présent, si vous vous sentez prêt, vous pouvez doucement fermer les yeux.
Laissez les bruits extérieurs s'éloigner.
[Pause de 5 secondes]
Portez votre attention sur votre respiration. 
Ne cherchez pas à la modifier. Observez simplement le mouvement naturel de l'air...
[Pause de 10 secondes]
Prenez une profonde inspiration par le nez... 
Et soufflez lentement par la bouche, comme pour relâcher toutes les tensions.
[Pause de 10 secondes]
Portez votre attention sur vos pieds.
Laissez-les devenir lourds, complètement détendus.
[Pause de 10 secondes]
Sentez la détente envahir vos cuisses, votre bassin.
Toutes les tensions accumulées ici se dissipent.
[Pause de 10 secondes]
Portez maintenant votre attention sur votre ventre. 
Votre ventre est souple, détendu.
[Pause de 10 secondes]
La vague de relaxation remonte vers votre poitrine, et enveloppe tout votre dos.
Vos épaules s'affaissent doucement.
[Pause de 10 secondes]
La détente glisse le long de vos bras... jusqu'au bout de vos doigts.
[Pause de 10 secondes]
Enfin, détendez votre nuque, votre cou, et votre visage.
Tout votre corps est maintenant parfaitement détendu, lourd, et apaisé.
[Pause de 15 secondes]
Imaginez que vous vous trouvez dans un endroit magnifique, un lieu où vous vous sentez en parfaite sécurité.
[Pause de 15 secondes]
Sentez cette chaleur agréable sur votre peau.
[Pause de 15 secondes]
Si des pensées traversent votre esprit, c'est tout à fait normal. 
Observez-les simplement passer, et ramenez doucement votre attention sur votre respiration.
[Pause de 30 secondes]
Ici, dans cet espace, il n'y a ni passé, ni futur. Il n'y a que l'instant présent. 
[Pause de 30 secondes]
Profitez de ce silence, de ce calme intérieur. 
[Pause de 60 secondes]
Il est maintenant temps de vous préparer à revenir.
Conservez cette sensation de calme.
[Pause de 10 secondes]
Reprenez conscience de la pièce dans laquelle vous vous trouvez.
[Pause de 10 secondes]
Commencez à ramener doucement le mouvement dans votre corps. 
[Pause de 10 secondes]
Vous pouvez vous étirer doucement.
[Pause de 10 secondes]
Et quand vous vous sentirez prêt, vous pourrez doucement ouvrir les yeux.
Namasté.
`;

const prompterDiv = document.getElementById('prompter');
const recordBtn = document.getElementById('recordBtn');
const stopBtn = document.getElementById('stopBtn');
const ambientBtn = document.getElementById('ambientBtn');
const soundSelect = document.getElementById('soundSelect');
const resultPanel = document.getElementById('resultPanel');
const audioPlayback = document.getElementById('audioPlayback');
const downloadLink = document.getElementById('downloadLink');

// Format text for prompter
const lines = scriptText.trim().split('\n');
lines.forEach(line => {
    if(line.includes('[Pause')) {
        const p = document.createElement('div');
        p.className = 'pause';
        p.innerText = line;
        prompterDiv.appendChild(p);
    } else {
        const p = document.createElement('p');
        p.innerText = line;
        prompterDiv.appendChild(p);
    }
});

// Sound Definitions
function createNoise(ctx) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    return noise;
}

const sounds = [
    { name: "-- MUSIQUES MULTI-INSTRUMENTS --", type: "none" },
    { name: "Jardin Zen (Flûte douce, Eau et Bourdon)", type: "zen_garden" },
    { name: "Nuit Étoilée (Carillons de cristal, Vent, Nappes)", type: "starry_night" },
    { name: "Temple Himalayen (Bols, Vent, Chœurs graves)", type: "temple" },
    { name: "Voyage Astral (Arpèges Cosmiques)", type: "astral" },
    { name: "Aube Paisible (Harpe aléatoire, Rivière)", type: "morning_harp" },
    { name: "-- AMBIANCES SIMPLES --", type: "none" },
    { name: "Bol Tibétain Profond (110Hz)", type: "bowl", freq: 110, volume: 0.8 },
    { name: "Bol Tibétain Clair (432Hz)", type: "bowl", freq: 432, volume: 0.3 },
    { name: "Bol Chantant - Réparation (528Hz)", type: "bowl", freq: 528, volume: 0.3 },
    { name: "Fréquence Sacrée - Harmonie (963Hz)", type: "drone", freq: 963, volume: 0.4 },
    { name: "Bruit de l'Eau qui Coule - Ruisseau", type: "water", filterType: "bandpass", freq: 800, q: 0.5, volume: 1.0 },
    { name: "Bruit de l'Eau qui Coule - Rivière", type: "water", filterType: "bandpass", freq: 400, q: 0.2, volume: 1.0 },
    { name: "Vagues de l'Océan Calmes", type: "ocean", speed: 0.15, freq: 500, volume: 1.2 },
    { name: "Pluie Fine", type: "rain", freq: 4000, volume: 0.3 },
    { name: "Souffle du Vent d'Hiver", type: "wind", freq: 600, speed: 0.3, volume: 1.5 },
    { name: "Battements Binauraux (Onde Theta 5Hz)", type: "binaural", freq: 200, beat: 5, volume: 0.5 },
    { name: "Silence (Voix uniquement)", type: "none" }
];

// Populate Select
sounds.forEach((sound, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.innerText = sound.name;
    soundSelect.appendChild(opt);
});

let mediaRecorder;
let audioChunks = [];
let prompterInterval;
let position = 100; 

let audioCtx;
let activeNodes = [];
let activeIntervals = [];
let masterGain;
let streamDestination; 
let isAmbientPlaying = false;

function stopAmbient() {
    activeNodes.forEach(node => {
        try { node.stop(); } catch(e){}
        try { node.disconnect(); } catch(e){}
    });
    activeNodes = [];
    activeIntervals.forEach(clearInterval);
    activeIntervals = [];
    if(masterGain) masterGain.disconnect();
    isAmbientPlaying = false;
    ambientBtn.innerHTML = '<span class="icon">🎵</span> Activer le Son';
    ambientBtn.style.background = 'transparent';
    ambientBtn.style.color = 'var(--primary-color)';
}

function startAmbient() {
    if(isAmbientPlaying) stopAmbient();
    
    if(!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        streamDestination = audioCtx.createMediaStreamDestination();
    }
    
    if(audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const sound = sounds[soundSelect.value];
    if(sound.type === "none") return;

    masterGain = audioCtx.createGain();
    masterGain.gain.value = (sound.volume || 1.0) * 0.2; 
    
    masterGain.connect(audioCtx.destination);
    masterGain.connect(streamDestination);

    const time = audioCtx.currentTime;

    if (sound.type === "zen_garden") {
        // Water
        const noise = createNoise(audioCtx);
        const filter = audioCtx.createBiquadFilter();
        filter.type = "bandpass"; filter.frequency.value = 400;
        noise.connect(filter); filter.connect(masterGain);
        noise.start();
        activeNodes.push(noise, filter);
        
        // Drone
        const drone = audioCtx.createOscillator();
        drone.type = 'sine'; drone.frequency.value = 108;
        const dGain = audioCtx.createGain(); dGain.gain.value = 0.5;
        drone.connect(dGain); dGain.connect(masterGain);
        drone.start();
        activeNodes.push(drone, dGain);

        // Random Flute (Pentatonic scale based on A=432)
        const scale = [216, 243, 288, 324, 384, 432, 486, 576, 648];
        const intId = setInterval(() => {
            if(Math.random() > 0.3) {
                const osc = audioCtx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = scale[Math.floor(Math.random() * scale.length)];
                const env = audioCtx.createGain();
                const t = audioCtx.currentTime;
                env.gain.setValueAtTime(0, t);
                env.gain.linearRampToValueAtTime(0.4, t + 1); // slow attack
                env.gain.linearRampToValueAtTime(0, t + 4);   // slow release
                osc.connect(env); env.connect(masterGain);
                osc.start(t); osc.stop(t + 4);
                // We don't push these short-lived nodes to activeNodes to prevent memory bloat
                // They clean themselves up.
            }
        }, 2500);
        activeIntervals.push(intId);

    } else if (sound.type === "starry_night") {
        // Wind
        const noise = createNoise(audioCtx);
        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass"; filter.frequency.value = 600;
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine'; lfo.frequency.value = 0.1;
        const lfoGain = audioCtx.createGain(); lfoGain.gain.value = 0.5;
        lfo.connect(lfoGain.gain);
        noise.connect(lfoGain); lfoGain.connect(filter); filter.connect(masterGain);
        noise.start(); lfo.start();
        activeNodes.push(noise, filter, lfo, lfoGain);
        
        // Pads (Chord)
        [324, 384, 432, 486].forEach(f => {
            const osc = audioCtx.createOscillator();
            osc.type = 'triangle'; osc.frequency.value = f / 2;
            const env = audioCtx.createGain(); env.gain.value = 0.2;
            osc.connect(env); env.connect(masterGain);
            osc.start();
            activeNodes.push(osc, env);
        });

        // Chimes
        const scale = [864, 972, 1152, 1296, 1536];
        const intId = setInterval(() => {
            if(Math.random() > 0.4) {
                const osc = audioCtx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = scale[Math.floor(Math.random() * scale.length)];
                const env = audioCtx.createGain();
                const t = audioCtx.currentTime;
                env.gain.setValueAtTime(0, t);
                env.gain.linearRampToValueAtTime(0.2, t + 0.05); // fast attack
                env.gain.exponentialRampToValueAtTime(0.001, t + 3); // ring release
                osc.connect(env); env.connect(masterGain);
                osc.start(t); osc.stop(t + 3);
            }
        }, 1500);
        activeIntervals.push(intId);

    } else if (sound.type === "temple") {
        // Drone/Choir
        [108, 162, 216].forEach(f => {
            const osc = audioCtx.createOscillator();
            osc.type = 'sawtooth'; osc.frequency.value = f;
            const filter = audioCtx.createBiquadFilter();
            filter.type = "lowpass"; filter.frequency.value = 300; // Muted choir sound
            const gain = audioCtx.createGain(); gain.gain.value = 0.2;
            osc.connect(filter); filter.connect(gain); gain.connect(masterGain);
            osc.start();
            activeNodes.push(osc, filter, gain);
        });

        // Tibetan bowls (random striking)
        const scale = [216, 288, 324, 432];
        const intId = setInterval(() => {
            if(Math.random() > 0.5) {
                const f = scale[Math.floor(Math.random() * scale.length)];
                // Fundamental
                const osc1 = audioCtx.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = f;
                // Harmonic
                const osc2 = audioCtx.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = f * 2.5;
                const env = audioCtx.createGain();
                const t = audioCtx.currentTime;
                env.gain.setValueAtTime(0, t);
                env.gain.linearRampToValueAtTime(0.5, t + 0.1); 
                env.gain.linearRampToValueAtTime(0, t + 6); // long sustain
                osc1.connect(env); osc2.connect(env); env.connect(masterGain);
                osc1.start(t); osc1.stop(t + 6);
                osc2.start(t); osc2.stop(t + 6);
            }
        }, 4000);
        activeIntervals.push(intId);

    } else if (sound.type === "astral") {
        // Space pad
        [200, 202, 300, 303].forEach(f => {
            const osc = audioCtx.createOscillator();
            osc.type = 'sine'; osc.frequency.value = f;
            const gain = audioCtx.createGain(); gain.gain.value = 0.3;
            osc.connect(gain); gain.connect(masterGain);
            osc.start();
            activeNodes.push(osc, gain);
        });

        // Arpeggiator
        const scale = [400, 450, 500, 600, 750];
        let step = 0;
        const intId = setInterval(() => {
            const osc = audioCtx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.value = scale[step % scale.length] * (Math.random() > 0.8 ? 2 : 1);
            const env = audioCtx.createGain();
            const t = audioCtx.currentTime;
            env.gain.setValueAtTime(0, t);
            env.gain.linearRampToValueAtTime(0.15, t + 0.1); 
            env.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
            
            const filter = audioCtx.createBiquadFilter();
            filter.type = "lowpass"; filter.frequency.value = 1500;
            
            osc.connect(env); env.connect(filter); filter.connect(masterGain);
            osc.start(t); osc.stop(t + 0.5);
            step++;
        }, 300);
        activeIntervals.push(intId);

    } else if (sound.type === "morning_harp") {
        // River
        const noise = createNoise(audioCtx);
        const filter = audioCtx.createBiquadFilter();
        filter.type = "bandpass"; filter.frequency.value = 600; filter.Q.value = 0.5;
        noise.connect(filter); filter.connect(masterGain);
        noise.start();
        activeNodes.push(noise, filter);

        // Harp / Pluck
        const scale = [216, 243, 288, 324, 384, 432, 486];
        const intId = setInterval(() => {
            if(Math.random() > 0.2) {
                const osc = audioCtx.createOscillator();
                // Square wave lowpass sounds a bit like a pluck
                osc.type = 'square';
                osc.frequency.value = scale[Math.floor(Math.random() * scale.length)];
                
                const filterPluck = audioCtx.createBiquadFilter();
                filterPluck.type = "lowpass"; 
                filterPluck.frequency.value = 800;

                const env = audioCtx.createGain();
                const t = audioCtx.currentTime;
                env.gain.setValueAtTime(0, t);
                env.gain.linearRampToValueAtTime(0.3, t + 0.02); // very fast attack
                env.gain.exponentialRampToValueAtTime(0.001, t + 1.5); // decay
                
                osc.connect(filterPluck); filterPluck.connect(env); env.connect(masterGain);
                osc.start(t); osc.stop(t + 1.5);
            }
        }, 600);
        activeIntervals.push(intId);
    } 
    // Fallbacks for simple sounds
    else if (sound.type === "bowl" || sound.type === "drone") {
        const osc1 = audioCtx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = sound.freq;
        const osc2 = audioCtx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.value = sound.freq * 1.5;
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine'; lfo.frequency.value = 0.1;
        const lfoGain = audioCtx.createGain(); lfoGain.gain.value = 0.5;
        lfo.connect(lfoGain.gain);
        osc1.connect(lfoGain); osc2.connect(lfoGain); lfoGain.connect(masterGain);
        osc1.start(); osc2.start(); lfo.start();
        activeNodes.push(osc1, osc2, lfo, lfoGain);
    } else if (sound.type === "water" || sound.type === "rain") {
        const noise = createNoise(audioCtx);
        const filter = audioCtx.createBiquadFilter();
        filter.type = sound.filterType || (sound.type === "rain" ? "highpass" : "lowpass");
        filter.frequency.value = sound.freq;
        if(sound.q) filter.Q.value = sound.q;
        noise.connect(filter); filter.connect(masterGain);
        noise.start();
        activeNodes.push(noise, filter);
    } else if (sound.type === "ocean" || sound.type === "wind") {
        const noise = createNoise(audioCtx);
        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass"; filter.frequency.value = sound.freq;
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine'; lfo.frequency.value = sound.speed;
        const lfoGain = audioCtx.createGain(); lfoGain.gain.value = 0.8;
        lfo.connect(lfoGain.gain); noise.connect(lfoGain); lfoGain.connect(filter); filter.connect(masterGain);
        noise.start(); lfo.start();
        activeNodes.push(noise, filter, lfo, lfoGain);
    } else if (sound.type === "binaural") {
        const oscL = audioCtx.createOscillator(); oscL.type = 'sine'; oscL.frequency.value = sound.freq;
        const pannerL = audioCtx.createStereoPanner(); pannerL.pan.value = -1;
        oscL.connect(pannerL); pannerL.connect(masterGain);
        const oscR = audioCtx.createOscillator(); oscR.type = 'sine'; oscR.frequency.value = sound.freq + sound.beat;
        const pannerR = audioCtx.createStereoPanner(); pannerR.pan.value = 1;
        oscR.connect(pannerR); pannerR.connect(masterGain);
        oscL.start(); oscR.start();
        activeNodes.push(oscL, oscR, pannerL, pannerR);
    }

    ambientBtn.innerHTML = '<span class="icon">🎵</span> Son ' + sound.name.split(' ')[0] + ' Activé';
    ambientBtn.style.color = '#fff';
    ambientBtn.style.backgroundColor = 'var(--secondary-color)';
    isAmbientPlaying = true;
}

ambientBtn.addEventListener('click', () => {
    if(isAmbientPlaying) stopAmbient();
    else startAmbient();
});

soundSelect.addEventListener('change', () => {
    if(isAmbientPlaying) startAmbient(); 
});

recordBtn.addEventListener('click', async () => {
    try {
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        if(!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            streamDestination = audioCtx.createMediaStreamDestination();
        }
        
        const mixedStream = new MediaStream();
        const micSource = audioCtx.createMediaStreamSource(micStream);
        micSource.connect(streamDestination); 
        streamDestination.stream.getTracks().forEach(track => mixedStream.addTrack(track));

        mediaRecorder = new MediaRecorder(mixedStream);
        audioChunks = [];

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayback.src = audioUrl;
            downloadLink.href = audioUrl;
            resultPanel.classList.remove('hidden');
            micStream.getTracks().forEach(t => t.stop()); 
        };

        mediaRecorder.start();
        recordBtn.disabled = true;
        stopBtn.disabled = false;
        
        position = 100;
        prompterDiv.style.top = position + '%';
        
        prompterInterval = setInterval(() => {
            position -= 0.05; 
            prompterDiv.style.top = position + '%';
        }, 50);
        
    } catch (err) {
        alert("Erreur d'accès au microphone : " + err.message);
    }
});

stopBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    clearInterval(prompterInterval);
    recordBtn.disabled = false;
    stopBtn.disabled = true;
    stopAmbient();
});

// ELEVENLABS LOGIC
const elevenLabsApiKeyInput = document.getElementById('elevenLabsApiKey');
const fetchVoicesBtn = document.getElementById('fetchVoicesBtn');
const voiceSelect = document.getElementById('voiceSelect');
const generatorSection = document.getElementById('generatorSection');
const meditationScript = document.getElementById('meditationScript');
const generateAudioBtn = document.getElementById('generateAudioBtn');
const cancelGenerationBtn = document.getElementById('cancelGenerationBtn');
const generationStatus = document.getElementById('generationStatus');

let currentVoiceSource = null;

// Try to load API key from localStorage
if (localStorage.getItem('elevenlabs_api_key')) {
    elevenLabsApiKeyInput.value = localStorage.getItem('elevenlabs_api_key');
}

fetchVoicesBtn.addEventListener('click', async () => {
    const apiKey = elevenLabsApiKeyInput.value.trim();
    if(!apiKey) {
        alert('Veuillez entrer votre Clé API ElevenLabs.');
        return;
    }
    localStorage.setItem('elevenlabs_api_key', apiKey);
    fetchVoicesBtn.innerText = 'Chargement...';

    try {
        const res = await fetch('https://api.elevenlabs.io/v1/voices', {
            headers: { 'xi-api-key': apiKey },
            cache: 'no-store'
        });
        
        if(!res.ok) {
            const errText = await res.text();
            throw new Error(`Erreur API (${res.status}) : ${errText}`);
        }
        
        const data = await res.json();
        
        voiceSelect.innerHTML = '<option value="">Sélectionnez votre voix...</option>';
        data.voices.forEach(voice => {
            const opt = document.createElement('option');
            opt.value = voice.voice_id;
            opt.innerText = voice.name;
            voiceSelect.appendChild(opt);
        });
        
        voiceSelect.classList.remove('hidden');
        generatorSection.classList.remove('hidden');
        fetchVoicesBtn.innerText = 'Voix Chargées ✓';
        fetchVoicesBtn.classList.replace('secondary', 'success');
        
    } catch(err) {
        alert(err.message);
        fetchVoicesBtn.innerText = 'Charger mes Voix';
    }
});

generateAudioBtn.addEventListener('click', async () => {
    const apiKey = elevenLabsApiKeyInput.value.trim();
    const voiceId = voiceSelect.value;
    const text = meditationScript.value.trim();

    if(!apiKey || !voiceId || !text) {
        alert('Veuillez sélectionner une voix et écrire un texte.');
        return;
    }

    generateAudioBtn.classList.add('hidden');
    cancelGenerationBtn.classList.remove('hidden');
    generationStatus.classList.remove('hidden');
    generationStatus.innerText = 'Génération de la voix en cours (cela peut prendre quelques minutes)...';

    // 🔴 IMPORTANT: Create and resume AudioContext BEFORE any await 
    // to bypass browser autoplay restrictions
    if(!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        streamDestination = audioCtx.createMediaStreamDestination();
    }
    if(audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    try {
        // 1. Fetch Audio from ElevenLabs
        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.7
                }
            })
        });

        if(!res.ok) throw new Error("Erreur lors de la génération avec ElevenLabs");
        
        const arrayBuffer = await res.arrayBuffer();

        // Decode audio
        generationStatus.innerText = 'Décodage de l\'audio...';
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        // Mix down
        generationStatus.innerText = 'Enregistrement final en cours (Laissez la page ouverte)...';
        
        // Start MediaRecorder on the streamDestination
        const mixedStream = new MediaStream();
        streamDestination.stream.getTracks().forEach(track => mixedStream.addTrack(track));
        mediaRecorder = new MediaRecorder(mixedStream);
        audioChunks = [];
        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) audioChunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayback.src = audioUrl;
            downloadLink.href = audioUrl;
            resultPanel.classList.remove('hidden');
            generationStatus.classList.add('hidden');
            generateAudioBtn.disabled = false;
        };
        
        mediaRecorder.start();

        // Start Ambient Music
        if(!isAmbientPlaying) startAmbient();

        // Play ElevenLabs voice
        currentVoiceSource = audioCtx.createBufferSource();
        currentVoiceSource.buffer = audioBuffer;
        
        // Connect voice to destination (speakers) and to recording stream
        currentVoiceSource.connect(audioCtx.destination);
        currentVoiceSource.connect(streamDestination);
        
        currentVoiceSource.start();

        // When voice finishes, stop everything
        currentVoiceSource.onended = () => {
            if(mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop();
            stopAmbient();
            currentVoiceSource.disconnect();
            
            generateAudioBtn.classList.remove('hidden');
            cancelGenerationBtn.classList.add('hidden');
            generateAudioBtn.disabled = false;
        };
        
    } catch(err) {
        alert(err.message);
        generateAudioBtn.classList.remove('hidden');
        cancelGenerationBtn.classList.add('hidden');
        generateAudioBtn.disabled = false;
        generationStatus.classList.add('hidden');
    }
});

// Event listener for the new cancel button
cancelGenerationBtn.addEventListener('click', () => {
    if (currentVoiceSource) {
        currentVoiceSource.stop();
        currentVoiceSource.disconnect();
    }
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
    stopAmbient();
    
    generateAudioBtn.classList.remove('hidden');
    cancelGenerationBtn.classList.add('hidden');
    generateAudioBtn.disabled = false;
    generationStatus.classList.add('hidden');
    generationStatus.innerText = 'Génération annulée.';
});
