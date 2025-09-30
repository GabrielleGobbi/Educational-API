# Fundamentos do TypeScript

TypeScript é uma linguagem de programação desenvolvida pela Microsoft que estende o JavaScript, adicionando recursos avançados de tipagem e programação orientada a objetos (POO). É projetado para ajudar as pessoas desenvolvedoras a escrever código mais robusto e menos propenso a erros.

## O que é TypeScript?

TypeScript funciona como um **superconjunto do JavaScript**. Isso significa que qualquer código JavaScript válido também é válido em TypeScript, mas TypeScript oferece funcionalidades adicionais para aprimorar o desenvolvimento.

### Tipagem Estática

Um dos principais recursos do TypeScript é a **tipagem estática**. Ao contrário do JavaScript, que é uma linguagem dinamicamente tipada (onde os tipos de dados das variáveis são determinados em tempo de execução), o TypeScript permite que as desenvolvedoras especifiquem os tipos de variáveis, parâmetros de funções e valores de retorno.

```typescript
// JavaScript (tipagem dinâmica)
let nome = "João";
nome = 42; // Isso é válido em JavaScript

// TypeScript (tipagem estática)
let nome: string = "João";
nome = 42; // Erro! Tipo 'number' não pode ser atribuído ao tipo 'string'
```

### Detecção de Erros em Tempo de Compilação

O TypeScript verifica o código durante a compilação, identificando erros antes mesmo do código ser executado. Isso resulta em:

- **Menos bugs em produção**
- **Desenvolvimento mais confiável**
- **Refatoração mais segura**

## Configuração do Ambiente

Para começar a usar TypeScript, você precisa instalá-lo em seu sistema:

```bash
# Instalação global
npm install -g typescript

# Verificar a instalação
tsc --version
```

### Criando seu Primeiro Projeto

1. **Crie um diretório para o projeto:**
```bash
mkdir meu-projeto-typescript
cd meu-projeto-typescript
```

2. **Inicialize o projeto:**
```bash
npm init -y
npm install typescript --save-dev
```

3. **Crie o arquivo de configuração:**
```bash
npx tsc --init
```

4. **Crie seu primeiro arquivo TypeScript:**
```typescript
// app.ts
function saudar(nome: string): string {
    return `Olá, ${nome}!`;
}

const mensagem = saudar("Mundo");
console.log(mensagem);
```

5. **Compile e execute:**
```bash
npx tsc app.ts
node app.js
```

## Tipos Básicos

TypeScript oferece vários tipos básicos que você pode usar:

### Tipos Primitivos

```typescript
// String
let nome: string = "João";

// Number
let idade: number = 30;
let preco: number = 19.99;

// Boolean
let ativo: boolean = true;

// Array
let numeros: number[] = [1, 2, 3, 4, 5];
let nomes: string[] = ["Ana", "Bruno", "Carlos"];

// Tuple
let pessoa: [string, number] = ["João", 30];
```

### Tipos Especiais

```typescript
// Any (evite usar quando possível)
let qualquerCoisa: any = "texto";
qualquerCoisa = 42;
qualquerCoisa = true;

// Void (para funções que não retornam valor)
function log(mensagem: string): void {
    console.log(mensagem);
}

// Null e Undefined
let valorNulo: null = null;
let valorIndefinido: undefined = undefined;
```

## Vantagens do TypeScript

### 1. Melhor Experiência de Desenvolvimento

- **Autocompletar inteligente**
- **Navegação de código**
- **Refatoração segura**
- **Documentação inline**

### 2. Detecção Precoce de Erros

```typescript
interface Usuario {
    nome: string;
    email: string;
    idade: number;
}

function criarUsuario(dados: Usuario): Usuario {
    // TypeScript verifica se todos os campos obrigatórios estão presentes
    return dados;
}

// Erro detectado em tempo de compilação
const usuario = criarUsuario({
    nome: "João",
    // email: "joao@email.com", // Campo obrigatório ausente!
    idade: 30
});
```

### 3. Escalabilidade

TypeScript é especialmente valioso em projetos grandes, onde:

- **Múltiplas pessoas desenvolvem**
- **Código é mantido por longos períodos**
- **Refatorações são frequentes**
- **Integração entre módulos é complexa**

## Próximos Passos

Agora que você entende os fundamentos do TypeScript, está pronto para:

1. **Explorar tipos avançados** (interfaces, unions, generics)
2. **Aprender sobre classes e herança**
3. **Integrar com frameworks** (React, Angular, Vue)
4. **Configurar ferramentas de build** (Webpack, Vite)

O TypeScript é uma ferramenta poderosa que pode transformar significativamente sua experiência de desenvolvimento JavaScript, proporcionando maior confiança e produtividade em seus projetos.
