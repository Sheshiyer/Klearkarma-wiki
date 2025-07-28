'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, ChevronRightIcon, BookOpenIcon, ChevronLeftIcon, ChevronRightIcon as CollapseIcon } from '@heroicons/react/24/outline';
import { WikiStructure, DocumentSection } from '@/types/wiki';
import AnimatedCard, { AnimatedSection, AnimatedText } from './AnimatedCard';

// Helper function to get folder title (moved from markdown.ts to avoid fs import)
function getFolderTitle(folderId: string): string {
  const folderTitles: Record<string, string> = {
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
    '12_PROJECT_MANAGEMENT': 'Project Management',
  };
  
  return folderTitles[folderId] || folderId.replace(/_/g, ' ');
}

// Helper function to get folder icon
function getFolderIcon(folderId: string): string {
  const folderIcons: Record<string, string> = {
    '01_BUSINESS_STRATEGY': '📊',
    '02_FINANCIAL_MODELS': '💰',
    '03_TECHNICAL': '🔧',
    '03_TECHNICAL_ARCHITECTURE': '⚙️',
    '04_DESIGN': '🎨',
    '04_DESIGN_BRAND': '🎨',
    '05_PRODUCT_STRATEGY': '🚀',
    '06_MARKETING': '📈',
    '06_MARKETING_STRATEGY': '📈',
    '07_CONTENT': '✍️',
    '07_CONTENT_COPY': '✍️',
    '08_OPERATIONS': '🔧',
    '09_ANALYTICS': '📊',
    '09_ANALYTICS_RESEARCH': '📊',
    '10_STAKEHOLDER_MATERIALS': '👥',
    '11_PROJECT_MANAGEMENT': '📋',
    '12_LEGAL_COMPLIANCE': '⚖️',
    '12_PROJECT_MANAGEMENT': '📋',
  };
  
  return folderIcons[folderId] || '📁';
}

interface WikiLayoutProps {
  children: React.ReactNode;
  wikiStructure: WikiStructure;
}

interface SidebarSectionProps {
  folderId: string;
  sections: DocumentSection[];
  currentPath: string;
  isCollapsed: boolean;
}

interface DocumentItemProps {
  document: DocumentSection;
  currentPath: string;
  level: number;
}

function DocumentItem({ document, currentPath, level }: DocumentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubsections = document.subsections && document.subsections.length > 0;
  const isActive = currentPath === `/wiki/${document.id}`;
  const paddingLeft = `${(level + 1) * 1}rem`;

  return (
    <div className="mb-1">
      <div className="flex items-center group">
        {hasSubsections && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-white/10 rounded transition-all duration-200"
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 text-white/70" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-white/70" />
            )}
          </button>
        )}
        
        {document.content ? (
          <Link
            href={`/wiki/${document.id}`}
            className={`flex-1 px-3 py-2 text-sm rounded-md transition-all duration-300 ${
              isActive
                ? 'text-white font-medium glass-chakra-heart'
                : 'text-white/80 hover:glass-chakra-throat hover:text-white drop-shadow-sm'
            }`}
            style={{ paddingLeft }}
          >
            {document.title}
          </Link>
        ) : (
          <div
            className="flex-1 px-3 py-2 text-sm font-medium text-white/60 drop-shadow-sm"
            style={{ paddingLeft }}
          >
            {document.title}
          </div>
        )}
      </div>
      
      {hasSubsections && isExpanded && (
        <div className="ml-4">
          {document.subsections!.map((subsection) => (
            <DocumentItem
              key={subsection.id}
              document={subsection}
              currentPath={currentPath}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarSection({ folderId, sections, currentPath, isCollapsed }: SidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const folderTitle = getFolderTitle(folderId);
  const folderIcon = getFolderIcon(folderId);
  const hasActiveDocument = sections.some(doc => currentPath === `/wiki/${doc.id}`);

  if (isCollapsed) {
    const firstDoc = sections.find(doc => doc.content);
    return (
      <div className="mb-2">
        <Link
          href={firstDoc ? `/wiki/${firstDoc.id}` : '#'}
          className={`flex items-center justify-center w-full p-3 rounded-md transition-all duration-300 group ${
            hasActiveDocument
              ? 'text-white glass-chakra-crown'
              : 'text-white/80 hover:glass-chakra-third-eye hover:text-white'
          }`}
          title={folderTitle}
        >
          <span className="text-lg">{folderIcon}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center w-full px-3 py-2 text-left text-sm font-semibold text-white hover:glass-chakra-throat rounded-md transition-all duration-300 glass-chakra-crown drop-shadow-sm"
      >
        {isExpanded ? (
          <ChevronDownIcon className="w-4 h-4 mr-2 text-white/70" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 mr-2 text-white/70" />
        )}
        <span className="text-base mr-2">{folderIcon}</span>
        {folderTitle}
      </button>
      
      {isExpanded && (
        <div className="mt-2 space-y-1">
          {sections.map((document) => (
            <DocumentItem
              key={document.id}
              document={document}
              currentPath={currentPath}
              level={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WikiLayout({ children, wikiStructure }: WikiLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatedCard
        className={`fixed inset-y-0 left-0 z-[100] ${isCollapsed ? 'w-20' : 'w-80'} m-4 mr-2 rounded-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-2xl glass-card sidebar-glass lg:relative lg:m-0 lg:rounded-none lg:h-screen`}
        delay={0.2}
        hover={false}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <AnimatedSection delay={0.4}>
            <div className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0">
              {!isCollapsed ? (
                <AnimatedText className="flex items-center space-x-2" delay={0.6}>
                  <BookOpenIcon className="w-6 h-6 text-blue-400" />
                  <h1 className="text-lg font-semibold text-white drop-shadow-lg">Klear Karma Wiki</h1>
                </AnimatedText>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <BookOpenIcon className="w-6 h-6 text-blue-400" />
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                {/* Collapse toggle button - desktop only */}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden lg:block p-2 rounded-md text-white/60 hover:text-white hover:glass-chakra-heart transition-all duration-300"
                  title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {isCollapsed ? (
                    <ChevronRightIcon className="w-4 h-4" />
                  ) : (
                    <ChevronLeftIcon className="w-4 h-4" />
                  )}
                </button>
                
                {/* Mobile close button */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-md text-white/60 hover:text-white hover:glass-chakra-heart transition-all duration-300"
                >
                  <span className="sr-only">Close sidebar</span>
                  ×
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Navigation */}
          <AnimatedSection delay={0.8}>
            <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className={`space-y-2 ${isCollapsed ? 'px-0' : ''}`}>
                {Object.entries(wikiStructure).map(([folderId, sections]) => (
                  <SidebarSection
                    key={folderId}
                    folderId={folderId}
                    sections={sections}
                    currentPath={pathname}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </nav>
          </AnimatedSection>
        </div>
      </AnimatedCard>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile header */}
        <AnimatedCard className="lg:hidden flex items-center justify-between p-4 m-4 ml-2 rounded-2xl z-20 glass-chakra-crown" delay={0.3}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-white/60 hover:text-white hover:glass-chakra-heart transition-all duration-300"
          >
            <span className="sr-only">Open sidebar</span>
            ☰
          </button>
          <AnimatedText delay={0.5}>
            <h1 className="text-lg font-semibold text-white drop-shadow-lg">Klear Karma Wiki</h1>
          </AnimatedText>
          <div className="w-10" /> {/* Spacer */}
        </AnimatedCard>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}