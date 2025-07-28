import Image from "next/image";
import Link from "next/link";
import { getAllDocuments, getFolderTitle } from "@/lib/markdown";
import { BookOpenIcon, DocumentTextIcon, FolderIcon } from "@heroicons/react/24/outline";
import { 
  ArrowTrendingUpIcon, 
  UsersIcon, 
  CogIcon, 
  PaintBrushIcon, 
  ChartBarIcon, 
  BriefcaseIcon, 
  ScaleIcon,
  BeakerIcon,
  MegaphoneIcon,
  PencilIcon
} from "@heroicons/react/24/outline";
import AnimatedCard, { AnimatedSection, AnimatedText } from '@/components/AnimatedCard';

// Helper function to get category icon
function getCategoryIcon(folderId: string) {
  const iconMap: Record<string, any> = {
    '01_BUSINESS_STRATEGY': ArrowTrendingUpIcon,
    '02_FINANCIAL_MODELS': ChartBarIcon,
    '03_TECHNICAL': CogIcon,
    '03_TECHNICAL_ARCHITECTURE': CogIcon,
    '04_DESIGN': PaintBrushIcon,
    '04_DESIGN_BRAND': PaintBrushIcon,
    '05_PRODUCT_STRATEGY': BeakerIcon,
    '06_MARKETING': MegaphoneIcon,
    '06_MARKETING_STRATEGY': MegaphoneIcon,
    '07_CONTENT': PencilIcon,
    '07_CONTENT_COPY': PencilIcon,
    '08_OPERATIONS': BriefcaseIcon,
    '09_ANALYTICS': ChartBarIcon,
    '09_ANALYTICS_RESEARCH': ChartBarIcon,
    '10_STAKEHOLDER_MATERIALS': UsersIcon,
    '11_PROJECT_MANAGEMENT': FolderIcon,
    '12_LEGAL_COMPLIANCE': ScaleIcon,
    '12_PROJECT_MANAGEMENT': FolderIcon
  };
  
  return iconMap[folderId] || DocumentTextIcon;
}

export default function Home() {
  const wikiStructure = getAllDocuments();
  const totalDocuments = Object.values(wikiStructure).reduce(
    (total, sections) => total + sections.filter(doc => doc.content).length,
    0
  );
  
  // Calculate documents per category
   const categoryStats = Object.entries(wikiStructure).map(([folderId, documents]) => ({
     id: folderId,
     title: getFolderTitle(folderId),
     count: documents.length,
     icon: getCategoryIcon(folderId)
   })).sort((a, b) => a.id.localeCompare(b.id));
  
  const totalFolders = Object.keys(wikiStructure).length;

  return (
    <div className="min-h-screen">
      {/* Main Content - Full Width */}
      <div className="h-screen overflow-y-auto">
        <div className="p-6">
        {/* Welcome Header */}
        <AnimatedSection className="mb-8" delay={1.0}>
          <AnimatedCard className="p-6" delay={1.1}>
            <AnimatedText delay={1.2}>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome to Klear Karma</h2>
              <p className="text-white/70">Comprehensive documentation and knowledge base for the Klear Karma project.</p>
            </AnimatedText>
          </AnimatedCard>
        </AnimatedSection>

        {/* Bento Grid Layout */}
        <AnimatedSection delay={1.3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr min-h-[600px] lg:h-[calc(100vh-200px)]">
            {/* Logo Card - First position */}
            <AnimatedCard
              className="col-span-1 sm:col-span-1 lg:col-span-1 glass-chakra-crown p-4 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group min-h-[120px]"
              delay={1.4}
            >
              <Link href="/" className="block h-full w-full flex flex-col items-center justify-center">
                <div className="mb-2 flex-shrink-0">
                  <Image
                    src="/Klear Karma.png"
                    alt="Klear Karma Logo"
                    width={40}
                    height={40}
                    className="rounded-lg ring-2 ring-white/20 shadow-lg group-hover:ring-white/40 transition-all duration-300"
                    priority
                  />
                </div>
                <div className="hidden sm:block text-center">
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors leading-tight">
                    Klear Karma
                  </h3>
                  <p className="text-xs text-white/60 mt-1 leading-tight">
                    Knowledge Base
                  </p>
                </div>
              </Link>
            </AnimatedCard>
            
            {/* Stats Cards */}
            <AnimatedCard
              className="col-span-1 sm:col-span-1 lg:col-span-1 glass-chakra-throat p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
              delay={1.45}
            >
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-2xl font-bold text-white mb-1">{Object.keys(wikiStructure).length}</div>
                <div className="text-xs text-white/60 hidden sm:block">Sections</div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard
              className="col-span-1 sm:col-span-1 lg:col-span-1 glass-chakra-heart p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
              delay={1.5}
            >
              <div className="h-full flex flex-col items-center justify-center text-center relative">
                <div className="orb-container">
                  <div className="text-2xl font-bold text-white mb-1 z-10 relative">{totalDocuments}</div>
                </div>
                <div className="text-xs text-white/60 hidden sm:block">Documents</div>
              </div>
            </AnimatedCard>
            
            {Object.entries(wikiStructure).map(([folderId, sections], index) => {
              const documentsCount = sections.filter(doc => doc.content).length;
              const firstDoc = sections.find(doc => doc.content);
              
              // Define responsive sizing for cards
              const getCardClass = (index: number) => {
                switch(index) {
                  case 0: return "col-span-1 sm:col-span-2 lg:col-span-1"; // Business Strategy
                  case 1: return "col-span-1 sm:col-span-2 lg:col-span-2"; // Financial Models - wide on lg
                  case 2: return "col-span-1 sm:col-span-1 lg:col-span-1"; // Technical Architecture
                  case 3: return "col-span-1 sm:col-span-1 lg:col-span-1"; // Design & Brand
                  case 4: return "col-span-1 sm:col-span-1 lg:col-span-1"; // Product Strategy
                  case 5: return "col-span-1 sm:col-span-2 lg:col-span-2"; // Marketing Strategy - wide
                  case 6: return "col-span-1 sm:col-span-1 lg:col-span-1"; // Content & Copy
                  case 7: return "col-span-1 sm:col-span-1 lg:col-span-1"; // Operations
                  case 8: return "col-span-1 sm:col-span-1 lg:col-span-1"; // Analytics & Research
                  case 9: return "col-span-1 sm:col-span-1 lg:col-span-1"; // Stakeholder Materials
                  case 10: return "col-span-1 sm:col-span-2 lg:col-span-2"; // Project Management - wide
                  default: return "col-span-1 sm:col-span-1 lg:col-span-1";
                }
              };

              return (
                <AnimatedCard
                  key={folderId}
                  className={`glass-chakra-${index % 2 === 0 ? 'third-eye' : 'heart'} p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${getCardClass(index)}`}
                  delay={1.4 + index * 0.05}
                >
                  <Link href={firstDoc ? `/wiki/${firstDoc.id}` : '#'} className="block h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-3">
                        <div className="w-6 h-6 bg-blue-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-2 ring-1 ring-white/20">
                          <BookOpenIcon className="w-4 h-4 text-white/80" />
                        </div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">
                          {getFolderTitle(folderId)}
                        </h3>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="text-xs text-white/60 mb-2">
                          {documentsCount} document{documentsCount !== 1 ? 's' : ''}
                        </div>
                        
                        {/* Show content only on larger cards or larger screens */}
                        {sections.length > 0 && (
                          <div className="space-y-1 hidden sm:block">
                            {sections.slice(0, getCardClass(index).includes('col-span-2') ? 3 : 2).map((section) => (
                              <div key={section.id} className="text-xs text-white/50 truncate">
                                {section.content ? '📄' : '📁'} {section.title}
                              </div>
                            ))}
                            {sections.length > 2 && (
                              <div className="text-xs text-white/40">+{sections.length - 2} more</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Quick Start */}
          <AnimatedSection delay={1.5}>
            <AnimatedCard className="mt-16 p-8 glass-chakra-crown" delay={1.6}>
              <AnimatedText delay={1.8}>
                <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                  Quick Start Guide
                </h2>
              </AnimatedText>
              <div className="grid md:grid-cols-3 gap-6">
                <AnimatedText className="text-center" delay={2.0}>
                  <div className="w-12 h-12 glass-chakra-heart rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold drop-shadow-sm">1</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 drop-shadow-sm">Explore Sections</h3>
                  <p className="text-white/70 text-sm drop-shadow-sm">Browse through our organized documentation sections above</p>
                </AnimatedText>
                <AnimatedText className="text-center" delay={2.2}>
                  <div className="w-12 h-12 glass-chakra-throat rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold drop-shadow-sm">2</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 drop-shadow-sm">Navigate</h3>
                  <p className="text-white/70 text-sm drop-shadow-sm">Use the sidebar to navigate between documents and sections</p>
                </AnimatedText>
                <AnimatedText className="text-center" delay={2.4}>
                  <div className="w-12 h-12 glass-chakra-third-eye rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold drop-shadow-sm">3</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 drop-shadow-sm">Learn</h3>
                  <p className="text-white/70 text-sm drop-shadow-sm">Dive deep into our comprehensive knowledge base</p>
                </AnimatedText>
              </div>
            </AnimatedCard>
          </AnimatedSection>

          {/* Category Breakdown */}
          <AnimatedSection delay={2.6}>
            <AnimatedCard className="mt-8 p-8 glass-chakra-third-eye" delay={2.7}>
              <AnimatedText delay={2.8}>
                <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
                  Documentation Categories
                </h2>
                <p className="text-white/70 mb-6 drop-shadow-sm">
                  Comprehensive breakdown of all {totalDocuments} documents across {totalFolders} categories
                </p>
              </AnimatedText>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryStats.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <AnimatedCard 
                      key={category.id}
                      className={`glass-chakra-${index % 4 === 0 ? 'heart' : index % 4 === 1 ? 'throat' : index % 4 === 2 ? 'third-eye' : 'crown'} p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group`}
                      delay={2.9 + index * 0.05}
                    >
                      <Link href={`/wiki`} className="block h-full">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 glass rounded-lg flex items-center justify-center group-hover:glass-dark transition-all duration-300">
                            <IconComponent className="w-5 h-5 text-white/80" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors text-sm">
                              {category.title}
                            </h3>
                            <p className="text-white/60 text-xs">
                              {category.count} document{category.count !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                            {category.count}
                          </div>
                        </div>
                      </Link>
                    </AnimatedCard>
                  );
                })}
              </div>
              
              <AnimatedText delay={3.2}>
                <div className="mt-6 p-4 glass-chakra-heart rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Total Documentation Coverage:</span>
                    <span className="text-white font-semibold">{totalDocuments} documents across {totalFolders} categories</span>
                  </div>
                </div>
              </AnimatedText>
            </AnimatedCard>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
