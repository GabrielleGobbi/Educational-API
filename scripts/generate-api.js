#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script para gerar a API JSON a partir dos arquivos de conteúdo
 * Cria uma estrutura granular de endpoints para otimizar consultas
 */

class APIGenerator {
    constructor(contentDir, apiDir) {
        this.contentDir = contentDir;
        this.apiDir = apiDir;
        this.themes = new Map();
        this.topics = new Map();
        this.exercises = new Map();
        this.videos = new Map();
    }

    readFrontmatter(content) {
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (!match) {
            return { frontmatter: {}, content: content };
        }
        
        return {
            frontmatter: this.parseFrontmatter(match[1]),
            content: match[2].trim()
        };
    }

    parseFrontmatter(frontmatterText) {
        const lines = frontmatterText.split('\n');
        const data = {};
        
        for (const line of lines) {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                
                // Handle arrays
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
                }
                // Handle quoted strings
                else if ((value.startsWith('"') && value.endsWith('"')) || 
                         (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                // Handle booleans
                else if (value === 'true') {
                    value = true;
                } else if (value === 'false') {
                    value = false;
                }
                // Handle numbers
                else if (!isNaN(value) && value !== '') {
                    value = Number(value);
                }
                
                data[key] = value;
            }
        }
        
        return data;
    }

    processThemes() {
        const themesDir = path.join(this.contentDir, 'themes');
        if (!fs.existsSync(themesDir)) return;

        const themeFolders = fs.readdirSync(themesDir);
        
        for (const folder of themeFolders) {
            const themeDir = path.join(themesDir, folder);
            if (!fs.statSync(themeDir).isDirectory()) continue;

            const metadataPath = path.join(themeDir, 'metadata.md');
            const descriptionPath = path.join(themeDir, 'description.md');
            
            if (!fs.existsSync(metadataPath)) continue;

            const metadataContent = fs.readFileSync(metadataPath, 'utf8');
            const { frontmatter } = this.readFrontmatter(metadataContent);

            let description = '';
            if (fs.existsSync(descriptionPath)) {
                const descContent = fs.readFileSync(descriptionPath, 'utf8');
                const { content } = this.readFrontmatter(descContent);
                description = content;
            }

            const theme = {
                ...frontmatter,
                description,
                folder,
                type: 'theme'
            };

            this.themes.set(frontmatter.id, theme);
        }
    }

    processTopics() {
        const topicsDir = path.join(this.contentDir, 'topics');
        if (!fs.existsSync(topicsDir)) return;

        const themeFolders = fs.readdirSync(topicsDir);
        
        for (const themeFolder of themeFolders) {
            const themeTopicsDir = path.join(topicsDir, themeFolder);
            if (!fs.statSync(themeTopicsDir).isDirectory()) continue;

            const topicFolders = fs.readdirSync(themeTopicsDir);
            
            for (const topicFolder of topicFolders) {
                const topicDir = path.join(themeTopicsDir, topicFolder);
                if (!fs.statSync(topicDir).isDirectory()) continue;

                const metadataPath = path.join(topicDir, 'metadata.md');
                const contentPath = path.join(topicDir, 'content.md');
                
                if (!fs.existsSync(metadataPath)) continue;

                const metadataContent = fs.readFileSync(metadataPath, 'utf8');
                const { frontmatter } = this.readFrontmatter(metadataContent);

                let content = '';
                if (fs.existsSync(contentPath)) {
                    const topicContent = fs.readFileSync(contentPath, 'utf8');
                    const { content: parsedContent } = this.readFrontmatter(topicContent);
                    content = parsedContent;
                }

                const topic = {
                    ...frontmatter,
                    content,
                    themeFolder,
                    topicFolder,
                    type: 'topic'
                };

                this.topics.set(frontmatter.id, topic);
            }
        }
    }

    processExercises() {
        const exercisesDir = path.join(this.contentDir, 'exercises');
        if (!fs.existsSync(exercisesDir)) return;

        const themeFolders = fs.readdirSync(exercisesDir);
        
        for (const themeFolder of themeFolders) {
            const themeExercisesDir = path.join(exercisesDir, themeFolder);
            if (!fs.statSync(themeExercisesDir).isDirectory()) continue;

            const topicFolders = fs.readdirSync(themeExercisesDir);
            
            for (const topicFolder of topicFolders) {
                const topicExercisesDir = path.join(themeExercisesDir, topicFolder);
                if (!fs.statSync(topicExercisesDir).isDirectory()) continue;

                const exerciseFolders = fs.readdirSync(topicExercisesDir);
                
                for (const exerciseFolder of exerciseFolders) {
                    const exerciseDir = path.join(topicExercisesDir, exerciseFolder);
                    if (!fs.statSync(exerciseDir).isDirectory()) continue;

                    const metadataPath = path.join(exerciseDir, 'metadata.md');
                    const instructionsPath = path.join(exerciseDir, 'instructions.md');
                    const solutionPath = path.join(exerciseDir, 'solution.md');
                    
                    if (!fs.existsSync(metadataPath)) continue;

                    const metadataContent = fs.readFileSync(metadataPath, 'utf8');
                    const { frontmatter } = this.readFrontmatter(metadataContent);

                    let instructions = '';
                    let solution = '';

                    if (fs.existsSync(instructionsPath)) {
                        const instContent = fs.readFileSync(instructionsPath, 'utf8');
                        const { content } = this.readFrontmatter(instContent);
                        instructions = content;
                    }

                    if (fs.existsSync(solutionPath)) {
                        const solContent = fs.readFileSync(solutionPath, 'utf8');
                        const { content } = this.readFrontmatter(solContent);
                        solution = content;
                    }

                    const exercise = {
                        ...frontmatter,
                        instructions,
                        solution,
                        themeFolder,
                        topicFolder,
                        exerciseFolder,
                        type: 'exercise'
                    };

                    this.exercises.set(frontmatter.id, exercise);
                }
            }
        }
    }

    processVideos() {
        const videosDir = path.join(this.contentDir, 'videos');
        if (!fs.existsSync(videosDir)) return;

        const themeFolders = fs.readdirSync(videosDir);
        
        for (const themeFolder of themeFolders) {
            const themeVideosDir = path.join(videosDir, themeFolder);
            if (!fs.statSync(themeVideosDir).isDirectory()) continue;

            const topicFolders = fs.readdirSync(themeVideosDir);
            
            for (const topicFolder of topicFolders) {
                const topicVideosDir = path.join(themeVideosDir, topicFolder);
                if (!fs.statSync(topicVideosDir).isDirectory()) continue;

                const videoFolders = fs.readdirSync(topicVideosDir);
                
                for (const videoFolder of videoFolders) {
                    const videoDir = path.join(topicVideosDir, videoFolder);
                    if (!fs.statSync(videoDir).isDirectory()) continue;

                    const metadataPath = path.join(videoDir, 'metadata.md');
                    const transcriptPath = path.join(videoDir, 'transcript.md');
                    
                    if (!fs.existsSync(metadataPath)) continue;

                    const metadataContent = fs.readFileSync(metadataPath, 'utf8');
                    const { frontmatter } = this.readFrontmatter(metadataContent);

                    let transcript = '';
                    if (fs.existsSync(transcriptPath)) {
                        const transContent = fs.readFileSync(transcriptPath, 'utf8');
                        const { content } = this.readFrontmatter(transContent);
                        transcript = content;
                    }

                    const video = {
                        ...frontmatter,
                        transcript,
                        themeFolder,
                        topicFolder,
                        videoFolder,
                        type: 'video'
                    };

                    this.videos.set(frontmatter.id, video);
                }
            }
        }
    }

    ensureApiDir() {
        if (!fs.existsSync(this.apiDir)) {
            fs.mkdirSync(this.apiDir, { recursive: true });
        }

        const subdirs = ['themes', 'topics', 'exercises', 'videos'];
        for (const subdir of subdirs) {
            const dirPath = path.join(this.apiDir, subdir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            // Create by-theme and by-topic subdirectories
            if (subdir === 'topics') {
                const byThemeDir = path.join(dirPath, 'by-theme');
                if (!fs.existsSync(byThemeDir)) {
                    fs.mkdirSync(byThemeDir, { recursive: true });
                }
            }

            if (subdir === 'exercises' || subdir === 'videos') {
                const byTopicDir = path.join(dirPath, 'by-topic');
                if (!fs.existsSync(byTopicDir)) {
                    fs.mkdirSync(byTopicDir, { recursive: true });
                }
            }
        }
    }

    generateThemeAPIs() {
        // Generate themes index
        const themesIndex = Array.from(this.themes.values()).map(theme => ({
            id: theme.id,
            title: theme.title,
            slug: theme.slug,
            cardDescription: theme.cardDescription,
            category: theme.category,
            sequence: theme.sequence,
            image: theme.image,
            difficulty: theme.difficulty,
            duration: theme.duration
        }));

        fs.writeFileSync(
            path.join(this.apiDir, 'themes', 'index.json'),
            JSON.stringify(themesIndex, null, 2)
        );

        // Generate individual theme files
        for (const [id, theme] of this.themes) {
            fs.writeFileSync(
                path.join(this.apiDir, 'themes', `${id}.json`),
                JSON.stringify(theme, null, 2)
            );
        }
    }

    generateTopicAPIs() {
        // Generate topics index
        const topicsIndex = Array.from(this.topics.values()).map(topic => ({
            id: topic.id,
            title: topic.title,
            slug: topic.slug,
            cardDescription: topic.cardDescription,
            theme: topic.theme,
            sequence: topic.sequence,
            difficulty: topic.difficulty,
            duration: topic.duration
        }));

        fs.writeFileSync(
            path.join(this.apiDir, 'topics', 'index.json'),
            JSON.stringify(topicsIndex, null, 2)
        );

        // Generate individual topic files
        for (const [id, topic] of this.topics) {
            fs.writeFileSync(
                path.join(this.apiDir, 'topics', `${id}.json`),
                JSON.stringify(topic, null, 2)
            );
        }

        // Generate topics by theme
        const topicsByTheme = new Map();
        for (const topic of this.topics.values()) {
            const themeSlug = topic.theme;
            if (!topicsByTheme.has(themeSlug)) {
                topicsByTheme.set(themeSlug, []);
            }
            topicsByTheme.get(themeSlug).push({
                id: topic.id,
                title: topic.title,
                slug: topic.slug,
                cardDescription: topic.cardDescription,
                sequence: topic.sequence,
                difficulty: topic.difficulty,
                duration: topic.duration
            });
        }

        for (const [themeSlug, topics] of topicsByTheme) {
            // Find theme ID by slug
            const theme = Array.from(this.themes.values()).find(t => t.slug === themeSlug);
            if (theme) {
                fs.writeFileSync(
                    path.join(this.apiDir, 'topics', 'by-theme', `${theme.id}.json`),
                    JSON.stringify(topics, null, 2)
                );
            }
        }
    }

    generateExerciseAPIs() {
        // Generate exercises index
        const exercisesIndex = Array.from(this.exercises.values()).map(exercise => ({
            id: exercise.id,
            title: exercise.title,
            slug: exercise.slug,
            cardDescription: exercise.cardDescription,
            theme: exercise.theme,
            topic: exercise.topic,
            difficulty: exercise.difficulty,
            estimated_time: exercise.estimated_time,
            points: exercise.points,
            tags: exercise.tags
        }));

        fs.writeFileSync(
            path.join(this.apiDir, 'exercises', 'index.json'),
            JSON.stringify(exercisesIndex, null, 2)
        );

        // Generate individual exercise files
        for (const [id, exercise] of this.exercises) {
            fs.writeFileSync(
                path.join(this.apiDir, 'exercises', `${id}.json`),
                JSON.stringify(exercise, null, 2)
            );
        }

        // Generate exercises by topic
        const exercisesByTopic = new Map();
        for (const exercise of this.exercises.values()) {
            const topicSlug = exercise.topic;
            if (!exercisesByTopic.has(topicSlug)) {
                exercisesByTopic.set(topicSlug, []);
            }
            exercisesByTopic.get(topicSlug).push({
                id: exercise.id,
                title: exercise.title,
                slug: exercise.slug,
                cardDescription: exercise.cardDescription,
                difficulty: exercise.difficulty,
                estimated_time: exercise.estimated_time,
                points: exercise.points,
                tags: exercise.tags
            });
        }

        for (const [topicSlug, exercises] of exercisesByTopic) {
            // Find topic ID by slug
            const topic = Array.from(this.topics.values()).find(t => t.slug === topicSlug);
            if (topic) {
                fs.writeFileSync(
                    path.join(this.apiDir, 'exercises', 'by-topic', `${topic.id}.json`),
                    JSON.stringify(exercises, null, 2)
                );
            }
        }
    }

    generateVideoAPIs() {
        // Generate videos index
        const videosIndex = Array.from(this.videos.values()).map(video => ({
            id: video.id,
            title: video.title,
            slug: video.slug,
            cardDescription: video.cardDescription,
            theme: video.theme,
            topic: video.topic,
            duration: video.duration,
            video_url: video.video_url,
            thumbnail: video.thumbnail,
            difficulty: video.difficulty,
            tags: video.tags
        }));

        fs.writeFileSync(
            path.join(this.apiDir, 'videos', 'index.json'),
            JSON.stringify(videosIndex, null, 2)
        );

        // Generate individual video files
        for (const [id, video] of this.videos) {
            fs.writeFileSync(
                path.join(this.apiDir, 'videos', `${id}.json`),
                JSON.stringify(video, null, 2)
            );
        }

        // Generate videos by topic
        const videosByTopic = new Map();
        for (const video of this.videos.values()) {
            const topicSlug = video.topic;
            if (!videosByTopic.has(topicSlug)) {
                videosByTopic.set(topicSlug, []);
            }
            videosByTopic.get(topicSlug).push({
                id: video.id,
                title: video.title,
                slug: video.slug,
                cardDescription: video.cardDescription,
                duration: video.duration,
                video_url: video.video_url,
                thumbnail: video.thumbnail,
                difficulty: video.difficulty,
                tags: video.tags
            });
        }

        for (const [topicSlug, videos] of videosByTopic) {
            // Find topic ID by slug
            const topic = Array.from(this.topics.values()).find(t => t.slug === topicSlug);
            if (topic) {
                fs.writeFileSync(
                    path.join(this.apiDir, 'videos', 'by-topic', `${topic.id}.json`),
                    JSON.stringify(videos, null, 2)
                );
            }
        }
    }

    generate() {
        console.log('🚀 Iniciando geração da API...');
        
        this.ensureApiDir();
        
        console.log('📖 Processando temas...');
        this.processThemes();
        console.log(`   ✅ ${this.themes.size} temas processados`);
        
        console.log('📚 Processando tópicos...');
        this.processTopics();
        console.log(`   ✅ ${this.topics.size} tópicos processados`);
        
        console.log('🏋️ Processando exercícios...');
        this.processExercises();
        console.log(`   ✅ ${this.exercises.size} exercícios processados`);
        
        console.log('🎥 Processando vídeos...');
        this.processVideos();
        console.log(`   ✅ ${this.videos.size} vídeos processados`);
        
        console.log('📝 Gerando APIs...');
        this.generateThemeAPIs();
        this.generateTopicAPIs();
        this.generateExerciseAPIs();
        this.generateVideoAPIs();
        
        console.log('✨ API gerada com sucesso!');
        console.log(`📊 Estatísticas:`);
        console.log(`   - ${this.themes.size} temas`);
        console.log(`   - ${this.topics.size} tópicos`);
        console.log(`   - ${this.exercises.size} exercícios`);
        console.log(`   - ${this.videos.size} vídeos`);
    }
}

function main() {
    const contentDir = path.join(__dirname, '..', 'content');
    const apiDir = path.join(__dirname, '..', 'api');
    
    if (!fs.existsSync(contentDir)) {
        console.error('❌ Pasta content/ não encontrada');
        process.exit(1);
    }
    
    const generator = new APIGenerator(contentDir, apiDir);
    generator.generate();
}

if (require.main === module) {
    main();
}

module.exports = APIGenerator;
