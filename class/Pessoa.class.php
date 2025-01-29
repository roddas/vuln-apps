<?php

class Pessoa
{
    private string $nome;
    private int $idade;
    private string $email;

    // Construtor
    public function __construct(string $nome, int $idade, string $email)
    {
        $this->nome = $nome;
        $this->idade = $idade;
        $this->email = $email;
    }

    // Getter para o nome
    public function getNome()
    {
        return $this->nome;
    }

    // Setter para o nome
    public function setNome(string $nome)
    {
        $this->nome = $nome;
    }

    // Getter para a idade
    public function getIdade()
    {
        return $this->idade;
    }

    // Setter para a idade
    public function setIdade(int $idade): void
    {
        $this->idade = $idade;
    }

    // Getter para o email
    public function getEmail(): string
    {
        return $this->email;
    }

    // Setter para o email
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    // Método para apresentar a pessoa
    public function apresentar(): string
    {
        return "Olá, meu nome é {$this->nome}, tenho {$this->idade} anos e meu email é {$this->email}.";
    }

    // Método para verificar se a pessoa é maior de idade
    public function isMaiorDeIdade(): bool
    {
        return $this->idade >= 18;
    }

    // Método estático para criar uma pessoa a partir de um array
    public static function criarAPartirDeArray(array $dados): Pessoa
    {
        return new Pessoa($dados['nome'], $dados['idade'], $dados['email']);
    }

    // Método para comparar duas pessoas
    public function compararCom(Pessoa $outraPessoa): string
    {
        if ($this->idade > $outraPessoa->getIdade()) {
            return "{$this->nome} é mais velho(a) que {$outraPessoa->getNome()}.";
        } elseif ($this->idade < $outraPessoa->getIdade()) {
            return "{$this->nome} é mais novo(a) que {$outraPessoa->getNome()}.";
        } else {
            return "{$this->nome} e {$outraPessoa->getNome()} têm a mesma idade.";
        }
    }
}
