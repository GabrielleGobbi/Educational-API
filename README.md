# Educational Content API

Uma API REST serverless para conteúdo educacional, construída com GitHub Pages e GitHub Actions.

## 🚀 Características

- **Serverless**: Hospedado inteiramente no GitHub Pages
- **Automático**: GitHub Actions gera a API automaticamente
- **IDs Únicos**: Cada conteúdo recebe um UUID persistente
- **API Granular**: Endpoints otimizados para performance
- **Versionado**: Todo o conteúdo é versionado via Git

## 📁 Estrutura

```
content/
├── themes/          # Temas principais
├── topics/          # Tópicos por tema
├── exercises/       # Exercícios por tópico
└── videos/          # Vídeos por tópico

api/                 # API gerada automaticamente
├── themes/
├── topics/
├── exercises/
└── videos/
```

## 🔗 Endpoints da API

- `GET /api/themes/index.json` - Lista todos os temas
- `GET /api/themes/{id}.json` - Detalhes de um tema
- `GET /api/topics/by-theme/{theme_id}.json` - Tópicos de um tema
- `GET /api/topics/{id}.json` - Detalhes de um tópico
- `GET /api/exercises/by-topic/{topic_id}.json` - Exercícios de um tópico
- `GET /api/videos/by-topic/{topic_id}.json` - Vídeos de um tópico

## 🛠️ Como Usar

1. Adicione conteúdo na pasta `content/`
2. Faça commit e push
3. GitHub Actions gera automaticamente a API
4. Acesse via GitHub Pages

## 📝 Formato dos Metadados

Cada arquivo `metadata.md` deve conter frontmatter YAML com os campos necessários. IDs únicos são gerados automaticamente.
