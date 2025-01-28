<?php

require_once 'class/Pessoa.php';

// Criando instâncias de Pessoa
$pessoa1 = new Pessoa('João', 25, 'joao@example.com');
$pessoa2 = Pessoa::criarAPartirDeArray(['nome' => 'Maria', 'idade' => 20, 'email' => 'maria@example.com']);

// Apresentando as pessoas
echo $pessoa1->apresentar() . "\n";
echo $pessoa2->apresentar() . "\n";

// Verificando maioridade
echo ($pessoa1->isMaiorDeIdade() ? "{$pessoa1->getNome()} é maior de idade." : "{$pessoa1->getNome()} é menor de idade.") . "\n";

// Comparando idades
echo $pessoa1->compararCom($pessoa2) . "\n";

// Modificando dados de uma pessoa
$pessoa1->setNome('Carlos');
$pessoa1->setIdade(30);
$pessoa1->setEmail('carlos@example.com');

// Apresentando novamente após modificações
echo $pessoa1->apresentar() . "\n";
