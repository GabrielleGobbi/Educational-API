# Demonstração da API Gerada

## 🎯 Endpoints Disponíveis

### Temas
- **Lista de temas:** `GET /api/themes/index.json`
- **Tema específico:** `GET /api/themes/{id}.json`

### Tópicos
- **Lista de tópicos:** `GET /api/topics/index.json`
- **Tópico específico:** `GET /api/topics/{id}.json`
- **Tópicos por tema:** `GET /api/topics/by-theme/{theme_id}.json`

### Exercícios
- **Lista de exercícios:** `GET /api/exercises/index.json`
- **Exercício específico:** `GET /api/exercises/{id}.json`
- **Exercícios por tópico:** `GET /api/exercises/by-topic/{topic_id}.json`

### Vídeos
- **Lista de vídeos:** `GET /api/videos/index.json`
- **Vídeo específico:** `GET /api/videos/{id}.json`
- **Vídeos por tópico:** `GET /api/videos/by-topic/{topic_id}.json`

## 📊 Exemplo de Dados

### Tema (TypeScript Fundamentos)
```json
{
  "id": "cb096b44-4539-4dfa-89e8-011b5cc91479",
  "title": "TypeScript: Fundamentos",
  "slug": "typescript-fundamentals",
  "cardDescription": "TypeScript é uma linguagem de programação fortemente tipada...",
  "category": ["Nivelamento"],
  "sequence": 1,
  "difficulty": "beginner",
  "duration": "4 horas",
  "description": "# TypeScript: Fundamentos\n\n**TypeScript** é uma linguagem..."
}
```

### Tópico (Fundamentos)
```json
{
  "id": "3242e7bc-5f32-41f0-9238-b34e8e224423",
  "title": "Fundamentos",
  "slug": "fundamentos",
  "cardDescription": "Seus principais benefícios incluem detecção de erros...",
  "theme": "typescript-fundamentals",
  "sequence": 1,
  "difficulty": "beginner",
  "duration": "90 minutos",
  "content": "# Fundamentos do TypeScript\n\nTypeScript é uma linguagem..."
}
```

### Exercício (Tipos Básicos)
```json
{
  "id": "6c533d48-3a12-4843-ba7c-fe672ad78af4",
  "title": "Criando Tipos Básicos",
  "slug": "tipos-basicos",
  "cardDescription": "Exercício prático para criar e utilizar tipos básicos...",
  "theme": "typescript-fundamentals",
  "topic": "fundamentos",
  "difficulty": "beginner",
  "estimated_time": "15 minutos",
  "points": 10,
  "instructions": "# Exercício: Criando Tipos Básicos\n\n## 🎯 Objetivo...",
  "solution": "# Solução: Criando Tipos Básicos\n\n## 💡 Solução Completa..."
}
```

### Vídeo (Introdução)
```json
{
  "id": "f17c1ad1-d8ec-4928-9ba2-13652e6ea6ba",
  "title": "Introdução ao TypeScript",
  "slug": "introducao",
  "cardDescription": "Vídeo introdutório sobre os conceitos fundamentais...",
  "theme": "typescript-fundamentals",
  "topic": "fundamentos",
  "duration": "12:30",
  "video_url": "https://www.youtube.com/watch?v=example123",
  "transcript": "# Transcrição: Introdução ao TypeScript\n\n## [00:00 - 00:30] Abertura..."
}
```

## 🔗 Navegação da API

### Fluxo Típico de Uso

1. **Listar temas:** `GET /api/themes/index.json`
2. **Selecionar tema:** `GET /api/themes/cb096b44-4539-4dfa-89e8-011b5cc91479.json`
3. **Listar tópicos do tema:** `GET /api/topics/by-theme/cb096b44-4539-4dfa-89e8-011b5cc91479.json`
4. **Selecionar tópico:** `GET /api/topics/3242e7bc-5f32-41f0-9238-b34e8e224423.json`
5. **Listar exercícios do tópico:** `GET /api/exercises/by-topic/3242e7bc-5f32-41f0-9238-b34e8e224423.json`
6. **Selecionar exercício:** `GET /api/exercises/6c533d48-3a12-4843-ba7c-fe672ad78af4.json`

## ✨ Características da API

### IDs Únicos e Persistentes
- Cada conteúdo tem um UUID único gerado automaticamente
- IDs nunca mudam, garantindo links estáveis
- Geração automática via GitHub Actions

### Estrutura Granular
- Endpoints otimizados para diferentes casos de uso
- Listas resumidas para navegação
- Detalhes completos para visualização
- Agrupamentos por relacionamento (tema → tópicos, tópico → exercícios)

### Automação Completa
- Geração automática a cada commit
- Deploy automático no GitHub Pages
- Sem necessidade de servidor próprio
- Versionamento completo via Git

## 🚀 Como Usar em Produção

1. **Configure GitHub Pages** no repositório
2. **Ative os workflows** do GitHub Actions
3. **Adicione conteúdo** na pasta `content/`
4. **Faça commit e push**
5. **API atualizada automaticamente** em `https://username.github.io/repo-name/api/`

A API estará disponível publicamente via HTTPS com CDN global do GitHub!
