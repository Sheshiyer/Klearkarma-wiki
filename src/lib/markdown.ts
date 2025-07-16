import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DocumentSection, WikiStructure } from '@/types/wiki';

// Dynamically scan for all folders in docs directory
function getDocsFolders(): string[] {
  const docsPath = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsPath)) return [];
  
  return fs.readdirSync(docsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();
}

const DOCS_BASE_PATH = path.join(process.cwd(), 'docs');

const FOLDER_TITLES: { [key: string]: string } = {
  '01_BUSINESS_STRATEGY': 'Business Strategy',
  '02_FINANCIAL_MODELS': 'Financial Models',
  '03_TECHNICAL': 'Technical Documentation',
  '03_TECHNICAL_ARCHITECTURE': 'Technical Architecture', 
  '04_DESIGN': 'Design System',
  '04_DESIGN_BRAND': 'Design & Brand',
  '05_PRODUCT_STRATEGY': 'Product Strategy',
  '06_MARKETING': 'Marketing',
  '06_MARKETING_STRATEGY': 'Marketing Strategy',
  '07_CONTENT': 'Content Strategy',
  '07_CONTENT_COPY': 'Content & Copy',
  '08_OPERATIONS': 'Operations',
  '09_ANALYTICS': 'Analytics',
  '09_ANALYTICS_RESEARCH': 'Analytics & Research',
  '10_STAKEHOLDER_MATERIALS': 'Stakeholder Materials',
  '11_PROJECT_MANAGEMENT': 'Project Management (Legacy)',
  '12_LEGAL_COMPLIANCE': 'Legal & Compliance',
  '12_PROJECT_MANAGEMENT': 'Project Management'
};

export function getAllDocuments(): WikiStructure {
  const wikiStructure: WikiStructure = {};
  const docsFolders = getDocsFolders();
  
  docsFolders.forEach(folder => {
    const folderPath = path.join(DOCS_BASE_PATH, folder);
    
    if (fs.existsSync(folderPath)) {
      const documents = getDocumentsFromFolder(folder);
      // Only include folders that have actual documents
      if (documents.length > 0) {
        wikiStructure[folder] = documents;
      }
    }
  });
  
  return wikiStructure;
}

export function getDocumentsFromFolder(folderName: string): DocumentSection[] {
  const folderPath = path.join(DOCS_BASE_PATH, folderName);
  const sections: DocumentSection[] = [];

  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);

    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content: markdownContent } = matter(content);
        
        sections.push({
          id: `${folderName}/${file.replace('.md', '')}`,
          title: frontmatter.title || formatTitle(file.replace('.md', '')),
          path: filePath,
          content: markdownContent,
          frontmatter
        });
      }
    });
  }

  return sections;
}

function formatTitle(filename: string): string {
  return filename
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export function getFolderTitle(folderId: string): string {
  return FOLDER_TITLES[folderId] || formatTitle(folderId);
}

export function getFolderTitles(): { [key: string]: string } {
  return FOLDER_TITLES;
}

export function getDocumentById(id: string): DocumentSection | null {
  const wikiStructure = getAllDocuments();
  
  for (const folder in wikiStructure) {
    const doc = findDocumentInSections(wikiStructure[folder], id);
    if (doc) return doc;
  }
  
  return null;
}

function findDocumentInSections(sections: DocumentSection[], id: string): DocumentSection | null {
  for (const section of sections) {
    if (section.id === id) return section;
    
    if (section.subsections) {
      const found = findDocumentInSections(section.subsections, id);
      if (found) return found;
    }
  }
  
  return null;
}