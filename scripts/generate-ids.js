#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * Script para gerar IDs únicos para arquivos de metadados
 * Verifica todos os arquivos metadata.md e adiciona um ID se não existir
 */

function generateUniqueId() {
    return uuidv4();
}

function readFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return { frontmatter: '', content: content };
    }
    
    return {
        frontmatter: match[1],
        content: match[2]
    };
}

function parseFrontmatter(frontmatterText) {
    const lines = frontmatterText.split('\n');
    const data = {};
    
    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                data[key] = value.slice(1, -1);
            } else {
                data[key] = value;
            }
        }
    }
    
    return data;
}

function stringifyFrontmatter(data) {
    const lines = [];
    
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && (value.includes(' ') || value.includes(':'))) {
            lines.push(`${key}: "${value}"`);
        } else {
            lines.push(`${key}: ${value}`);
        }
    }
    
    return lines.join('\n');
}

function processMetadataFile(filePath) {
    console.log(`Processando: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content: bodyContent } = readFrontmatter(content);
    
    if (!frontmatter) {
        console.log(`  ⚠️  Arquivo sem frontmatter: ${filePath}`);
        return false;
    }
    
    const data = parseFrontmatter(frontmatter);
    
    // Verifica se já tem ID
    if (data.id) {
        console.log(`  ✅ ID já existe: ${data.id}`);
        return false;
    }
    
    // Gera novo ID
    const newId = generateUniqueId();
    data.id = newId;
    
    // Reconstrói o arquivo
    const newFrontmatter = stringifyFrontmatter(data);
    const newContent = `---\n${newFrontmatter}\n---\n${bodyContent}`;
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  🆕 ID gerado: ${newId}`);
    
    return true;
}

function findMetadataFiles(dir) {
    const files = [];
    
    function walk(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                walk(fullPath);
            } else if (item === 'metadata.md') {
                files.push(fullPath);
            }
        }
    }
    
    walk(dir);
    return files;
}

function main() {
    const contentDir = path.join(__dirname, '..', 'content');
    
    if (!fs.existsSync(contentDir)) {
        console.error('❌ Pasta content/ não encontrada');
        process.exit(1);
    }
    
    console.log('🔍 Procurando arquivos metadata.md...');
    const metadataFiles = findMetadataFiles(contentDir);
    
    if (metadataFiles.length === 0) {
        console.log('📭 Nenhum arquivo metadata.md encontrado');
        return;
    }
    
    console.log(`📁 Encontrados ${metadataFiles.length} arquivos metadata.md`);
    console.log('');
    
    let modified = 0;
    
    for (const file of metadataFiles) {
        if (processMetadataFile(file)) {
            modified++;
        }
    }
    
    console.log('');
    console.log(`✨ Processamento concluído: ${modified} arquivos modificados`);
    
    if (modified > 0) {
        console.log('');
        console.log('📝 Arquivos modificados precisam ser commitados:');
        console.log('   git add .');
        console.log('   git commit -m "feat: adicionar IDs únicos aos metadados"');
    }
}

// Verifica se uuid está instalado
try {
    require('uuid');
} catch (error) {
    console.error('❌ Dependência uuid não encontrada');
    console.error('   Execute: npm install uuid');
    process.exit(1);
}

if (require.main === module) {
    main();
}

module.exports = { generateUniqueId, processMetadataFile, findMetadataFiles };
