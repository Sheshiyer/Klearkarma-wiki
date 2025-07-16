'use client';

import { useState } from 'react';
import { 
  Button, 
  Input, 
  Modal, 
  ConfirmModal,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatsCard,
  FeatureCard,
  AnimatedCard,
  AnimatedSection,
  DESIGN_TOKENS
} from '@/components/ui';
import { 
  SparklesIcon, 
  RocketLaunchIcon, 
  HeartIcon,
  UserIcon,
  EnvelopeIcon,
  EyeIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <AnimatedSection>
          <Card variant="gradient" size="lg">
            <CardHeader>
              <CardTitle className="text-3xl">Klear Karma Design System</CardTitle>
              <CardDescription className="text-lg">
                A comprehensive UI component library built with glassmorphism design, 
                physics-based animations, and modern React patterns.
              </CardDescription>
            </CardHeader>
          </Card>
        </AnimatedSection>

        {/* Design Tokens */}
        <AnimatedSection delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle>Design Tokens</CardTitle>
              <CardDescription>
                Core design values that ensure consistency across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Colors */}
                <div>
                  <h4 className="text-white font-medium mb-3">Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                      <span className="text-white/70 text-sm">Primary Blue</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                      <span className="text-white/70 text-sm">Secondary Purple</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20"></div>
                      <span className="text-white/70 text-sm">Glass Surface</span>
                    </div>
                  </div>
                </div>

                {/* Spacing */}
                <div>
                  <h4 className="text-white font-medium mb-3">Spacing</h4>
                  <div className="space-y-2">
                    {Object.entries(DESIGN_TOKENS.spacing).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3">
                        <div 
                          className="bg-blue-500/30 h-4" 
                          style={{ width: typeof value === 'string' ? value : `${value}px` }}
                        ></div>
                        <span className="text-white/70 text-sm">{key}: {value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Border Radius */}
                <div>
                  <h4 className="text-white font-medium mb-3">Border Radius</h4>
                  <div className="space-y-2">
                    {Object.entries(DESIGN_TOKENS.borderRadius).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 bg-blue-500/30" 
                          style={{ borderRadius: value }}
                        ></div>
                        <span className="text-white/70 text-sm">{key}: {value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Buttons */}
        <AnimatedSection delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                Interactive button components with multiple variants and states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Variants */}
                <div>
                  <h4 className="text-white font-medium mb-3">Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-white font-medium mb-3">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <SparklesIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* States */}
                <div>
                  <h4 className="text-white font-medium mb-3">States</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      icon={<RocketLaunchIcon className="w-4 h-4" />}
                      iconPosition="left"
                    >
                      With Icon
                    </Button>
                    <Button 
                      loading={loading}
                      onClick={handleAsyncAction}
                    >
                      {loading ? 'Loading...' : 'Click to Load'}
                    </Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Inputs */}
        <AnimatedSection delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>
                Form input components with validation and glassmorphism styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label="Default Input"
                    placeholder="Enter text..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  
                  <Input
                    label="With Icon"
                    placeholder="Email address"
                    icon={<EnvelopeIcon className="w-4 h-4" />}
                    type="email"
                  />
                  
                  <Input
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                  />
                </div>
                
                <div className="space-y-4">
                  <Input
                    label="With Helper Text"
                    placeholder="Username"
                    helperText="Choose a unique username"
                    icon={<UserIcon className="w-4 h-4" />}
                  />
                  
                  <Input
                    label="Error State"
                    placeholder="Invalid input"
                    error="This field is required"
                    variant="outline"
                  />
                  
                  <Input
                    label="Filled Variant"
                    placeholder="Filled style"
                    variant="filled"
                    size="lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Cards */}
        <AnimatedSection delay={0.4}>
          <Card>
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>
                Container components with various glassmorphism effects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Card Variants */}
                <div>
                  <h4 className="text-white font-medium mb-3">Variants</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card variant="default" size="sm">
                      <CardContent>
                        <p className="text-white/80 text-sm">Default Card</p>
                      </CardContent>
                    </Card>
                    <Card variant="glass" size="sm">
                      <CardContent>
                        <p className="text-white/80 text-sm">Glass Card</p>
                      </CardContent>
                    </Card>
                    <Card variant="outline" size="sm">
                      <CardContent>
                        <p className="text-white/80 text-sm">Outline Card</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Stats Cards */}
                <div>
                  <h4 className="text-white font-medium mb-3">Stats Cards</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <StatsCard
                      title="Total Users"
                      value="12,345"
                      description="Active users this month"
                      icon={<UserIcon className="w-6 h-6" />}
                      trend="up"
                      trendValue="+12%"
                    />
                    <StatsCard
                      title="Revenue"
                      value="$45,678"
                      description="Monthly recurring revenue"
                      icon={<ChartBarIcon className="w-6 h-6" />}
                      trend="up"
                      trendValue="+8%"
                    />
                    <StatsCard
                      title="Conversion"
                      value="3.2%"
                      description="Visitor to customer rate"
                      icon={<SparklesIcon className="w-6 h-6" />}
                      trend="neutral"
                      trendValue="0%"
                    />
                  </div>
                </div>

                {/* Feature Cards */}
                <div>
                  <h4 className="text-white font-medium mb-3">Feature Cards</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FeatureCard
                      title="Advanced Security"
                      description="Enterprise-grade security with end-to-end encryption and compliance standards."
                      icon={<ShieldCheckIcon className="w-6 h-6" />}
                    />
                    <FeatureCard
                      title="Smart Analytics"
                      description="Real-time insights and predictive analytics to drive better business decisions."
                      icon={<ChartBarIcon className="w-6 h-6" />}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Modals */}
        <AnimatedSection delay={0.5}>
          <Card>
            <CardHeader>
              <CardTitle>Modals</CardTitle>
              <CardDescription>
                Overlay components for dialogs and confirmations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => setConfirmModalOpen(true)}
                >
                  Open Confirm Modal
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Usage Guidelines */}
        <AnimatedSection delay={0.6}>
          <Card variant="gradient">
            <CardHeader>
              <CardTitle>Usage Guidelines</CardTitle>
              <CardDescription>
                Best practices for implementing the design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Do's</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Use consistent spacing from design tokens</li>
                    <li>• Implement proper loading states</li>
                    <li>• Include accessibility attributes</li>
                    <li>• Follow animation guidelines</li>
                    <li>• Use semantic HTML elements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-3">Don'ts</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Don't override component styles directly</li>
                    <li>• Don't use custom colors outside the palette</li>
                    <li>• Don't disable animations without reason</li>
                    <li>• Don't ignore error states</li>
                    <li>• Don't forget responsive design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>

      {/* Modals */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Example Modal"
        description="This is a demonstration of the modal component"
      >
        <div className="space-y-4">
          <p className="text-white/80">
            This modal showcases the glassmorphism design with smooth animations.
            It includes backdrop blur, escape key handling, and focus management.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => console.log('Confirmed!')}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action? This cannot be undone."
        confirmText="Yes, proceed"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}