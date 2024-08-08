const employees = [
    { name: "Ana Souza", photo: "imagens/ana-souza.jpg", hireDate: "01/02/2020", position: "Desenvolvedora", courses: [{name: "Curso A", date: "01/01/2023", status: "Concluído"}, {name: "Curso B", date: "01/03/2023", status: "Pendente"}] },
    { name: "Bruno Silva", photo: "imagens/bruno-silva.jpg", hireDate: "15/03/2019", position: "Designer", courses: [{name: "Curso C", date: "15/02/2023", status: "Concluído"}, {name: "Curso D", date: "15/04/2023", status: "Pendente"}] },
    { name: "Carlos Oliveira", photo: "imagens/carlos-oliveira.jpg", hireDate: "20/04/2018", position: "Gerente", courses: [{name: "Curso E", date: "20/01/2023", status: "Concluído"}, {name: "Curso F", date: "20/05/2023", status: "Pendente"}] },
    { name: "Débora Lima", photo: "imagens/debora-lima.jpg", hireDate: "10/05/2021", position: "Analista", courses: [{name: "Curso G", date: "10/02/2023", status: "Concluído"}, {name: "Curso H", date: "10/06/2023", status: "Pendente"}] },
    { name: "Eduardo Costa", photo: "imagens/eduardo-costa.jpg", hireDate: "25/06/2022", position: "Assistente", courses: [{name: "Curso I", date: "25/03/2023", status: "Concluído"}, {name: "Curso J", date: "25/07/2023", status: "Pendente"}] },
    { name: "Maria Gabriela", photo: "imagens/maria-gabriela.jpg", hireDate: "30/07/2023", position: "Coordenadora", courses: [{name: "Curso K", date: "30/01/2024", status: "Concluído"}, {name: "Curso L", date: "30/09/2023", status: "Pendente"}] }
];

function showSuggestions(value) {
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';

    if (value.length === 0) return;

    const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(value.toLowerCase()));

    filteredEmployees.forEach(employee => {
        const div = document.createElement('div');
        div.textContent = employee.name;
        div.onclick = () => {
            document.getElementById('searchInput').value = employee.name;
            suggestionsBox.innerHTML = '';
        };
        suggestionsBox.appendChild(div);
    });
}

function searchEmployee() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsBox = document.getElementById('results');
    resultsBox.innerHTML = '';

    if (query.length === 0) return;

    const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(query));

    filteredEmployees.forEach(employee => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.onclick = () => showModal(employee);

        resultCard.innerHTML = `
            <img src="${employee.photo}" alt="${employee.name}">
            <div class="details">
                <p class="name">${employee.name}</p>
                <p>Data de Admissão: ${employee.hireDate}</p>
                <p>Cargo: ${employee.position}</p>
            </div>
        `;

        resultsBox.appendChild(resultCard);
    });
}

function showModal(employee) {
    const modal = document.getElementById('employeeModal');
    const modalContent = modal.querySelector('.modal-content');

    let coursesHTML = '<table><tr><th>Curso</th><th>Data</th><th>Status</th></tr>';
    employee.courses.forEach(course => {
        coursesHTML += `<tr><td>${course.name}</td><td>${course.date}</td><td>${course.status}</td></tr>`;
    });
    coursesHTML += '</table>';

    modalContent.innerHTML = `
        <img src="${employee.photo}" alt="${employee.name}" style="width: 100px; height: 100px; border-radius: 50%;">
        <h2>${employee.name}</h2>
        <p>Função: ${employee.position}</p>
        <h3>Cursos de Treinamento:</h3>
        ${coursesHTML}
        <button onclick="closeModal()">Fechar</button>
    `;

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('employeeModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function updateLastUpdated() {
    const lastUpdatedDiv = document.getElementById('lastUpdated');
    const now = new Date();
    const formattedDate = now.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    lastUpdatedDiv.textContent = `Última atualização: ${formattedDate}`;
}

// Atualiza imediatamente quando a página carrega
updateLastUpdated();

// Atualiza a cada minuto (60.000 milissegundos)
setInterval(updateLastUpdated, 60000);