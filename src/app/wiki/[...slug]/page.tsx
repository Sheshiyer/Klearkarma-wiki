import { notFound } from 'next/navigation';
import { getDocumentById, getAllDocuments } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import WikiLayout from '@/components/WikiLayout';

interface WikiPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const wikiStructure = getAllDocuments();
  const paths: { slug: string[] }[] = [];

  // Generate paths for all documents
  Object.values(wikiStructure).forEach(sections => {
    sections.forEach(section => {
      if (section.content) {
        paths.push({ slug: section.id.split('/') });
      }
      
      // Handle subsections
      if (section.subsections) {
        section.subsections.forEach(subsection => {
          if (subsection.content) {
            paths.push({ slug: subsection.id.split('/') });
          }
        });
      }
    });
  });

  return paths;
}

export default async function WikiPage({ params }: WikiPageProps) {
  const { slug } = await params;
  const documentId = slug.join('/');
  const document = getDocumentById(documentId);
  const wikiStructure = getAllDocuments();

  if (!document || !document.content) {
    notFound();
  }

  // Generate breadcrumb
  const breadcrumbParts = documentId.split('/');
  const breadcrumbs = breadcrumbParts.map((part, index) => {
    const path = breadcrumbParts.slice(0, index + 1).join('/');
    const isLast = index === breadcrumbParts.length - 1;
    
    return {
      name: part.replace(/^\d+_/, '').replace(/_/g, ' '),
      href: isLast ? null : `/wiki/${path}`,
      isLast
    };
  });

  return (
    <WikiLayout wikiStructure={wikiStructure}>
      <div className="min-h-screen bg-white">
      <div className="max-w-none px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            <HomeIcon className="w-4 h-4" />
          </Link>
          <ChevronRightIcon className="w-4 h-4" />
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-gray-700 transition-colors capitalize"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium capitalize">
                  {crumb.name}
                </span>
              )}
              {!crumb.isLast && <ChevronRightIcon className="w-4 h-4" />}
            </div>
          ))}
        </nav>

        {/* Document Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {document.title}
          </h1>
          {document.frontmatter?.description && (
            <p className="text-lg text-gray-600">
              {document.frontmatter.description}
            </p>
          )}
          {document.frontmatter?.lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date(document.frontmatter.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Document Content */}
        <div className="bg-white">
          <MarkdownRenderer 
            content={document.content}
            className="max-w-none"
          />
        </div>

        {/* Document Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {document.frontmatter?.author && (
                <span>By {document.frontmatter.author}</span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Wiki Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </WikiLayout>
  );
}

export async function generateMetadata({ params }: WikiPageProps) {
  const { slug } = await params;
  const documentId = slug.join('/');
  const document = getDocumentById(documentId);

  if (!document) {
    return {
      title: 'Document Not Found - Klear Karma Wiki',
      description: 'The requested document could not be found.'
    };
  }

  return {
    title: `${document.title} - Klear Karma Wiki`,
    description: document.frontmatter?.description || `Documentation for ${document.title}`,
    openGraph: {
      title: document.title,
      description: document.frontmatter?.description || `Documentation for ${document.title}`,
      type: 'article',
    },
  };
}