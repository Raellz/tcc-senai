const employees = [
    // Array contendo os dados dos funcionários, incluindo nome, foto, data de admissão, cargo e cursos
    { name: "Ana Souza", photo: "imagens/ana-souza.jpg", hireDate: "01/02/2020", position: "Desenvolvedora", courses: [{name: "Curso A", date: "01/01/2023", status: "Concluído"}, {name: "Curso B", date: "01/03/2023", status: "Pendente"}] },
    // ... outros funcionários
];

let lastUpdateTime = ''; // Variável para armazenar o horário da última atualização

// Função para mostrar sugestões de nomes enquanto o usuário digita
function showSuggestions(value) {
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';

    // Se o campo de pesquisa estiver vazio, a função retorna
    if (value.length === 0) return;

    // Filtra os funcionários cujo nome inclui o valor digitado pelo usuário
    const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(value.toLowerCase()));

    // Cria uma lista de sugestões baseadas nos resultados filtrados
    filteredEmployees.forEach(employee => {
        const div = document.createElement('div');
        div.textContent = employee.name;
        div.onclick = () => {
            document.getElementById('searchInput').value = employee.name;
            suggestionsBox.innerHTML = ''; // Limpa as sugestões quando um nome é selecionado
        };
        suggestionsBox.appendChild(div);
    });
}

// Função para pesquisar um funcionário com base na entrada do usuário
function searchEmployee() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsBox = document.getElementById('results');
    resultsBox.innerHTML = '';

    // Se a consulta estiver vazia, a função retorna
    if (query.length === 0) return;

    // Filtra os funcionários cujo nome inclui a consulta
    const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(query));

    // Cria cartões de resultados para cada funcionário filtrado
    filteredEmployees.forEach(employee => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.onclick = () => showModal(employee); // Abre a modal ao clicar em um cartão

        // Estrutura HTML do cartão de resultado
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

// Função para exibir a modal com detalhes de um funcionário
function showModal(employee) {
    const modal = document.getElementById('employeeModal');
    const modalContent = modal.querySelector('.modal-content');

    // Gera a tabela de cursos do funcionário
    let coursesHTML = '<table><tr><th>Curso</th><th>Data</th><th>Status</th></tr>';
    employee.courses.forEach(course => {
        coursesHTML += `<tr><td>${course.name}</td><td>${course.date}</td><td>${course.status}</td></tr>`;
    });
    coursesHTML += '</table>';

    // Estrutura HTML da modal
    modalContent.innerHTML = `
        <img src="${employee.photo}" alt="${employee.name}" style="width: 100px; height: 100px; border-radius: 50%;">
        <h2>${employee.name}</h2>
        <p>Função: ${employee.position}</p>
        <h3>Cursos de Treinamento:</h3>
        ${coursesHTML}
        <button onclick="closeModal()">Fechar</button>
    `;

    modal.style.display = 'block'; // Exibe a modal
}

// Função para fechar a modal
function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
}

// Função para fechar a modal quando o usuário clica fora dela
window.onclick = function(event) {
    const modal = document.getElementById('employeeModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Função para atualizar a data e hora da última sincronização
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

// Atualiza a data e hora imediatamente quando a página carrega
updateLastUpdated();

// Evento para atualizar a data e hora ao clicar no botão "Sincronizar Agora!"
document.getElementById('showLastUpdatedBtn').addEventListener('click', updateLastUpdated);

// Atualiza a data e hora automaticamente a cada minuto (60.000 milissegundos)
setInterval(updateLastUpdated, 60000);
