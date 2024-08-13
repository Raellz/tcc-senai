const employees = [
    { name: "Ana Souza", photo: "imagens/ana-souza.jpg", hireDate: "01/02/2020", position: "Operadora de Máquina", courses: [{name: "Segurança do Trabalho", date: "07/01/2023", status: "Concluído"}, {name: "Operação de Máquinas Agrícolas", date: "24/07/2019", status: "Vencido"}] },
    { name: "Bruno Silva", photo: "imagens/bruno-silva.jpg", hireDate: "15/03/2019", position: "Técnico em Manutenção", courses: [{name: "Manutenção de Equipamentos", date: "15/04/2023", status: "Concluído"}, {name: "Segurança no Trabalho", date: "30/02/2014", status: "Vencido"}, {name: "Primeiro Socorros", date: "31/09/2023", status: "Concluído"}]  },
    { name: "Carlos Oliveira", photo: "imagens/carlos-oliveira.jpg", hireDate: "20/04/2018", position: "Gerente", courses: [{name: "Curso E", date: "20/01/2023", status: "Concluído"}, {name: "Curso F", date: "20/05/2023", status: "Pendente"}] },
    { name: "Débora Lima", photo: "imagens/debora-lima.jpg", hireDate: "10/05/2021", position: "Analista", courses: [{name: "Curso G", date: "10/02/2023", status: "Concluído"}, {name: "Curso H", date: "10/06/2023", status: "Pendente"}] },
    { name: "Eduardo Costa", photo: "imagens/eduardo-costa.jpg", hireDate: "25/06/2022", position: "Assistente", courses: [{name: "Curso I", date: "25/03/2023", status: "Concluído"}, {name: "Curso J", date: "25/07/2023", status: "Pendente"}] },
    { name: "Maria Gabriela", photo: "imagens/maria-gabriela.jpg", hireDate: "30/07/2023", position: "Coordenadora", courses: [{name: "Curso K", date: "30/01/2024", status: "Concluído"}, {name: "Curso L", date: "30/09/2023", status: "Pendente"}] }
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

// Adiciona um ouvinte de evento ao campo de entrada de pesquisa (searchInput)
// Esse ouvinte detecta quando uma tecla é pressionada enquanto o campo está em foco
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    
    // Verifica se a tecla pressionada é a tecla "Enter"
    // A propriedade 'key' do evento armazena o valor da tecla pressionada
    if (event.key === 'Enter') {
        
        // Se a tecla "Enter" for pressionada, chama a função searchEmployee()
        // Isso realiza a pesquisa sem a necessidade de clicar no botão de pesquisar
        searchEmployee();
    }
});

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
            <img src="${employee.photo}" alt="${employee.name}" style="object-fit: cover;">
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
        const statusClass = course.status === "Concluído" ? 'status-concluido' : 'status-pendente';
        coursesHTML += `<tr><td>${course.name}</td><td>${course.date}</td><td class="${statusClass}">${course.status}</td></tr>`;
    });
    coursesHTML += '</table>';

    // Estrutura HTML da modal
    modalContent.innerHTML = `
        <img src="${employee.photo}" alt="${employee.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
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
