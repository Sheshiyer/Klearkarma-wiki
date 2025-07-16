export interface DocumentSection {
  id: string;
  title: string;
  path: string;
  content: string;
  frontmatter: Record<string, unknown>;
  subsections?: DocumentSection[];
}

export interface WikiStructure {
  [key: string]: DocumentSection[];
}