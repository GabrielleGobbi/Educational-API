# Exercício: Criando Tipos Básicos

## 🎯 Objetivo

Praticar a declaração e uso de tipos básicos em TypeScript, incluindo strings, numbers, booleans e arrays.

## 📋 Instruções

Crie um arquivo `tipos-basicos.ts` e implemente as seguintes variáveis com os tipos corretos:

### Parte 1: Tipos Primitivos

1. **Declare uma variável `nomeCompleto`** do tipo `string` com seu nome completo
2. **Declare uma variável `idade`** do tipo `number` com sua idade
3. **Declare uma variável `estudante`** do tipo `boolean` indicando se você é estudante
4. **Declare uma variável `salario`** do tipo `number` com um valor decimal

### Parte 2: Arrays

5. **Declare um array `hobbies`** do tipo `string[]` com pelo menos 3 hobbies
6. **Declare um array `notas`** do tipo `number[]` com 5 notas de 0 a 10
7. **Declare um array `presencas`** do tipo `boolean[]` com 7 valores (representando uma semana)

### Parte 3: Tuple

8. **Declare uma tuple `coordenadas`** do tipo `[number, number]` representando latitude e longitude
9. **Declare uma tuple `pessoa`** do tipo `[string, number, boolean]` com nome, idade e se é ativo

### Parte 4: Função

10. **Crie uma função `apresentar`** que:
    - Receba parâmetros: `nome: string`, `idade: number`, `estudante: boolean`
    - Retorne uma `string` com uma apresentação da pessoa
    - Exemplo: "Olá, eu sou João, tenho 25 anos e sou estudante."

## ✅ Critérios de Avaliação

- [ ] Todas as variáveis estão declaradas com tipos corretos
- [ ] Arrays contêm os tipos especificados
- [ ] Tuples seguem a ordem correta dos tipos
- [ ] Função tem parâmetros e retorno tipados
- [ ] Código compila sem erros
- [ ] Valores fazem sentido contextualmente

## 🚀 Desafio Extra

Crie uma função `calcularMedia` que:
- Receba um array de números (notas)
- Retorne a média das notas
- Use tipos explícitos para parâmetros e retorno

## 💡 Dicas

- Use `tsc tipos-basicos.ts` para compilar e verificar erros
- O TypeScript pode inferir tipos, mas é boa prática declará-los explicitamente
- Arrays podem ser declarados como `tipo[]` ou `Array<tipo>`
- Tuples têm tamanho fixo e tipos específicos para cada posição
