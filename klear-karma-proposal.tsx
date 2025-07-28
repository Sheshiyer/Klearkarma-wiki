import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Zap, Heart, TrendingUp, DollarSign, Target, Mail, Globe, Check, Star, BarChart3, PieChart } from 'lucide-react';

const KlearKarmaProposal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', investment: '', message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const slides = [
    'Cover', 'Executive Summary', 'Competition', 'Market Gaps', 'Solution', 
    'Offerings', 'Approach', 'Roadmap', 'Business Focus', 'Strategy', 'Investment', 'Thank You'
  ];

  const gradientColors = {
    primary: 'from-violet-600 via-purple-600 to-indigo-600',
    secondary: 'from-cyan-500 via-blue-500 to-indigo-500', 
    accent: 'from-pink-500 via-rose-500 to-red-500',
    success: 'from-emerald-500 via-green-500 to-teal-500'
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  const FloatingGradientBlob = ({ size, position, colors, animation }) => (
    <div 
      className={`absolute ${size} ${position} ${colors} rounded-full opacity-10 blur-xl ${animation}`}
      style={{ 
        background: `radial-gradient(circle, rgba(139,69,190,0.2), rgba(59,130,246,0.1), rgba(34,197,94,0.05))`,
        animation: `float ${Math.random() * 15 + 15}s ease-in-out infinite`
      }}
    />
  );

  const handleFormSubmit = () => {
    if (formData.name && formData.email) {
      setIsSubmitted(true);
    }
  };

  const renderSlide = () => {
    switch(currentSlide) {
      case 0: // Cover
        return (
          <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
            <FloatingGradientBlob size="w-96 h-96" position="top-10 -left-20" />
            <FloatingGradientBlob size="w-64 h-64" position="bottom-20 -right-16" />
            
            <div className="text-center z-10 max-w-4xl">
              <h1 className="text-7xl md:text-9xl font-bold mb-8 leading-tight">
                <span className={`bg-gradient-to-r ${gradientColors.primary} bg-clip-text text-transparent`}>
                  KLEAR
                </span>
                <br />
                <span className={`bg-gradient-to-r ${gradientColors.secondary} bg-clip-text text-transparent`}>
                  KARMA
                </span>
              </h1>
              
              <div className="text-2xl text-gray-300 mb-4">
                Investment Proposal - Confidential
              </div>
              
              <div className="text-xl text-purple-400 mb-16">
                Clearing the Karma of the Healing Industry
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="text-5xl font-bold text-white mb-2">₹90 Crores</div>
                <div className="text-gray-300 text-lg mb-4">Pre-Money Valuation</div>
                <div className="text-3xl font-bold text-purple-400">₹9 Crores Investment Ask</div>
                <div className="text-gray-400">10% Equity Stake</div>
              </div>
            </div>
            
            <div className="absolute bottom-8 text-center text-gray-500 text-sm">
              Confidential, Not to be circulated
            </div>
          </div>
        );

      case 1: // Executive Summary + Market Opportunity
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold mb-8 text-white">EXECUTIVE SUMMARY</h2>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    <strong className="text-white">Klear Karma</strong> is a community-verified marketplace for authentic alternative healing practitioners, 
                    honoring ancient wisdom while leveraging modern insights. The platform addresses trust gaps in the $1.8T+ wellness market by providing 
                    <strong className="text-purple-400"> community verification</strong> through experienced practitioners, 
                    <strong className="text-cyan-400"> scientific validation</strong> using Bio Well technology, and a 
                    <strong className="text-green-400"> 20% giveback model</strong> for research advancement and community access.
                  </p>
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <strong className="text-purple-400">Target Market:</strong> Millennials & Gen Z seeking authentic healing experiences
                    </div>
                    <div>
                      <strong className="text-cyan-400">Geographic Focus:</strong> Global, starting with key urban markets
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-bold mb-8 text-white">MARKET OPPORTUNITY</h2>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <p className="text-gray-300 leading-relaxed text-lg mb-8">
                    The alternative healing market is experiencing unprecedented growth, driven by increasing digital adoption and 
                    growing popularity of personalized spiritual guidance. Post-pandemic trends show 50% increase in holistic service demand, 
                    with Gen Z and Millennials driving 41% of wellness spending despite being 36% of the adult population.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                        <div className="text-white text-center">
                          <div className="text-2xl font-bold">$694</div>
                          <div className="text-sm">billion</div>
                        </div>
                      </div>
                      <div className="text-gray-300 font-semibold">CAM Market by 2030</div>
                      <div className="text-gray-400 text-sm">25.3% CAGR</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                        <div className="text-white text-center">
                          <div className="text-2xl font-bold">$78.58</div>
                          <div className="text-sm">billion</div>
                        </div>
                      </div>
                      <div className="text-gray-300 font-semibold">Body, Mind & Energy Healing</div>
                      <div className="text-gray-400 text-sm">26.2% CAGR</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <div className="text-white text-center">
                          <div className="text-2xl font-bold">$1.8</div>
                          <div className="text-sm">trillion</div>
                        </div>
                      </div>
                      <div className="text-gray-300 font-semibold">Global Wellness Market</div>
                      <div className="text-gray-400 text-sm">Current Size</div>
                    </div>
                  </div>
                  
                  <div className="text-center text-gray-400 text-sm">
                    Source: Global Wellness Institute, McKinsey Health Report, Allied Market Research
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Competition
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">GLOBAL & ALTERNATIVE HEALING COMPETITION</h2>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="text-left p-4 text-purple-400 font-bold">Platform</th>
                      <th className="text-left p-4 text-purple-400 font-bold">Launch Year</th>
                      <th className="text-left p-4 text-purple-400 font-bold">Revenue (USD)</th>
                      <th className="text-left p-4 text-purple-400 font-bold">Funding</th>
                      <th className="text-left p-4 text-purple-400 font-bold">Origin</th>
                      <th className="text-left p-4 text-purple-400 font-bold">Services</th>
                      <th className="text-left p-4 text-purple-400 font-bold">USP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-white font-bold">Heal.com</td>
                      <td className="p-4 text-gray-300">2014</td>
                      <td className="p-4 text-green-400">$50M+</td>
                      <td className="p-4 text-blue-400">$48M</td>
                      <td className="p-4 text-gray-300">USA</td>
                      <td className="p-4 text-gray-300">On-demand healthcare, some alternative</td>
                      <td className="p-4 text-cyan-400">Doctor-patient matching</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-white font-bold">Glow.com</td>
                      <td className="p-4 text-gray-300">2013</td>
                      <td className="p-4 text-green-400">$30M+</td>
                      <td className="p-4 text-blue-400">$25M</td>
                      <td className="p-4 text-gray-300">USA</td>
                      <td className="p-4 text-gray-300">Fertility, wellness tracking</td>
                      <td className="p-4 text-cyan-400">Data-driven insights</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-white font-bold">Healers.com</td>
                      <td className="p-4 text-gray-300">2020</td>
                      <td className="p-4 text-gray-400">Not disclosed</td>
                      <td className="p-4 text-gray-400">Seed Round</td>
                      <td className="p-4 text-gray-300">USA</td>
                      <td className="p-4 text-gray-300">Alternative practitioner directory</td>
                      <td className="p-4 text-cyan-400">Basic listing service</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-white font-bold">Urban Company</td>
                      <td className="p-4 text-gray-300">2014</td>
                      <td className="p-4 text-green-400">$2B+ (total)</td>
                      <td className="p-4 text-blue-400">$188M</td>
                      <td className="p-4 text-gray-300">India</td>
                      <td className="p-4 text-gray-300">Home services including wellness</td>
                      <td className="p-4 text-cyan-400">Convenience & scale</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-white font-bold">Mindvalley</td>
                      <td className="p-4 text-gray-300">2003</td>
                      <td className="p-4 text-green-400">$100M+</td>
                      <td className="p-4 text-blue-400">$30M</td>
                      <td className="p-4 text-gray-300">Malaysia</td>
                      <td className="p-4 text-gray-300">Personal growth, wellness education</td>
                      <td className="p-4 text-cyan-400">Educational transformation</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-white font-bold">Local Healing Centers</td>
                      <td className="p-4 text-gray-300">Various</td>
                      <td className="p-4 text-gray-400">Fragmented</td>
                      <td className="p-4 text-gray-400">N/A</td>
                      <td className="p-4 text-gray-300">Global</td>
                      <td className="p-4 text-gray-300">Traditional healing practices</td>
                      <td className="p-4 text-red-400">Geographic limitation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 3: // Market Gaps
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">CURRENT MARKET GAPS</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-3">Lack of Scientific Verification</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Most platforms rely on reviews and credentials, with no objective measurement of healing effectiveness 
                      or energetic impact. Over 1,000 fraudulent products identified by FDA making false health claims.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-3">Trust & Authenticity Crisis</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Overwhelming number of unverified practitioners creates skepticism and prevents genuine seekers 
                      from finding authentic guides. Estimated $100 billion annual fraud problem in healthcare broadly.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-3">Limited Access to Quality Practitioners</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Geographic barriers and high costs prevent many from accessing skilled healers and transformative practices, 
                      creating healing inequality in the wellness space.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-3">No Standardized Outcomes Measurement</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Industry lacks quantifiable metrics to assess session effectiveness, leaving clients with only 
                      subjective experiences and no way to measure transformation progress.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-3">Fragmented Experience</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Seekers must navigate multiple platforms, lack integrated booking, payment, and outcome tracking systems, 
                      creating friction in the healing journey.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-3">Economic Barriers to Healing</h3>
                    <p className="text-gray-300 leading-relaxed">
                      High session costs exclude many who could benefit, creating healing inequality. 
                      92% of UK public wants alternative therapies listed by NHS, indicating demand for accessible solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Solution
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">KLEAR KARMA'S SOLUTION</h2>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">OUR VISION</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    To become the world's most trusted, scientifically-validated platform for alternative healing — 
                    empowering millions to access authentic transformation through verified practitioners.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">OUR MISSION</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To clear the karma of the healing industry by bridging seekers to scientifically-verified healers, 
                    making authentic transformation accessible, measurable, and trustworthy.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-green-400 mb-6">OUR FOCUS</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-purple-400">Authentic Community:</strong>
                        <span className="text-gray-300"> Experienced practitioners validating newcomers through mentorship and peer review</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-cyan-400">Comprehensive Verification:</strong>
                        <span className="text-gray-300"> Multi-layered practitioner assessment combining traditional wisdom and modern insights</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-green-400">Accessible Healing:</strong>
                        <span className="text-gray-300"> 20% proceeds fund community access and continued research</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-blue-400">Global Reach:</strong>
                        <span className="text-gray-300"> Mobile-first platform connecting seekers worldwide to verified practitioners</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-yellow-400">Research Support:</strong>
                        <span className="text-gray-300"> Funding studies that explore and honor alternative healing methodologies</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-pink-400">Community Impact:</strong>
                        <span className="text-gray-300"> Case-by-case assistance fund for those unable to afford services</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Offerings
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">OUR OFFERINGS</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-400">Community-Verified Practitioners</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Experienced healers mentor and validate newcomers through peer review, traditional knowledge sharing, 
                    and outcome-based assessment, ensuring authentic practice standards.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-cyan-400">Comprehensive Practitioner Network</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Carefully curated healers across modalities: Energy Work, Chakra Healing, Reiki, Sound Therapy, 
                    Crystal Healing, Traditional Medicine, and Spiritual Counseling.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-400">Mobile-First Experience</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Seamless booking, session tracking, community feedback integration, and secure payment systems 
                    designed for modern seekers.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-pink-400">Research & Community Fund</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    20% of proceeds support exploration of healing methodologies and provide access to those who cannot afford services, 
                    ensuring healing equity.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  <span className={`bg-gradient-to-r ${gradientColors.primary} bg-clip-text text-transparent`}>
                    THE USP
                  </span>
                </h3>
                <p className="text-lg text-gray-300 text-center leading-relaxed">
                  Klear Karma is the world's first community-verified alternative healing platform, combining traditional wisdom 
                  with experienced practitioner oversight to create trust, authenticity, and meaningful transformation in the wellness industry.
                </p>
              </div>
            </div>
          </div>
        );

      case 6: // Approach
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">OUR APPROACH</h2>
              
              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-6">Community-Based Verification</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-purple-400">Peer Review Process:</strong>
                        <span className="text-gray-300"> Experienced practitioners mentor and assess newcomers</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-cyan-400">Outcome Tracking:</strong>
                        <span className="text-gray-300"> Community feedback and session effectiveness monitoring</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-green-400">Traditional Knowledge:</strong>
                        <span className="text-gray-300"> Honoring lineage-based learning and authentic practice</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-blue-400">Quality Assurance:</strong>
                        <span className="text-gray-300"> Academic research background enables sophisticated fraud detection</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6">Technology Infrastructure</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-purple-400">Dual Mobile Apps:</strong>
                        <span className="text-gray-300"> Seeker and practitioner interfaces with specialized features</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-cyan-400">AI-Powered Matching:</strong>
                        <span className="text-gray-300"> Algorithm-based practitioner-seeker compatibility</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-green-400">Community Insights:</strong>
                        <span className="text-gray-300"> Session feedback and practitioner development tracking</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-blue-400">Secure Data Management:</strong>
                        <span className="text-gray-300"> Privacy-focused health data protection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">CURRENT TECHNOLOGY DEVELOPMENT</h3>
                <p className="text-gray-300 leading-relaxed mb-6 text-center">
                  The Klear Karma platform is built on a robust technology stack that ensures seamless operation and scalability.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-purple-400 mb-2">User & Practitioner Portals</h4>
                    <p className="text-gray-300 text-sm">
                      Separate login interfaces provide personalized experiences for booking, tracking, and management.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-cyan-400 mb-2">Backend CMS</h4>
                    <p className="text-gray-300 text-sm">
                      Centralized content management system streamlines operations and provides insights into user behavior.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-green-400 mb-2">Scalability & Security</h4>
                    <p className="text-gray-300 text-sm">
                      Platform designed to handle high traffic volumes with secure data encryption and privacy protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 7: // Roadmap
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">THE FUTURE ROADMAP</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-6">Phase 1: Foundation (Months 1-6)</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Scientific verification system deployment</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">100+ verified practitioner onboarding</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Mobile app launch in key markets</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Community fund establishment</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6">Phase 2: Expansion (Months 7-12)</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">AI-powered practitioner matching</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Advanced biofield analytics dashboard</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">International market expansion</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Corporate wellness partnerships</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-green-400 mb-6">Phase 3: Innovation (Year 2)</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Wearable device integrations</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Predictive health analytics</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Virtual reality healing sessions</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Research publication partnerships</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  <span className={`bg-gradient-to-r ${gradientColors.primary} bg-clip-text text-transparent`}>
                    LONG-TERM VISION
                  </span>
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">10,000+</div>
                    <div className="text-gray-300">Verified Practitioners Worldwide</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">Standard</div>
                    <div className="text-gray-300">Industry Leader in Healing Verification</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">Bridge</div>
                    <div className="text-gray-300">Conventional & Alternative Medicine</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">Universal</div>
                    <div className="text-gray-300">Access Through Technology & Funding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 8: // Business Focus
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">THE BUSINESS FOCUS</h2>
              
              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-6">TARGET MARKET</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-purple-400">Primary:</strong>
                        <span className="text-gray-300"> North America, Europe, Australia - wellness-conscious urban populations</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-cyan-400">Secondary:</strong>
                        <span className="text-gray-300"> India, Southeast Asia - traditional healing practice regions</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-green-400">Tertiary:</strong>
                        <span className="text-gray-300"> Global expansion following proven market validation</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6">TARGET AUDIENCE</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-purple-400 mb-2">Conscious Millennials (25-40)</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      High disposable income, wellness-focused lifestyle. Skeptical of traditional healthcare, 
                      open to alternatives. Values authenticity, scientific backing, and social impact.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-cyan-400 mb-2">Gen Z Wellness Seekers (18-28)</h4>
                    <p className="text-gray-300 text-sm">
                      Digital natives seeking authentic experiences. Mental health aware, holistic lifestyle approach. 
                      Values transparency, social responsibility, and measurable outcomes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-8 text-center">REVENUE STREAMS</h3>
                
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-white text-center">
                        <div className="text-lg font-bold">25-30%</div>
                      </div>
                    </div>
                    <div className="text-purple-400 font-bold mb-2">Marketplace Commissions</div>
                    <div className="text-gray-300 text-sm">Primary revenue from booking fees</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-white text-center">
                        <div className="text-lg font-bold">15-20%</div>
                      </div>
                    </div>
                    <div className="text-cyan-400 font-bold mb-2">Product Store</div>
                    <div className="text-gray-300 text-sm">Commission on healing tools & accessories</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-white text-center">
                        <div className="text-lg font-bold">5-10%</div>
                      </div>
                    </div>
                    <div className="text-green-400 font-bold mb-2">Affiliate Partnerships</div>
                    <div className="text-gray-300 text-sm">Wellness product recommendations</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-white text-center">
                        <div className="text-lg font-bold">Var</div>
                      </div>
                    </div>
                    <div className="text-pink-400 font-bold mb-2">Research Licensing</div>
                    <div className="text-gray-300 text-sm">Methodology licensing to institutions</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-white text-center">
                        <div className="text-lg font-bold">B2B</div>
                      </div>
                    </div>
                    <div className="text-yellow-400 font-bold mb-2">Validation Services</div>
                    <div className="text-gray-300 text-sm">Verification for healing centers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 9: // Strategy
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">THE MARKETING STRATEGY</h2>
              
              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-6">Go-to-Market Strategy</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-purple-400">Scientific Credibility:</strong>
                        <span className="text-gray-300"> Partner with research institutions for validation studies</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-cyan-400">Influencer Partnerships:</strong>
                        <span className="text-gray-300"> Wellness thought leaders and verified practitioners</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-green-400">Content Marketing:</strong>
                        <span className="text-gray-300"> Educational content on scientific healing validation</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-blue-400">Community Building:</strong>
                        <span className="text-gray-300"> Authentic testimonials and transformation stories</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-yellow-400">Strategic Partnerships:</strong>
                        <span className="text-gray-300"> Integration with wellness centers and retreats</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6">Customer Value Proposition</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-purple-400 mb-2">For Seekers:</h4>
                      <p className="text-gray-300 text-sm">
                        Verified practitioners, transparent pricing, session outcome tracking, 
                        scientific validation, and authentic healing experiences.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-2">For Practitioners:</h4>
                      <p className="text-gray-300 text-sm">
                        Qualified leads, community support, fraud-free environment, 
                        professional development, and fair compensation structure.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-green-400 mb-2">For Partners:</h4>
                      <p className="text-gray-300 text-sm">
                        Access to verified healing community, research collaboration opportunities, 
                        and integration with established wellness ecosystem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-8 text-center">THE PRICING STRATEGY</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-purple-400 mb-4">Phase 1: Foundation</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Marketplace Commission</span>
                        <span className="text-purple-400 font-bold">25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Average Session Price</span>
                        <span className="text-green-400 font-bold">₹2,000-₹8,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Commission per Session</span>
                        <span className="text-cyan-400 font-bold">₹500-₹2,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-cyan-400 mb-4">Phase 2: Expansion</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Tiered Commissions</span>
                        <span className="text-cyan-400 font-bold">20-30%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Product Marketplace</span>
                        <span className="text-green-400 font-bold">15-20%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Affiliate Revenue</span>
                        <span className="text-yellow-400 font-bold">5-10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 10: // Investment
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">THE INVESTMENT ASK</h2>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  To revolutionize alternative healing by creating the world's first community-verified marketplace with 
                  backend scientific validation, bridging ancient wisdom with modern insights.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-cyan-400 mb-2">Current Status:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">MVP Development: ₹3 crores invested</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Research Partnership: Established</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Pilot Testing: 50+ practitioners</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-green-400 mb-2">Investment Highlights:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300">First-mover advantage</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300">Strong technical team</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300">Massive TAM: $694B by 2030</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">Exit Strategy:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-pink-400" />
                        <span className="text-gray-300">Series A: $15-20M USD</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-pink-400" />
                        <span className="text-gray-300">₹500+ crore valuation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-pink-400" />
                        <span className="text-gray-300">10-20x return potential</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Fund Allocation</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                      <div>
                        <div className="font-bold text-purple-400">Technology & Equipment</div>
                        <div className="text-sm text-gray-400">Backend verification, biofield analyzers</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹2.5 Cr</div>
                        <div className="text-sm text-purple-400">28%</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                      <div>
                        <div className="font-bold text-cyan-400">Practitioner Onboarding</div>
                        <div className="text-sm text-gray-400">Community building, mentor training</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹2 Cr</div>
                        <div className="text-sm text-cyan-400">22%</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                      <div>
                        <div className="font-bold text-green-400">Platform Development</div>
                        <div className="text-sm text-gray-400">AI matching, mobile apps, infrastructure</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹1.5 Cr</div>
                        <div className="text-sm text-green-400">17%</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                      <div>
                        <div className="font-bold text-yellow-400">Marketing & Growth</div>
                        <div className="text-sm text-gray-400">User acquisition, brand building</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹2 Cr</div>
                        <div className="text-sm text-yellow-400">22%</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                      <div>
                        <div className="font-bold text-pink-400">Operations & Research</div>
                        <div className="text-sm text-gray-400">Team scaling, legal compliance</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹1 Cr</div>
                        <div className="text-sm text-pink-400">11%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">Financial Projections</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-700/30 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-purple-400 mb-3">Year 1</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-400">₹2.3 Cr</div>
                          <div className="text-sm text-gray-400">Revenue</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-blue-400">500</div>
                          <div className="text-sm text-gray-400">Practitioners</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-purple-400">5K</div>
                          <div className="text-sm text-gray-400">Users</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/30 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-cyan-400 mb-3">Year 2</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-400">₹10.2 Cr</div>
                          <div className="text-sm text-gray-400">Revenue</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-blue-400">1,500</div>
                          <div className="text-sm text-gray-400">Practitioners</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-purple-400">25K</div>
                          <div className="text-sm text-gray-400">Users</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/30 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-green-400 mb-3">Year 3</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-400">₹25 Cr</div>
                          <div className="text-sm text-gray-400">Revenue</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-blue-400">3,000</div>
                          <div className="text-sm text-gray-400">Practitioners</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-purple-400">100K</div>
                          <div className="text-sm text-gray-400">Users</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/20 rounded-2xl p-8 text-center">
                <div className="text-6xl font-bold mb-4">
                  <span className={`bg-gradient-to-r ${gradientColors.primary} bg-clip-text text-transparent`}>
                    ₹9 Crores
                  </span>
                </div>
                <div className="text-2xl text-gray-300 mb-2">Total Investment Ask</div>
                <div className="text-xl text-purple-400 mb-4">for 10% Equity Stake</div>
                <div className="text-4xl font-bold text-cyan-400">₹90 Crores Pre-Money Valuation</div>
              </div>
            </div>
          </div>
        );

      case 11: // Thank You + Contact
        return (
          <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-6xl font-bold mb-8">
                  <span className={`bg-gradient-to-r ${gradientColors.primary} bg-clip-text text-transparent`}>
                    Thank You
                  </span>
                </h2>
                <p className="text-2xl text-gray-300 mb-8">
                  "Clearing the Karma of the Healing Industry"
                </p>
              </div>
              
              {!isSubmitted ? (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your company/fund"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Investment Interest</label>
                      <select
                        value={formData.investment}
                        onChange={(e) => setFormData({...formData, investment: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                      >
                        <option value="">Select range</option>
                        <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
                        <option value="₹1Cr - ₹3Cr">₹1Cr - ₹3Cr</option>
                        <option value="₹3Cr - ₹5Cr">₹3Cr - ₹5Cr</option>
                        <option value="₹5Cr+">₹5Cr+</option>
                        <option value="Lead Investor">Lead Investor</option>
                        <option value="Strategic Partnership">Strategic Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      placeholder="Tell us about your interest in Klear Karma..."
                    />
                  </div>

                  <button
                    onClick={handleFormSubmit}
                    className={`w-full mt-8 bg-gradient-to-r ${gradientColors.primary} hover:shadow-lg hover:shadow-purple-500/25 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Start Our Partnership Journey
                  </button>
                </div>
              ) : (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    <span className={`bg-gradient-to-r ${gradientColors.success} bg-clip-text text-transparent`}>
                      Thank You!
                    </span>
                  </h3>
                  <p className="text-gray-300 mb-6">
                    We'll be in touch within 24 hours to discuss this transformative opportunity.
                    Together, we're clearing the karma of the healing industry.
                  </p>
                  <div className="text-purple-400 text-lg">✨ Namaste ✨</div>
                </div>
              )}

              <div className="mt-12 text-center space-y-4">
                <div className="flex items-center justify-center space-x-6 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>invest@klearkarma.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>www.klearkarma.com</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Confidential Investment Proposal - Not for circulation
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingGradientBlob size="w-96 h-96" position="top-20 -left-20" />
      <FloatingGradientBlob size="w-64 h-64" position="top-1/2 -right-32" />
      <FloatingGradientBlob size="w-80 h-80" position="bottom-20 left-1/4" />
      
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              KLEAR KARMA
            </div>
            <div className="flex space-x-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-purple-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-400">
              {currentSlide + 1}/{slides.length}
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 bg-gray-800/80 backdrop-blur-sm border border-purple-500/30 p-3 rounded-full hover:bg-gray-700/80 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-purple-400" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 bg-gray-800/80 backdrop-blur-sm border border-purple-500/30 p-3 rounded-full hover:bg-gray-700/80 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-purple-400" />
      </button>

      {/* Slide Content */}
      <div className="transition-all duration-500 ease-in-out">
        {renderSlide()}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(2deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-2deg); }
        }
      `}</style>
    </div>
  );
};

export default KlearKarmaProposal;