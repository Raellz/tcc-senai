<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css">
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
    <title>Página Principal</title>
</head>
<body>

<?php   
    session_start();

    // Verifica se o usuário está logado
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        // Se não estiver logado, redireciona para a página de login
        header("Location: ../backend/login.php");
        exit;
    }
?>

    <!-- Barra lateral fixa -->
    <aside class="sidebar">
        <ul>
            <!-- Links para outras páginas ou funcionalidades -->
            <li><a href="frontend/index.php" title="Página Inicial"><img src="../Icons/home.png" alt="Página Inicial"></a></li>
            <li><a href="../pesquisa-func.html" title="Consultar Status"><img src="../Icons/status.png" alt="Consultar Status"></a></li>
        </ul>
        <!-- Link para sair ou desconectar -->
        <a href="#" title="Sair" class="sidebar-footer-link"><img src="../Icons/sair-login.png" alt="Sair"></a>
    </aside>

    <!-- Conteúdo principal -->
    <div class="main-content">
        <!-- Header -->
        <header>
            <!-- Logotipo da empresa ou aplicação -->
            <img src="../imagens/logo-1.png" alt="Logo" class="logo" style="width: 170px; height: 170px">
            <!-- Informações do usuário -->
            <div class="user-info">
                <span style="padding-right: 5px; font-weight: bold;">Olá, [Funcionário]</span>
                <img src="../imagens/usuario.png" alt="Foto do Usuário" class="user-photo">
                
            </div>
        </header>

        <!-- Conteúdo principal -->
        <main>
            <!-- Seção de promoção de funcionário -->
            <section class="promotion-post">
                <div class="promotion-image-wrapper">
                    <img src="../imagens/post-funcionario.jpg" alt="Funcionário Promovido" class="promotion-image">
                    <div class="promotion-text">
                        <h2 style="text-align: center; color: black;">Parabéns ao funcionário promovido!</h2>
                        <h3>Pedro Henrique</h3>
                        <p><strong>Cargo anterior:</strong> Faxineiro</p>
                        <p><strong>Novo Cargo:</strong> CEO</p>
                        <p>Estamos muito felizes em anunciar que <strong>Pedro Henrique</strong> foi promovido a <strong>CEO</strong>. Sua dedicação e esforço têm sido excepcionais, e esta promoção é um reflexo do seu trabalho árduo. Parabéns!</p>
                    </div>
                </div>
            </section>

            <!-- Seção do calendário -->
            <section class="calendar-post">
                <div class="calendar-header">
                    <button id="prev-month">&lt;</button>
                    <h2 id="calendar-title">Agosto 2024</h2>
                    <button id="next-month">&gt;</button>
                </div>
                <div class="calendar" id="calendar"></div>
            </section>
        </main>
    </div>

    <script>
        // Função para gerar o calendário
        function generateCalendar(year, month) {
            const calendar = document.getElementById('calendar');
            const title = document.getElementById('calendar-title');
            calendar.innerHTML = '';

            const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDay = new Date(year, month, 1).getDay();

            // Adiciona cabeçalho dos dias da semana
            const headerRow = document.createElement('tr');
            daysOfWeek.forEach(day => {
                const th = document.createElement('th');
                th.textContent = day;
                headerRow.appendChild(th);
            });
            const table = document.createElement('table');
            table.appendChild(headerRow);

            let row = document.createElement('tr');
            // Preenche os dias em branco antes do início do mês
            for (let i = 0; i < firstDay; i++) {
                const td = document.createElement('td');
                row.appendChild(td);
            }

            // Preenche os dias do mês
            for (let day = 1; day <= daysInMonth; day++) {
                const td = document.createElement('td');
                td.textContent = day;
                // Adiciona um evento de exemplo
                if (day === 5 || day === 15) {
                    const event = document.createElement('div');
                    event.classList.add('event');
                    event.textContent = day === 5 ? 'Reunião' : 'Dia de Pagamento';
                    td.appendChild(event);
                }
                row.appendChild(td);

                // Adiciona nova linha se necessário
                if ((firstDay + day) % 7 === 0) {
                    table.appendChild(row);
                    row = document.createElement('tr');
                }
            }

            // Adiciona a última linha se estiver incompleta
            if (row.children.length > 0) {
                table.appendChild(row);
            }

            calendar.appendChild(table);
            title.textContent = `${months[month]} ${year}`;
        }

        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth();

        function updateCalendar() {
            generateCalendar(currentYear, currentMonth);
        }

        document.getElementById('prev-month').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });

        // Inicializa o calendário
        updateCalendar();
    </script>

        <footer class="footer">
            <div class="footer-content">
                <p>&copy; Todos os direitos reservados ao CoDiray - program e à AGRO INDÚSTRIA POLPA DE FRUTA LTDA</p>
                
            </div>
        </footer>
</body>
</html>
