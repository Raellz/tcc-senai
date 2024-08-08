<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/login.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <title>Login!</title>
</head>
<body>
    <div class="container">
        <header>
            <h1>Login</h1>
        </header>
        <main>
            <form action="../frontend/index.php" method="post">
            <input type="text" name="matricula" id="matricula" placeholder="Matrícula" required>
                <input type="password" id="passoword" name="password" placeholder="Senha" required>
                <button type="submit">Entrar</button>
            </form>
        </main>
            <a href="esqueceu-senha.html" id="esqueceu-senha">Esqueci minha senha!</a>
    </div>
</body>
</html>


<?php 

include 'conexao.inc';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receber e sanitizar os dados
    $matricula = $conn->real_escape_string($_POST['matricula']);
    $senha = $conn->real_escape_string($_POST['password']);
    
    // Buscar o usuário no banco de dados
    $sql = "SELECT * FROM funcionarios WHERE matricula = '$matricula'";
    $result = $conn->query($sql);
    $slq2 = "SELECT * FROM funcionarios WHERE id = '$id'";

    if ($result->num_rows > 0) {
        // Verificar a senha
        $row = $result->fetch_assoc();

        if ($senha === $row['senha']) {
            // Login realizado com sucesso
            
            // Inicia a sessão e armazena as informações do usuário
            session_start();
            $_SESSION['nome'] = $row['nome'];
            $_SESSION['matricula'] = $row['matricla'];
            $_SESSION['loggedin'] = true; // Define a variável de sessão como true
            $_SESSION['id_usuario'] = $row['id']; // Armazena o ID do usuário na sessão
            
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