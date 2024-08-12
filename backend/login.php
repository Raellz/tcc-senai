<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilos/style.css">
    <link rel="stylesheet" href="estilos/media-query.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <title>Polpa de Fruta</title>
</head>
<body>
    <div id="logo">
        <img src="imagens/logo-polpa.png" alt="Logo da Marca Polpa de Fruta">
    </div>
    <main id="card">
        <form action="../backend/login.php" method="post">
            <div id="login">
                <p id="welcome">Bem vindo!</p>
                <input class="inputLogin" id="numero" name="matricula" oninput="validarNumero(this)" type="text" maxlength="12" placeholder="Seu código de matrícula"> 
                <!-- Caixa de entrada para Matrícula !-->
            
                <input class="inputLogin" id="password" name="password" type="password" placeholder="Digite sua senha">
                <!-- Caixa de entrada para Senha !-->
                <input id="entrar" type="submit" value="Entrar">
                <!-- Botão de Entrar!-->
                <p class="forgot"><a href="esqueceu-senha.html" class="forgot">Esqueci a senha</a></p>
                <!-- Redirecionamento para área de 'esqueceu a senha' !-->
            </div>
        </form>
    </main>
</body>
</html>

<script>
    function validarNumero(input) {
        input.value = input.value.replace(/\D/g, '');
    }
</script>


<?php 
    include 'conexao.inc';
    // Inclusão da parte de conexão com o banco de dados

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Receber e sanitizar os dados
        $matricula = $conn->real_escape_string($_POST['matricula']);
        $senha = $conn->real_escape_string($_POST['password']);

        // Buscar o usuário no banco de dados
        $sql = "SELECT * FROM funcionarios WHERE matricula = '$matricula'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Verificar a senha
            $row = $result->fetch_assoc();
            if ($senha == $row['senha']) {
                // Login realizado com sucesso
                session_start();
                $_SESSION['nome'] = $row['nome'];
                $_SESSION['matricula'] = $row['matricula'];
                $_SESSION['loggedin'] = true;
                $_SESSION['id_usuario'] = $row['id'];
                
                // Redirecionar para a página de usuário ou dashboard
                header("Location: ../frontend/index.php");
                exit();
            } else {
                // Senha incorreta
                echo "Senha incorreta.";
            }
        } else {
            // Usuário não encontrado
            echo "Usuário não encontrado.";
        }
    }

    // Fecha a conexão
    $conn->close();
?>