<?php

class Loja
{
    private string $nome;
    private string $endereco;
    private array $produtos = [];

    // Construtor
    public function __construct(string $nome, string $endereco)
    {
        $this->nome = $nome;
        $this->endereco = $endereco;
    }

    // Getter para o nome
    public function getNome(): string
    {
        return $this->nome;
    }

    // Setter para o nome
    public function setNome(string $nome): void
    {
        $this->nome = $nome;
    }

    // Getter para o endereço
    public function getEndereco(): string
    {
        return $this->endereco;
    }

    // Setter para o endereço
    public function setEndereco(string $endereco): void
    {
        $this->endereco = $endereco;
    }

    // Adicionar um produto
    public function adicionarProduto(string $nomeProduto, float $preco): void
    {
        $this->produtos[] = [
            'nome' => $nomeProduto,
            'preco' => $preco
        ];
    }

    // Remover um produto por nome
    public function removerProduto(string $nomeProduto): bool
    {
        foreach ($this->produtos as $index => $produto) {
            if ($produto['nome'] === $nomeProduto) {
                unset($this->produtos[$index]);
                $this->produtos = array_values($this->produtos); // Reindexa o array
                return true;
            }
        }
        return false;
    }

    // Listar produtos
    public function listarProdutos(): array
    {
        return $this->produtos;
    }

    // Apresentar informações da loja
    public function apresentar(): string
    {
        $info = "Loja: {$this->nome}\nEndereço: {$this->endereco}\nProdutos:\n";
        if (empty($this->produtos)) {
            $info .= "  Nenhum produto cadastrado.\n";
        } else {
            foreach ($this->produtos as $produto) {
                $info .= "  - {$produto['nome']}: R$ " . number_format($produto['preco'], 2, ',', '.') . "\n";
            }
        }
        return $info;
    }
}
