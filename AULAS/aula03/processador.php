<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados enviados pelo formulário
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    
    // Redireciona para a página de resultado
    header("Location: resultado.html"); //aqui colocar / talves?
    exit; // Certifique-se de sair do script para evitar qualquer processamento adicional
} else {
    echo "Formulário não foi enviado.";
}
?>