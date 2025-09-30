# Guia de Configuração

## 🚀 Configuração Inicial

### 1. Criar Repositório no GitHub

1. Crie um novo repositório no GitHub
2. Clone este protótipo para o repositório
3. Faça o primeiro commit e push

```bash
git clone <url-do-seu-repositorio>
cd <nome-do-repositorio>

# Copie todos os arquivos do protótipo para aqui
# ...

git add .
git commit -m "feat: configuração inicial da API educacional"
git push origin main
```

### 2. Configurar GitHub Pages

1. Vá para **Settings** → **Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**
3. Salve as configurações

### 3. Configurar Permissões do GitHub Actions

1. Vá para **Settings** → **Actions** → **General**
2. Em **Workflow permissions**, selecione **Read and write permissions**
3. Marque **Allow GitHub Actions to create and approve pull requests**
4. Salve as configurações

### 4. Instalar Dependências Localmente (Opcional)

Para desenvolvimento local:

```bash
npm install
```

## 📝 Adicionando Conteúdo

### Estrutura de Pastas

```
content/
├── themes/
│   └── 01-nome-do-tema/
│       ├── metadata.md
│       └── description.md
├── topics/
│   └── 01-nome-do-tema/
│       └── 01-nome-do-topico/
│           ├── metadata.md
│           └── content.md
├── exercises/
│   └── 01-nome-do-tema/
│       └── 01-nome-do-topico/
│           └── 001-nome-do-exercicio/
│               ├── metadata.md
│               ├── instructions.md
│               └── solution.md
└── videos/
    └── 01-nome-do-tema/
        └── 01-nome-do-topico/
            └── 001-nome-do-video/
                ├── metadata.md
                └── transcript.md
```

### Convenções de Nomenclatura

- **Prefixos numéricos:** Use `01-`, `02-`, etc. para controlar a ordem
- **Slugs:** Use kebab-case (palavras separadas por hífen)
- **Consistência:** Mantenha os slugs consistentes entre metadados e pastas

### Exemplo de Metadados

#### Tema (`themes/01-react-basics/metadata.md`)
```yaml
---
title: "React: Conceitos Básicos"
slug: "react-basics"
cardDescription: "Aprenda os fundamentos do React, a biblioteca JavaScript mais popular para construir interfaces de usuário."
category: ["Frontend"]
sequence: 2
image: "/assets/images/themes/react.png"
duration: "6 horas"
difficulty: "intermediate"
created: "2025-09-23"
updated: "2025-09-23"
---
```

#### Tópico (`topics/01-react-basics/01-componentes/metadata.md`)
```yaml
---
title: "Componentes"
slug: "componentes"
cardDescription: "Entenda como criar e usar componentes React para construir interfaces modulares e reutilizáveis."
theme: "react-basics"
sequence: 1
duration: "120 minutos"
difficulty: "intermediate"
prerequisites: ["javascript-es6", "html-css"]
learning_objectives:
  - "Criar componentes funcionais"
  - "Usar props para passar dados"
  - "Entender o conceito de composição"
---
```

## 🔄 Fluxo de Trabalho

### Desenvolvimento Local

1. **Adicione conteúdo** na pasta `content/`
2. **Gere IDs únicos:**
   ```bash
   npm run generate-ids
   ```
3. **Gere a API:**
   ```bash
   npm run generate-api
   ```
4. **Verifique os resultados** na pasta `api/`

### Deploy Automático

1. **Faça commit e push:**
   ```bash
   git add .
   git commit -m "feat: adicionar novo conteúdo"
   git push
   ```

2. **GitHub Actions automaticamente:**
   - Gera IDs únicos para novo conteúdo
   - Atualiza a API
   - Faz deploy no GitHub Pages

3. **API disponível em:**
   ```
   https://seu-usuario.github.io/seu-repositorio/api/
   ```

## 🛠️ Scripts Disponíveis

- `npm run generate-ids` - Gera IDs únicos para conteúdo sem ID
- `npm run generate-api` - Gera toda a estrutura da API
- `npm run build` - Executa ambos os scripts acima
- `npm run dev` - Build + mostra localização da API

## 🔍 Verificação

### Testando Localmente

Após executar `npm run build`, verifique:

1. **IDs gerados:** Todos os `metadata.md` devem ter um campo `id`
2. **API gerada:** Pasta `api/` deve conter estrutura completa
3. **Estrutura correta:** Verifique se os endpoints estão sendo criados

### Testando em Produção

1. **Acesse a API:** `https://seu-usuario.github.io/seu-repositorio/api/themes/index.json`
2. **Verifique CORS:** A API deve ser acessível de qualquer origem
3. **Teste navegação:** Use os IDs para navegar entre recursos

## ⚠️ Troubleshooting

### GitHub Actions Falhando

1. **Verifique permissões** do GitHub Actions
2. **Confirme que GitHub Pages** está configurado
3. **Verifique logs** dos workflows em Actions

### IDs Não Sendo Gerados

1. **Verifique formato** do frontmatter YAML
2. **Confirme que arquivos** se chamam `metadata.md`
3. **Execute localmente** para debug: `npm run generate-ids`

### API Não Atualizando

1. **Verifique se workflow** foi executado
2. **Confirme que mudanças** estão na pasta `content/`
3. **Aguarde alguns minutos** para propagação do CDN

## 📚 Próximos Passos

1. **Adicione mais conteúdo** seguindo a estrutura
2. **Customize os workflows** conforme necessário
3. **Integre com frontend** usando a API gerada
4. **Configure domínio customizado** no GitHub Pages (opcional)

A API estará pronta para uso em produção!
