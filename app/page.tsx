'use client'
import { useEffect } from 'react';

export default function Home() {
  // Desactiva todo de momento
  useEffect(() => {if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // 1) Fade-in con IntersectionObserver
    try {
      const els = Array.from(document.querySelectorAll<HTMLElement>('.fade-in'));
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        els.forEach((el) => io.observe(el));
      } else {
        // Fallback: si no hay IO, muestra todo
        els.forEach((el) => el.classList.add('visible'));
      }
    } catch (e) {
      console.error('fade-in init failed', e);
    }
  
    // 2) FAQ: toggles sin estado, leyendo DOM
    try {
      const items = Array.from(document.querySelectorAll<HTMLElement>('.faq-item'));
      const onClick = (idx: number) => () => {
        items.forEach((item, i) => {
          const ans = item.querySelector<HTMLElement>('.faq-answer');
          const icon = item.querySelector<HTMLElement>('.faq-icon');
          if (!ans || !icon) return;
          if (i === idx) {
            const isHidden = ans.classList.contains('hidden');
            if (isHidden) {
              ans.classList.remove('hidden');
              icon.textContent = '−';
            } else {
              ans.classList.add('hidden');
              icon.textContent = '+';
            }
          } else {
            ans.classList.add('hidden');
            icon.textContent = '+';
          }
        });
      };
  
      const buttons = items.map((item) =>
        item.querySelector<HTMLButtonElement>('.faq-question')
      );
      buttons.forEach((btn, i) => {
        btn?.addEventListener('click', onClick(i));
      });
  
      return () => {
        buttons.forEach((btn, i) => {
          btn?.removeEventListener('click', onClick(i));
        });
      };
    } catch (e) {
      console.error('faq init failed', e);
    }}, []);

    
    const scrollToId = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      };
      
  return (
    <>
      {/* Fixed Header */}
      <header className="fixed-header">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="text-xl font-bold text-white">Viggest AI Builder</div>
            <button className="btn-free">Try It Free</button>
          </div>
        </div>
      </header>

       {/* Hero Section */}
       <section id="hero" className="hero animated-bg" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d1b69 100%)' }}>
         <div className="container relative z-20 px-2 sm:px-4 lg:px-6 py-12 lg:py-20">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Launch Your Digital Product <span className="gradient-text">in minutes</span> Without Being <span className="hand-drawn-underline">an Expert</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                <span className="gradient-text font-semibold">Our AI do the heavylifting.</span> 
                Go from zero to your first sale in 72 hours - just follow our 3 steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button type="button" className="btn-primary" onClick={() => scrollToId('hero')}>
                    Let AI Do It For You - Free
                </button>
                <button type="button" className="btn-secondary" onClick={() => scrollToId('how')}>
                    See How It Works
                </button>
              </div>
              <div className="flex items-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full pulse"></div>
                  <span>No marketing degree. Just results.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full pulse"></div>
                  <span>Thousands of launches already powered by AI.</span>
                </div>
              </div>  
            </div>
            <div className="fade-in floating">
              <div className="mockup-container">
                <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="600" height="400" rx="16" fill="#1e293b"/>
                  
                  {/* Success Notification */}
                  <rect x="400" y="20" width="180" height="60" rx="8" fill="#10b981"/>
                  <text x="420" y="40" fill="white" fontSize="12" fontWeight="bold">💰 First Sale!</text>
                  <text x="420" y="55" fill="white" fontSize="10">$47 earned today</text>
                  <text x="420" y="70" fill="white" fontSize="9">Keep it up! 🚀</text>
                  
                  {/* Dashboard */}
                  <rect x="40" y="100" width="520" height="280" rx="12" fill="#0f172a"/>
                  
                  {/* Header */}
                  <rect x="60" y="120" width="480" height="40" rx="8" fill="#1e293b"/>
                  <text x="80" y="140" fill="white" fontSize="14" fontWeight="bold">21-Day Self-Love Challenge</text>
                  <text x="80" y="155" fill="#94a3b8" fontSize="10">Welcome back, Sarah!</text>
                  
                  {/* Stats Cards */}
                  <rect x="80" y="180" width="120" height="80" rx="8" fill="#1e293b"/>
                  <text x="90" y="200" fill="white" fontSize="12" fontWeight="bold">Today&apos;s Revenue</text>
                  <text x="90" y="220" fill="#10b981" fontSize="18" fontWeight="bold">$47</text>
                  <text x="90" y="235" fill="#94a3b8" fontSize="9">+$12 from yesterday</text>
                  
                  <rect x="220" y="180" width="120" height="80" rx="8" fill="#1e293b"/>
                  <text x="230" y="200" fill="white" fontSize="12" fontWeight="bold">Total Sales</text>
                  <text x="230" y="220" fill="#3b82f6" fontSize="18" fontWeight="bold">23</text>
                  <text x="230" y="235" fill="#94a3b8" fontSize="9">This month</text>
                  
                  <rect x="360" y="180" width="120" height="80" rx="8" fill="#1e293b"/>
                  <text x="370" y="200" fill="white" fontSize="12" fontWeight="bold">Conversion</text>
                  <text x="370" y="220" fill="#8b5cf6" fontSize="18" fontWeight="bold">12.5%</text>
                  <text x="370" y="235" fill="#94a3b8" fontSize="9">Above average</text>
                  
                  {/* Recent Activity */}
                  <rect x="80" y="280" width="400" height="80" rx="8" fill="#1e293b"/>
                  <text x="90" y="300" fill="white" fontSize="12" fontWeight="bold">Recent Activity</text>
                  <text x="90" y="315" fill="#94a3b8" fontSize="10">✅ New customer: John D. - $47</text>
                  <text x="90" y="330" fill="#94a3b8" fontSize="10">📧 Email sent to 15 prospects</text>
                  <text x="90" y="345" fill="#94a3b8" fontSize="10">🚀 Product updated with AI suggestions</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="section-padding" style={{background: 'var(--bg-secondary)'}}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three simple steps to your first digital business. No technical skills required.
            </p>
          </div>
          
          {/* Flow Animation */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="flow-step">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: 'var(--gradient-glow)'}}>
                  <span className="text-2xl">💡</span>
                </div>
                <div className="text-sm text-gray-400">Unique Idea</div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: 'var(--gradient-glow)'}}>
                  <span className="text-2xl">📋</span>
                </div>
                <div className="text-sm text-gray-400">Roadmap</div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: 'var(--gradient-glow)'}}>
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="text-sm text-gray-400">Launch and Sale</div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="fade-in text-center feature-card">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)', border: '1px solid var(--primary)'}}>
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">1. Tell AI About You</h3>
              <p className="text-gray-300 mb-6">
                Share your passions, skills, interests & what problems you&apos;d like to solve.
                <span className="gradient-text font-semibold"> AI will find a unique idea for you.</span>
              </p>
              <div className="p-4 rounded-lg" style={{background: 'var(--bg-card)', border: '1px solid var(--border)'}}>
                <p className="text-sm text-gray-400 italic">&quot;I love fitness and want to help people get in shape&quot;</p>
              </div>
            </div>
            <div className="fade-in text-center feature-card">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)', border: '1px solid var(--primary)'}}>
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">2. Get Your Unique Idea & Custom Blueprint</h3>
              <p className="text-gray-300 mb-6">
                AI finds the perfect opportunity for you and tailors a custom roadmap to get you to your first sale.
              </p>
              <div className="p-4 rounded-lg" style={{background: 'var(--bg-card)', border: '1px solid var(--border)'}}>
                <p className="text-sm text-gray-400 italic">&quot;Fitness eBook for Busy Moms - $47 price point, 85% profit margin&quot;</p>
              </div>
            </div>
            <div className="fade-in text-center feature-card">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)', border: '1px solid var(--primary)'}}>
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">3. Launch & Print</h3>
              <p className="text-gray-300 mb-6">
                We handle the technical stuff, you focus on sharing your knowledge and printing money.
              </p>
              <div className="p-4 rounded-lg" style={{background: 'var(--bg-card)', border: '1px solid var(--border)'}}>
                <p className="text-sm text-gray-400 italic">&quot;First sale in 3 days: $47 earned!&quot;</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button type="button" className="btn-primary" onClick={() => scrollToId('hero')}>
            Build Your First Product
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section-padding" style={{background: 'var(--bg-primary)'}}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Trusted by Aspiring Creators, Coaches, and Entrepreneurs</h2>
            <p className="text-xl text-gray-300">Join the people who are taking over the AI era</p>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center feature-card">
              <div className="text-4xl font-bold mb-2 gradient-text">2,000+</div>
              <div className="text-gray-300">launches powered by AI</div>
            </div>
            <div className="text-center feature-card">
              <div className="text-4xl font-bold mb-2 gradient-text">$8.9M+</div>
              <div className="text-gray-300">revenue generated</div>
            </div>
            <div className="text-center feature-card">
              <div className="text-4xl font-bold mb-2 gradient-text">98%</div>
              <div className="text-gray-300">success rate</div>
            </div>
          </div>

          {/* Logos */}
          <div className="text-center mb-16">
            <p className="text-gray-400 mb-8">Trusted by creators on</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-500">Reddit</div>
              <div className="text-2xl font-bold text-gray-500">YouTube</div>
              <div className="text-2xl font-bold text-gray-500">IndieHackers</div>
              <div className="text-2xl font-bold text-gray-500">Gumroad</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="testimonial feature-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)', border: '1px solid var(--primary)'}}>
                  <span className="text-blue-400 font-bold">MG</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">María G.</div>
                  <div className="text-sm text-gray-600">Student</div>
                </div>
              </div>
              <div className="stars mb-3 text-yellow-400">★★★★★</div>
              <p className="text-gray-500 mb-4">&quot;Just hit $500 in 5 days. I never thought it was possible without any experience.&quot;</p>
            </div>
            
            <div className="testimonial feature-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)', border: '1px solid var(--primary)'}}>
                  <span className="text-green-400 font-bold">CR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Carlos R.</div>
                  <div className="text-sm text-gray-600">Content Creator</div>
                </div>
              </div>
              <div className="stars mb-3 text-yellow-400">★★★★★</div>
              <p className="text-gray-500 mb-4">&quot;Finally a tool that does the hard work for me. I just followed the plan.&quot;</p>
            </div>
            
            <div className="testimonial feature-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)', border: '1px solid var(--primary)'}}>
                  <span className="text-purple-400 font-bold">LS</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Laura S.</div>
                  <div className="text-sm text-gray-600">Aspiring Entrepreneur</div>
                </div>
              </div>
              <div className="stars mb-3 text-yellow-400">★★★★★</div>
              <p className="text-gray-500 mb-4">&quot;This gave me the courage to launch. I&apos;d been stuck for years.&quot;</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button type="button" className="btn-primary" onClick={() => scrollToId('hero')}>
            Start Your Success Story
            </button>   
          </div>
        </div>
      </section>

      {/* Emotional Hook Section */}
      <section className="section-padding" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d1b69 100%)', position: 'relative', overflow: 'hidden'}}>
        <div className="container text-center relative z-10">
          <div className="fade-in">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
              You Don&apos;t Need to Be an Expert to Start Your Business
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-300">
              Most people never start because they think they need coding, marketing, or a unique idea. 
              <span className="gradient-text font-semibold"> Our AI removes all those barriers.</span> 
              Now, anyone can launch their first product — and see results faster than they ever thought possible.
            </p>
            <button type="button" className="btn-primary" onClick={() => scrollToId('hero')}>
            Start Your Journey Now — Free Trial
            </button>
          </div>
        </div>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-indigo-500 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </section>

      {/* Market Intelligence Section */}
      <section id="demo" className="section-padding" style={{background: 'var(--bg-primary)'}}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">AI Does the Research, You Get the Winning Plan</h2>
            <p className="text-xl text-gray-300">Our AI analyzes thousands of data points to find your perfect opportunity</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: 'var(--gradient-glow)'}}>
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Finds Trending Topics</h3>
              <p className="text-gray-300">Before they peak, giving you first-mover advantage</p>
            </div>
            
            <div className="feature-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: 'var(--gradient-glow)'}}>
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Filters Saturated Markets</h3>
              <p className="text-gray-300">Automatically, so you don&apos;t waste time on oversaturated niches</p>
            </div>
            
            <div className="feature-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: 'var(--gradient-glow)'}}>
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Suggests Optimal Pricing</h3>
              <p className="text-gray-300">And positioning for maximum profit potential</p>
            </div>
            
            <div className="feature-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: 'var(--gradient-glow)'}}>
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Done-for-You Templates</h3>
              <p className="text-gray-300">Launch templates, sales pages, and email sequences</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button type="button" className="btn-primary" onClick={() => scrollToId('hero')}>
            Get Your Free Resources
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding" style={{background: 'var(--bg-secondary)'}}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know to get started</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="faq-item feature-card">
              <button className="faq-question w-full text-left flex justify-between items-center" onClick={() => (window as any).toggleFAQ(0)}>
                <h3 className="text-lg font-semibold text-white">Do I need experience?</h3>
                <span className="faq-icon text-2xl text-gray-400">+</span>
              </button>
              <div className="faq-answer hidden mt-4">
                <p className="text-gray-300">No. Our AI handles research, product plan, and even marketing copy.</p>
              </div>
            </div>
            
            <div className="faq-item feature-card">
              <button className="faq-question w-full text-left flex justify-between items-center" onClick={() => (window as any).toggleFAQ(1)}>
                <h3 className="text-lg font-semibold text-white">What if I don&apos;t know what to sell?</h3>
                <span className="faq-icon text-2xl text-gray-400">+</span>
              </button>
              <div className="faq-answer hidden mt-4">
                <p className="text-gray-300">The AI finds your unique profitable idea based on your interests & skills and market trends</p>
              </div>
            </div>
            
            <div className="faq-item feature-card">
              <button className="faq-question w-full text-left flex justify-between items-center" onClick={() => (window as any).toggleFAQ(2)}>
                <h3 className="text-lg font-semibold text-white">How fast can I see results?</h3>
                <span className="faq-icon text-2xl text-gray-400">+</span>
              </button>
              <div className="faq-answer hidden mt-4">
                <p className="text-gray-300">Most users launch in under a week — and some make their first sale within days.</p>
              </div>
            </div>
            
            <div className="faq-item feature-card">
              <button className="faq-question w-full text-left flex justify-between items-center" onClick={() => (window as any).toggleFAQ(3)}>
                <h3 className="text-lg font-semibold text-white">Is it really free to start?</h3>
                <span className="faq-icon text-2xl text-gray-400">+</span>
              </button>
              <div className="faq-answer hidden mt-4">
                <p className="text-gray-300">Yes. Try it for free, only upgrade if you love it.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
           <button type="button" className="btn-primary" onClick={() => scrollToId('hero')}>
            Still unsure? → Try It Free
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="section-padding" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)'}}>
        <div className="container text-center">
          <div className="fade-in">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
              Launch Your First Digital Product Today
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-300">
              <span className="font-semibold gradient-text">No experience needed.</span> No risk. No complicated setup. 
              Just tell us what you&apos;re passionate about, and we&apos;ll show you how to turn it into income.
            </p>
            
            <div className="feature-card mb-12 max-w-2xl mx-auto" style={{background: 'var(--bg-card)', border: '1px solid var(--primary)'}}>
              <h3 className="text-2xl font-bold mb-4 text-white">Start Free Today</h3>
              <p className="text-lg mb-6 text-gray-300">Get your personalized business blueprint in minutes. No credit card required.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button type="button" className="btn-primary" onClick={() => scrollToId('hero')}>
                    Start Now
                </button>
                <button type="button" className="btn-secondary" onClick={() => scrollToId('demo')}>
                    Watch Demo
                </button>
              </div>
              <p className="text-sm mt-4 text-gray-400">✓ Free forever • ✓ No credit card • ✓ Start earning in days</p>
            </div>

            {/* Final Trust Elements */}
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center feature-card">
                <div className="text-3xl font-bold mb-2 gradient-text">2,000+</div>
                <div className="text-sm text-gray-300">Successful Products Launched with AI</div>
              </div>
              <div className="text-center feature-card">
                <div className="text-3xl font-bold mb-2 gradient-text">$8.9M+</div>
                <div className="text-sm text-gray-300">Revenue Generated</div>
              </div>
              <div className="text-center feature-card">
                <div className="text-3xl font-bold mb-2 gradient-text">98%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
              <div className="text-center feature-card">
                <div className="text-3xl font-bold mb-2 gradient-text">72hrs</div>
                <div className="text-sm text-gray-300">To First Sale</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
