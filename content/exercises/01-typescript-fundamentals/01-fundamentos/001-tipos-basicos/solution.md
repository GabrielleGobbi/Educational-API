# Solução: Criando Tipos Básicos

## 💡 Solução Completa

```typescript
// tipos-basicos.ts

// Parte 1: Tipos Primitivos
const nomeCompleto: string = "Maria Silva Santos";
const idade: number = 28;
const estudante: boolean = true;
const salario: number = 3500.50;

// Parte 2: Arrays
const hobbies: string[] = ["leitura", "natação", "culinária", "fotografia"];
const notas: number[] = [8.5, 9.0, 7.5, 8.8, 9.2];
const presencas: boolean[] = [true, true, false, true, true, true, false];

// Parte 3: Tuple
const coordenadas: [number, number] = [-23.5505, -46.6333]; // São Paulo
const pessoa: [string, number, boolean] = ["Ana Costa", 32, true];

// Parte 4: Função
function apresentar(nome: string, idade: number, estudante: boolean): string {
    const statusEstudante = estudante ? "sou estudante" : "não sou estudante";
    return `Olá, eu sou ${nome}, tenho ${idade} anos e ${statusEstudante}.`;
}

// Desafio Extra
function calcularMedia(notas: number[]): number {
    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    return soma / notas.length;
}

// Testando as implementações
console.log("=== Informações Pessoais ===");
console.log(`Nome: ${nomeCompleto}`);
console.log(`Idade: ${idade} anos`);
console.log(`Estudante: ${estudante ? "Sim" : "Não"}`);
console.log(`Salário: R$ ${salario.toFixed(2)}`);

console.log("\n=== Arrays ===");
console.log(`Hobbies: ${hobbies.join(", ")}`);
console.log(`Notas: ${notas.join(", ")}`);
console.log(`Presenças da semana: ${presencas.map(p => p ? "✓" : "✗").join(" ")}`);

console.log("\n=== Tuples ===");
console.log(`Coordenadas: Lat ${coordenadas[0]}, Lng ${coordenadas[1]}`);
console.log(`Pessoa: ${pessoa[0]}, ${pessoa[1]} anos, ${pessoa[2] ? "ativo" : "inativo"}`);

console.log("\n=== Funções ===");
console.log(apresentar(nomeCompleto, idade, estudante));
console.log(`Média das notas: ${calcularMedia(notas).toFixed(2)}`);
```

## 📝 Explicação da Solução

### Tipos Primitivos
- **string**: Usado para texto (`nomeCompleto`)
- **number**: Usado para números inteiros e decimais (`idade`, `salario`)
- **boolean**: Usado para valores verdadeiro/falso (`estudante`)

### Arrays
- **string[]**: Array de strings para os hobbies
- **number[]**: Array de números para as notas
- **boolean[]**: Array de booleans para presenças

### Tuples
- **[number, number]**: Tuple com dois números para coordenadas
- **[string, number, boolean]**: Tuple mista para dados de pessoa

### Função com Tipos
```typescript
function apresentar(nome: string, idade: number, estudante: boolean): string
```
- Parâmetros tipados explicitamente
- Tipo de retorno especificado (`: string`)
- Implementação que usa template literals

### Função de Cálculo
```typescript
function calcularMedia(notas: number[]): number
```
- Recebe array de números
- Retorna número (média)
- Usa `reduce` para somar e divide pelo comprimento

## 🎯 Pontos Importantes

1. **Tipagem Explícita**: Mesmo quando o TypeScript pode inferir, declaramos tipos explicitamente
2. **Consistência**: Todos os valores respeitam os tipos declarados
3. **Funcionalidade**: O código não apenas compila, mas também executa corretamente
4. **Boas Práticas**: Uso de `const` para valores que não mudam

## 🚀 Compilação e Execução

```bash
# Compilar
tsc tipos-basicos.ts

# Executar
node tipos-basicos.js
```

## ✅ Verificação

O código deve compilar sem erros e produzir uma saída organizada mostrando todos os valores e cálculos implementados.
