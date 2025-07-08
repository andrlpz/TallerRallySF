const questions = [
    {
        question: "¿Cómo prefieres pasar tu tiempo libre?",
        options: ["🏃‍♂️ Haciendo ejercicio", "📚 Leyendo un libro", "🧑‍🤝‍🧑 Con amigos", "📺 Viendo TV"]
    },
    {
        question: "¿Vacaciones ideales?",
        options: ["⛰️ Aventura en la montaña", "🏖️ Playa relajante", "🏙️ Tour por la ciudad", "🏕️ Cabaña acogedora"]
    },
    {
        question: "¿Cómo te describen tus amigos?",
        options: ["⚡ Energético/a", "🧘 Calmado/a", "😄 Sociable", "😌 Tranquilo/a"]
    },
    {
        question: "¿Qué mascota prefieres?",
        options: ["🐕 Activa y juguetona", "🐈 Tranquila e independiente", "🦜 Sociable y amigable", "🐢 Relajada y fácil"]
    },
    {
        question: "¿Cómo manejas el estrés?",
        options: ["💪 Ejercicio", "🧘‍♂️ Meditación", "🗣️ Hablando con amigos", "🎬 Películas"]
    },
    {
        question: "¿Cuál es tu comida favorita?",
        options: ["🍔 Hamburguesa", "🥗 Ensalada", "🍕 Pizza", "🍣 Sushi"]
    },
    {
        question: "¿Qué clima prefieres?",
        options: ["🌞 Soleado", "🌧️ Lluvioso", "❄️ Frío", "🌬️ Ventoso"]
    },
    {
        question: "¿Qué música te gusta más?",
        options: ["🎸 Rock", "🎹 Clásica", "🎤 Pop", "🎷 Jazz"]
    }
];

const dogTypes = [
    {
        name: "Labrador 🦮",
        desc: "Eres amigable, activo y siempre estás listo para una aventura."
    },
    {
        name: "Chihuahua 🐕‍🦺",
        desc: "Pequeño pero valiente, leal y con mucha personalidad."
    },
    {
        name: "Beagle 🐶",
        desc: "Curioso, sociable y siempre buscando diversión."
    },
    {
        name: "Bulldog 🐾",
        desc: "Relajado, cariñoso y amante de la comodidad."
    }
];

let currentQuestion = 0;
let answers = [];

const mainContainer = document.getElementById("main-container");

function showStartPage() {
    mainContainer.innerHTML = `
        <div style="text-align:center;">
            <h1 style="font-size:2.2em; color:#28a745; margin-bottom:0.2em;">🐾 ¿Qué tipo de perro eres? 🐾</h1>
            <p style="color:#555; margin-bottom:2em;">Descubre tu personalidad perruna con este divertido test.</p>
            <button id="start-btn" style="font-size:1.2em; padding:15px 40px;">Comenzar</button>
        </div>
    `;
    mainContainer.classList.remove('fade-in');
    void mainContainer.offsetWidth; // Reinicia animación
    mainContainer.classList.add('fade-in');
    document.getElementById("start-btn").onclick = () => {
        currentQuestion = 0;
        answers = [];
        showQuestion();
    };
}

function showQuestion() {
    const q = questions[currentQuestion];
    const total = questions.length;
    const progress = Math.round(((currentQuestion) / total) * 100);

    mainContainer.innerHTML = `
        <div style="margin-bottom:1.2em;">
            <div style="font-size:1.1em; color:#218838; font-weight:600; margin-bottom:0.5em;">
                Pregunta ${currentQuestion + 1} de ${total}
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width:${progress}%;"></div>
            </div>
        </div>
        <form id="question-form">
            <div class="question">
                <label>${q.question}</label>
                <select id="answer" required>
                    <option value="" disabled selected>Selecciona una opción</option>
                    ${q.options.map((opt, i) => `<option value="${i}">${opt}</option>`).join("")}
                </select>
            </div>
            <button type="submit">${currentQuestion < questions.length - 1 ? "Siguiente" : "Ver resultado"}</button>
        </form>
    `;
    mainContainer.classList.remove('fade-in');
    void mainContainer.offsetWidth;
    mainContainer.classList.add('fade-in');
    document.getElementById("question-form").onsubmit = function(e) {
        e.preventDefault();
        const selected = document.getElementById("answer").value;
        answers.push(Number(selected));
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    };
}

function showResult() {
    // Calcula los puntos para cada perro
    const dogScores = [0, 0, 0, 0]; // Labrador, Chihuahua, Beagle, Bulldog
    answers.forEach(ans => {
        dogScores[ans]++;
    });

    const total = answers.length;
    const percentages = dogScores.map(score => Math.round((score / total) * 100));

    // Encuentra el perro con mayor porcentaje
    const maxIndex = percentages.indexOf(Math.max(...percentages));
    const dog = dogTypes[maxIndex];

    // Muestra el resultado principal y los porcentajes
    mainContainer.innerHTML = `
        <div class="result">
            <h2 style="font-size:2em; color:#28a745;">${dog.name}</h2>
            <p style="font-size:1.2em; margin:1em 0 2em 0;">${dog.desc}</p>
            <div style="margin: 2em 0 1.5em 0;">
                <h3 style="color:#218838; margin-bottom:1em;">Tu porcentaje de coincidencia:</h3>
                ${dogTypes.map((d, i) => `
                    <div style="margin-bottom: 1em;">
                        <span style="font-weight:600;">${d.name}</span>
                        <div class="progress-bar-bg" style="height:18px;">
                            <div class="progress-bar-fill" style="width:${percentages[i]}%; height:100%;"></div>
                        </div>
                        <span style="color:#28a745; font-weight:700;">${percentages[i]}%</span>
                    </div>
                `).join('')}
            </div>
            <button id="restart-btn" style="font-size:1.1em; padding:12px 30px;">Volver a empezar 🔄</button>
        </div>
    `;
    mainContainer.classList.remove('fade-in');
    void mainContainer.offsetWidth;
    mainContainer.classList.add('fade-in');
    document.getElementById("restart-btn").onclick = showStartPage;
}

showStartPage();