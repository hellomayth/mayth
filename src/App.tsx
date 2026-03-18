/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Linkedin, Mail, ExternalLink, ArrowLeft, BookOpen, Award, GraduationCap, Trophy, Star, ArrowUpRight, ChefHat, Plane, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MediumIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42s-3.38-2.88-3.38-6.42 1.51-6.42 3.38-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z" />
  </svg>
);

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const cursorSize = isHovering ? 60 : 20;

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-ink rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

const FadeInWhenVisible = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { name: 'PORTFOLIO', path: '/portfolio' },
    { name: 'BLOG', path: '/blog' },
    { name: 'LITTLE JOYS', path: '/little-joys' },
    { name: 'MILESTONES', path: '/milestones' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 md:py-16 selection:bg-ink selection:text-beige">
      <CustomCursor />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-ink z-50 origin-left"
        style={{ scaleX }}
      />
      
      <nav className="mb-12 md:mb-16 z-40">
        <ul className="flex space-x-6 md:space-x-12">
          <li>
            <Link to="/" className="text-xs md:text-sm font-bold tracking-[0.2em] hover:opacity-50 transition-opacity">
              HOME
            </Link>
          </li>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-xs md:text-sm font-bold tracking-[0.2em] hover:opacity-50 transition-all"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <AnimatePresence mode="wait">
        <motion.div
          key={useLocation().pathname}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-6xl"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <footer className="mt-24 w-full max-w-6xl flex justify-between items-center text-[10px] tracking-[0.3em] opacity-40 uppercase border-t border-ink/5 pt-12">
        <p>© 2026 Mayth Ng</p>
        <p>Hochiminh City, VN</p>
      </footer>
    </div>
  );
};

const PORTFOLIO_ITEMS = [
  { 
    id: 'skywise-core',
    title: 'At the Heart of the Sky: My Journey with the Skywise Core Team', 
    category: 'Aviation & Big Data', 
    color: 'bg-baby-blue', 
    img: '/avi2.jpg',
    excerpt: 'My Journey with the Skywise Core Team: Building the foundation of Airbus\'s open data platform.',
    date: 'Mar 18, 2026',
    content: (
      <div className="space-y-8 text-lg leading-relaxed">
        <p className="text-xl font-medium italic opacity-80">
          The aviation industry is a marvel of precision. In 2025, the industry hit a historic $1 Trillion revenue barrier, managing over 38.7 million flights globally. But behind these massive numbers lies an even more massive challenge: Data. How do you connect thousands of aircraft, maintenance crews, and airlines into one seamless ecosystem?
        </p>
        <div className="space-y-2">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-ink/5 bg-ink/5">
            <img src="/avi.png" alt="Aviation Data" className="w-full h-auto" referrerPolicy="no-referrer" />
          </div>
          <p className="text-sm opacity-50 italic">Data for 2025 compiled from Perplexity</p>
        </div>
        <p>
          The answer is Skywise—Airbus’s open data platform. It acts as a unified digital ecosystem that aggregates massive amounts of data from aircraft sensors, maintenance records, and global flight operations into a single source of truth. By leveraging advanced analytics and cloud computing, Skywise enables airlines to predict mechanical issues before they occur and optimize fuel efficiency across their entire fleet. For the past period, I have had the privilege of working at the very center of this digital revolution.
        </p>
        <div className="space-y-2">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-ink/5 bg-ink/5">
            <img src="/avi3.jpg" alt="Skywise Operations" className="w-full h-auto" referrerPolicy="no-referrer" />
          </div>
          <p className="text-sm opacity-50 italic break-all">
            Source: <a href="https://spirit.vietnamairlines.com/bay-cao-khat-vong-5-sao/nang-tam-vna/skywise-manh-ghep-quan-trong-trong-tien-trinh-chuyen-doi-so-nganh-hang-khong.html" target="_blank" rel="noopener noreferrer" className="hover:underline">https://spirit.vietnamairlines.com/bay-cao-khat-vong-5-sao/nang-tam-vna/skywise-manh-ghep-quan-trong-trong-tien-trinh-chuyen-doi-so-nganh-hang-khong.html</a>
          </p>
        </div>
        
        <hr className="border-ink/10" />
        
        <h3 className="text-3xl font-bold">The Mission: At the Core of the "Train"</h3>
        <p>
          In the world of SAFe (Scaled Agile Framework), we work in "Train" (similar to program unit). My team and I always understand that: Our team is the core team of the train (Agile Release Train - ART), and our ART is the core of Skywise. We aren't just building features; we are building the foundation.
        </p>
        <p>
          Our daily mission involves managing the Aviation Data Schema that defines how complex aircraft data is structured. When a new airline joins the platform, my team handles the Initial Operational Data Set deployment, ensuring they have a flight-ready start. We manage a complex portfolio of over 30 Data Products, including:
        </p>
        <ul className="list-disc pl-6 space-y-4">
          <li><strong>ACARS Messages:</strong> The real-time "nervous system" of aircraft communication.</li>
          <li><strong>NOAA Data:</strong> Integrating global weather patterns from the National Oceanic and Administration for flight safety.</li>
          <li><strong>Aircraft Logbooks & Loadsheets:</strong> Digitalizing the critical history and weight distribution of every flight.</li>
          <li><strong>Operational Write-back Data:</strong> Enabling data to flow back into operational systems for real-time action.</li>
        </ul>
        <p>
          Beyond data, we maintain 15+ specialized applications such as CORSIA (for carbon emissions tracking), Sensor Alert Inbox, Repetitive Defect and so on. From data health monitoring to consumption optimization and handling Technical Requests and Customer Support Inquiries, we ensure the "engine" of Skywise never skips a beat.
        </p>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">The Secret Sauce: Building a High-Performance Team</h3>
        <p>
          Managing 40+ combined data products and apps is a whirlwind, especially during PI Planning. So, how do we stay ahead? It isn't just about technical skill; it’s about culture.
        </p>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-bold mb-2">1. Radical Transparency</h4>
            <p>In our team, honesty is our greatest asset. We maintain a culture of "Early Warning." If there is a blocker or a technical risk, we don't hide it. We raise it immediately to our POs, Product Managers, and the Architecture team. This transparency isn't just internal—it’s how we build trust with every stakeholder.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">2. The Art of Preparation</h4>
            <p>Time is the most valuable currency in aviation. We’ve learned that a 30-minute meeting with the Architecture team can be more productive than a 2-hour workshop if—and only if—the dev team prepares rigorously beforehand. We don't just "show up"; we enter meetings with solutions already drafted.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">3. Proactive Requirement Refining</h4>
            <p>We don't wait for PI Planning to understand what’s next. By Iteration 2 or 3 of the current PI, we are already "poking" our POs to gather requirement details for the next cycle. This proactivity is why our delivery remains stable and predictable.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">4. Capacity, Prioritization, and the "Question List"</h4>
            <p>To survive the chaos of planning, we maintain absolute transparency on resource limits. By clearly ranking high-priority items, we help stakeholders understand the necessary trade-offs regarding our capacity.</p>
            <p>We also developed a centralized Question List. It tracks the topic, the contact person, the specific query, and the resolution. By sharing this live with stakeholders, we eliminate confusion. Risks are identified, concerns are shared with the Architecture team, and everyone stays aligned.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">5. Synchronized Leadership</h4>
            <p>We maximize efficiency through Synchronized Leadership, where coordination between Scrum Masters (SMs) and the Release Train Engineer (RTE) is kept seamless via structured checklists.</p>
          </div>
        </div>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">Reflections: More Than Just a Project</h3>
        <p>
          Looking back, what I am most proud of isn't just the code or the pipelines—it’s the people. I am surrounded by individuals who are not only technically brilliant but also incredibly proactive. They don't fear difficulty; they embrace it with a "can-do" mindset.
        </p>
        <p>
          Working within the C&P Train at Airbus has been a masterclass in operational excellence. I’ve learned the intricacies of aircraft health, the scale of Big Data platforms, and the true power of a well-oiled SAFe engine. But more importantly, I’ve found a community.
        </p>
        <p>
          The POs, SMs, RTEs, and Architects I work with have become more than just professional contacts; they are friends. There is a unique bond that forms when you solve high-stakes problems together with precision and mutual respect.
        </p>
        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">Conclusion: Beyond the Code</h3>
        <p>
          Looking back on this journey, I’ve realized a fundamental truth in high-stakes engineering: <strong>building the right culture is just as critical as building the right code</strong>. You can have the most sophisticated data pipelines and the most advanced AI models, but without transparency, proactive communication, and mutual respect, the system will eventually stall.
        </p>
        <p>
          It is the human "operating system"—our shared mindset and relentless pursuit of improvement—that truly keeps the aircraft flying and the data flowing.
        </p>
        <p>
          I am incredibly proud of what we have achieved together. The technical challenges were immense, but the personal bonds we formed were even greater. To my colleagues, my mentors, and my stakeholders: thank you for being part of this incredible chapter.
        </p>

        <p className="font-bold italic">
          To wrap it up: I love Airbus, I love the C&P Train, and I absolutely love my team.
        </p>
      </div>
    )
  },
  { 
    id: 'logistics-reconciliation',
    title: 'Logistics Reconciliation System', 
    category: 'Tech Project Management', 
    color: 'bg-baby-yellow', 
    img: '/vehical delivery.png',
    excerpt: 'From Vehicle Delivery to Financial Truth: Lessons from Building a Logistics Reconciliation System.',
    date: 'Mar 17, 2026',
    content: (
      <div className="space-y-8 text-lg leading-relaxed">
        <p className="text-xl font-medium italic opacity-80">
          Modern logistics platforms move thousands of vehicles every day. Behind each shipment lies a surprisingly complex set of operational and financial processes: planning the transport, dispatching carriers, confirming delivery, billing customers, and paying transportation providers.
        </p>
        <p>
          During a recent logistics technology project, I had the opportunity to work on an invoice reconciliation capability designed to ensure that operational transport data matches financial records. What initially looked like a straightforward validation tool turned out to reveal a fascinating intersection of logistics operations, financial workflows, and distributed system design.
        </p>
        <p>
          In this article, I’d like to share several lessons I learned along the way — both from a business and technical perspective.
        </p>
        
        <hr className="border-ink/10" />
        
        <h3 className="text-3xl font-bold">How Vehicle Logistics Platforms Actually Work</h3>
        <p>In vehicle logistics platforms, the goal is simple: move vehicles from point A to point B.</p>
        <p>But the underlying ecosystem is far more complex. Large automotive service providers operate logistics networks that connect vehicle manufacturers, dealerships, fleet owners, and transportation carriers.</p>
        <p>At first glance, the operational process ends when the vehicle is delivered. However, in reality the story continues well beyond that moment. Delivery is only half of the equation. The real challenge begins when financial systems must accurately reflect what happened in the physical world.</p>
        
        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">The Moment That Triggers Billing: Proof of Delivery</h3>
        <p>In logistics operations, a key event determines when financial transactions should begin: <strong>Proof of Delivery (POD)</strong>.</p>
        <p>Proof of Delivery confirms that the carrier has successfully completed the transportation service. Once POD is captured, several financial events are triggered: Service completion confirmed → Customer invoice generated → Carrier payment obligation recorded.</p>
        <p>In accounting terms, this often means Accounts Receivable (AR) is created for the customer and Accounts Payable (AP) is recorded for the carrier. This event-driven relationship between operational data and financial systems is a common pattern across logistics platforms. In other words: <strong>Operational events drive financial events.</strong></p>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">The Hidden Problem: Operational Reality vs Financial Records</h3>
        <p>In an ideal world, financial records would always perfectly match operational data. In practice, this rarely happens.</p>
        <p>When a transport order is planned, the system may estimate an expected transportation cost based on contract rates, distance, or route. However, real-world operations are dynamic. Several factors can cause the final cost to differ from the original estimate:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Route changes during transport</li>
          <li>Accessorial charges (e.g., storage, extra handling)</li>
          <li>Contract pricing adjustments</li>
          <li>Fuel surcharges</li>
          <li>Bundled pricing agreements</li>
          <li>Manual invoice corrections</li>
        </ul>
        <p>As a result, three different financial values may exist for the same shipment: Expected transport cost, Customer invoice amount, and Carrier invoice amount. When these numbers diverge, discrepancies emerge.</p>
        <p>At small scale, finance teams can manually investigate these mismatches. But at large scale, this becomes extremely difficult. Even a small discrepancy rate can lead to significant financial impact. Imagine a logistics platform handling millions of shipments per year. If just a small percentage (for example 1%) of invoices contains inconsistencies, the financial exposure can quickly reach millions of dollars.</p>
        <div className="space-y-0 font-mono text-xl bg-ink/5 p-6 rounded-2xl w-fit">
          <p>1,000,000 orders</p>
          <p>x $50 average mismatch</p>
          <p className="border-t border-ink/20 pt-2 mt-2">= $50M financial risk</p>
        </div>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">Why Reconciliation Systems Exist</h3>
        <p>This is where reconciliation systems come into play. A reconciliation platform acts as a financial control layer that validates whether operational data aligns with financial records.</p>
        <p>Its responsibilities typically include detecting situations such as:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Missing customer invoices</li>
          <li>Missing carrier invoices</li>
          <li>Customer invoice wrong amount</li>
          <li>Carrier invoice wrong amount</li>
          <li>Duplicate invoices</li>
          <li>Unexpected pricing differences</li>
          <li>System integration delay</li>
        </ul>
        <p>The reconciliation engine compares datasets from multiple systems and highlights discrepancies that require investigation. Instead of manually reviewing thousands of shipments, operations teams can focus only on cases that the system flags as anomalies.</p>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">The Architecture Behind a Reconciliation Platform</h3>
        <p>Behind the scenes, reconciliation systems rely on multiple interconnected enterprise systems. A typical architecture involves several layers.</p>
        <p>At the operational level, systems manage transportation activities such as order creation, route planning, and dispatching. Many logistics platforms use specialized planning tools like Oracle Transportation Management to optimize routes and manage carrier assignments.</p>
        <p>Once shipments are executed, delivery events and operational updates flow into downstream systems. Financial systems then generate customer invoices (AR) and carrier invoices (AP).</p>
        <p>To reconcile these records, a reconciliation platform aggregates data from several sources: Transport orders, Delivery events, Expected pricing rules, Customer invoices, and Carrier invoices. The reconciliation engine compares these datasets and identifies mismatches.</p>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">Lessons I Learned as a Project Manager</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-bold mb-2">1. Deep Business Understanding Is Critical</h4>
            <p>Technical solutions only make sense when they reflect real-world operational processes. Understanding how vehicles are transported, how carriers operate, and how logistics contracts are structured was essential to designing a meaningful reconciliation solution.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">2. Financial Workflows Are as Important as Operational Workflows</h4>
            <p>Engineering teams often focus heavily on operational systems. However, financial systems are equally important. Ensuring that financial records accurately reflect operational activities is critical for revenue recognition, cost management, and financial reporting.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">3. Integration Complexity Is Where Most Problems Occur</h4>
            <p>Most discrepancies do not originate from a single system. Instead, they emerge from interactions between systems. Small delays, mapping issues, or pricing rule differences can easily introduce inconsistencies.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">4. Data Consistency Is a Real Engineering Challenge</h4>
            <p>This project also reinforced how challenging data consistency can be in distributed environments. Different systems update at different times. Events may arrive asynchronously. Temporary inconsistencies are often unavoidable.</p>
          </div>
        </div>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">How the system created real business impact</h3>
        <p>What this system ultimately delivered was not just better data, but better financial control. At scale, even a small percentage of mismatches can translate into millions of dollars in financial exposure. By automatically detecting discrepancies between operational data and financial records, the platform made previously invisible issues visible — from carrier overcharges to underbilled shipments.</p>
        <p>More importantly, it didn’t stop at detection. It provided structured workflows to investigate and resolve these discrepancies, replacing fragmented processes based on spreadsheets and emails. This significantly reduced manual effort, accelerated billing cycles, and improved payment accuracy.</p>
        <p>Over time, the impact became clear: reduced revenue leakage, faster financial closing, and increased trust in data across both operations and finance teams. What used to be a reactive, manual process became a proactive and scalable control layer for the business.</p>
      </div>
    )
  },
  { 
    id: 'fintech-lifecycle',
    title: 'Decoding the Fintech Lifecycle: A Unified Approach to Cardholder, Merchant, and Recovery Services', 
    category: 'Fintech', 
    color: 'bg-baby-blue', 
    img: '/sync.jpg',
    excerpt: 'A Unified Approach to Cardholder, Merchant, and Recovery Services in Modern Fintech.',
    date: 'Mar 18, 2026',
    content: (
      <div className="space-y-8 text-lg leading-relaxed">
        <p className="text-xl font-medium italic opacity-80">
          Have you ever paused to wonder what actually happens in the split second between tapping your credit card and receiving a "Transaction Approved" notification? For most, it is a seamless daily convenience. But for those of us working behind the scenes in financial technology, it is a complex, high-stakes choreography of data, security, and real-time processing.
        </p>
        <p>
          Modern Fintech isn't just about moving money; it’s about managing the massive data generated at every touchpoint of a transaction. A truly powerful CRM in finance must bridge the gap between three distinct worlds: the Buyer (Cardholder Management), the Seller (Merchant Services), and the Recovery (Delinquency Management).
        </p>
        
        <hr className="border-ink/10" />
        
        <h3 className="text-3xl font-bold">1. Cardholder Management: "The Origin of Trust"</h3>
        <p>The journey begins here, where the financial institution grants credit or debit facilities and manages the individual user’s financial profile.</p>
        <ul className="list-disc pl-6 space-y-4">
          <li>
            <strong>Credit & Debit Servicing CRM:</strong> Digital tools allow banks to manage the entire card lifecycle—from initial activation and limit increases to ongoing account maintenance and credit health status tracking.
          </li>
          <li>
            <strong>Global Configuration Modules:</strong> Flexible architecture (such as the hierarchical client-system framework) is vital. It allows different institutions to set unique rules for interest rates, fees, and credit limits within the same unified system.
          </li>
          <li>
            <strong>Financial Data Integration:</strong> Robust backend integration ensures that every real-world transaction is accurately and instantly reflected in the CRM's credit or debit balance.
          </li>
        </ul>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">2. Merchant Services: "The Revenue Engine"</h3>
        <p>Once the card is in the hand of the buyer, the focus shifts to the business owners who accept these payments.</p>
        <ul className="list-disc pl-6 space-y-4">
          <li>
            <strong>The Intelligence Layer:</strong> Advanced reporting portals transform raw transaction data into visual insights, helping store owners track exactly where their money is.
          </li>
          <li>
            <strong>Security & Governance:</strong> An automated Identity and Access Management (IAM) workflow acts as a digital gatekeeper, ensuring only authorized personnel can access sensitive merchant financial data through a time-triggered approval process.
          </li>
          <li>
            <strong>The SM/PM Perspective:</strong> From a management standpoint, the biggest challenge is mitigating Technical Debt and System Latency. As a Scrum Master, prioritizing database optimization for slow queries is key to ensuring reports are generated in real-time without bottlenecks.
          </li>
        </ul>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">3. Delinquency Management: "The Final Link in the Chain"</h3>
        <p>When payments aren't made on time, the system transitions from "Servicing" to Recovery Services—the final safety net.</p>
        <ul className="list-disc pl-6 space-y-4">
          <li>
            <strong>The Logic:</strong> The CRM uses data from the cardholder side to categorize debt into specific "Aging Buckets" based on how many days past due a payment has become.
          </li>
          <li>
            <strong>Workflow Automation:</strong> To ensure efficiency, the system triggers automated workflows, including digital reminders (SMS/Email) and direct task assignments for recovery specialists.
          </li>
        </ul>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">4. The Synergy: Connecting the Dots</h3>
        <p>The true power of a Unified Fintech CRM Suite lies in the seamless flow of data across these three pillars.</p>
        <p>
          Imagine a customer uses their card (Cardholder Side) to buy a product from a local store (Merchant Side). The data flows instantly from the financial core to the seller's reporting dashboard. However, if that customer fails to pay their monthly bill, the system logic ensures the case automatically transitions to the recovery team (Delinquency Management).
        </p>
        <p>
          Behind the scenes, a Scrum Master coordinates across these functions, managing cross-functional dependencies between Finance and Operations while ensuring a "Single Source of Truth" for all transaction data.
        </p>

        <hr className="border-ink/10" />

        <h3 className="text-3xl font-bold">Conclusion: Building for the Future</h3>
        <p>
          In Fintech, "Done" is never finished. We are constantly optimizing code and resolving technical debt to keep the "Pulse" of the system healthy and responsive. As we look forward, the next frontier lies in AI-driven insights, providing even faster, natural-language analysis of our financial data to help businesses and consumers make better decisions.
        </p>
      </div>
    )
  },
  { 
    id: 'placeholder-item',
    title: 'Digital Transformation: From Paper to Seamless Online Integration', 
    category: 'Insurance Tech', 
    color: 'bg-baby-pink', 
    img: 'https://picsum.photos/seed/placeholder/800/600',
    excerpt: 'A new project is in the works. Stay tuned for updates!',
    date: 'Coming Soon',
    content: (
      <div className="space-y-8 text-lg leading-relaxed">
        <p className="text-xl font-medium italic opacity-80">
          Leading the digital shift in insurance: An end-to-end microservices-based platform featuring decoupled modules, real-time payments, and e-signatures.
        </p>
        <p>
          Something exciting is coming soon. 
          I am currently in the middle of something. So, this space will be updated with more details once I have time.
        </p>
      </div>
    )
  },
];

const BLOG_POSTS = [
  { 
    id: 'deal-with-conflict',
    date: 'Mar 17, 2026', 
    title: 'Deal with Conflict', 
    img: '/conflict.png',
    excerpt: 'Conflict is something that shows up in almost every project. Luckily, I was introduced to this topic back in university...', 
    category: 'Work', 
    color: 'text-baby-yellow',
    content: (
      <div className="space-y-6 text-lg leading-relaxed">
        <p>Conflict is something that shows up in almost every project. Luckily, I was introduced to this topic back in university, and it has stayed with me ever since.</p>
        <p>Over the years, I’ve had many chances to apply what I learned—and it has worked surprisingly well.</p>
        <p>Whenever conflict arises, my first step is always to listen. I take time to understand the situation from all sides, without rushing to conclusions. Then, depending on the context, I usually organize a short sharing or training session on conflict management.</p>
        <p>Interestingly, these sessions are not about solving a specific issue or revisiting who was right or wrong in past situations. Instead, they focus almost entirely on mindset—how we perceive conflict, how we react to it, and how we work with others despite differences.</p>
        <p>Because of that, these sessions tend to be open, safe, and surprisingly smooth. People don’t feel attacked or judged, so they’re more willing to engage.</p>
        <p>What I’ve consistently observed afterward is a clear shift: people become less reactive over small issues, more patient, and more willing to truly listen to one another.</p>
        <p>Right after these sessions, I often receive a lot of positive feedback—thank-you messages, requests for the slides, and even follow-up conversations. But what means the most to me is when, at the end of a project, someone mentions that learning how to handle conflict was one of their biggest takeaways.</p>
        <p>That, honestly, makes me really happy.</p>
        <p>
          Below is the content I usually share:
        </p>
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-ink/5 bg-ink/5">
          <iframe 
            src="https://docs.google.com/presentation/d/1gU_c_epSzk-LEwBa2WMLPRWywcmTXZVDy_I0IA1M3HY/embed?start=false&loop=false&delayms=3000" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            allowFullScreen={true}
          ></iframe>
        </div>
        <p className="text-sm opacity-50 italic">
          If the slides don't load, you can also view them <a href="https://docs.google.com/presentation/d/1gU_c_epSzk-LEwBa2WMLPRWywcmTXZVDy_I0IA1M3HY/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-baby-blue hover:underline">here</a>.
        </p>
      </div>
    )
  },
  { 
    id: 'art-of-saying-no', 
    date: 'Mar 12, 2026', 
    title: 'The Art of Saying No', 
    img: '/funny-and-creative-ways-to-say-no.jpg',
    excerpt: 'Protecting your time is the most valuable skill in the modern world...', 
    category: 'Lifestyle', 
    color: 'text-baby-pink',
    content: (
      <div className="space-y-6 text-lg leading-relaxed">
        <p>Protecting your time is the most valuable skill in the modern world.</p>
        <p>So how do you say “no”?</p>
        <p>Just say it. Clean. Simple.</p>
        <p className="text-3xl font-bold">“No.”</p>
        <p>No guilt. No overthinking.</p>
        <p>That’s it. Why complicate it?</p>
        <p>This post is short because I want it that way.</p>
        <p>Because why not?</p>
        <p className="font-bold">So just do it.</p>
      </div>
    )
  },
  { 
    id: 'finding-color', 
    date: 'Feb 28, 2026', 
    title: 'Finding Color in Monochrome', 
    img: '/minimalism-exhibit.png',
    excerpt: 'How a trip to the outskirts of Saigon changed my perspective on minimalism...', 
    category: 'Travel', 
    color: 'text-baby-blue',
    content: (
      <div className="space-y-6 text-lg leading-relaxed">
        <p className="opacity-60 italic">How a trip to the outskirts of Saigon changed my perspective on minimalism...</p>
        
        <p>
          Actually... no, nothing changed me. I’m all about 
          <span className="text-3xl font-black text-baby-blue-dark mx-2 uppercase tracking-tight">
            maximalism
          </span> 
          baby! 🌈✨
        </p>

        <p className="text-xl font-bold text-baby-orange-dark">
          No trip can turn me into minimalism! I want it all. 😹💃✨
        </p>
      </div>
    )
  },
  { 
    id: 'digital-detox', 
    date: 'Feb 15, 2026', 
    title: 'Digital Detox: A 30-Day Experiment', 
    img: '/Digital_Detox.jpg',
    excerpt: 'What happened when I turned off all notifications and lived without a screen?', 
    category: 'Tech', 
    color: 'text-baby-green',
    content: (
      <div className="space-y-6 text-lg leading-relaxed">
        <p>What happened when I turned off all notifications and lived without a screen?</p>
        <p>Unfortunately, I haven’t done it yet 🤣, so this is a placeholder.</p>
        <p>I will update this post to write about the experience next time when I do it.</p>
      </div>
    )
  },
];

const LITTLE_JOYS_ITEMS = [
  { icon: ChefHat, title: 'Cooking', desc: 'Experimenting with new recipes and flavors.', color: 'text-baby-blue-dark', bgColor: 'bg-baby-blue/30' },
  { icon: Plane, title: 'Traveling', desc: 'Exploring new destinations and cultures.', color: 'text-baby-pink-dark', bgColor: 'bg-baby-pink/30' },
  { icon: ShoppingBag, title: 'Shopping', desc: 'Finding unique pieces and local treasures.', color: 'text-baby-yellow-dark', bgColor: 'bg-baby-yellow/30' },
  { icon: BookOpen, title: 'Reading', desc: 'Diving into philosophy and modern fiction.', color: 'text-baby-green-dark', bgColor: 'bg-baby-green/30' },
];

const MILESTONES_DATA = {
  learning: [
    { title: 'Vibe Code', institution: 'Youtube', status: 'In Progress', color: 'bg-baby-green/20' },
    { title: 'AWS Cloud Practitioner', institution: 'AWS', status: 'To Do', color: 'bg-baby-yellow/20' },
    { title: 'Chinese', institution: 'iChinese', status: 'To Do', color: 'bg-baby-yellow/20' },
    { title: 'Data Science', institution: 'Coderschool', status: 'Completed', color: 'bg-baby-pink/20' },
  ],
  certifications: [
    { title: 'Project Management Professional (PMP)®', date: '2025', color: 'bg-baby-green/20' },
    { title: 'SAFe Scrum Master Certification', date: '2024', color: 'bg-baby-blue/20' },
    { title: 'Professional Scrum Master™ I, II', date: '2023', color: 'bg-baby-orange/20' },
  ],
  awards: [
    { title: 'Best Caring Person', event: 'My Own Awards', year: '2026', color: 'bg-baby-orange/20' },
    { title: 'Diamond VIP User', event: 'Shopee', year: '2026', color: 'bg-baby-pink/20' },
    { title: 'Top 1 Writing Using AI', event: 'My Own Awards', year: '2026', color: 'bg-baby-yellow/20' },
    { title: 'Team Innovation Award', event: 'FPT Software', year: '2025', color: 'bg-baby-blue/20' },
    { title: 'Best Team Performance Award', event: 'FPT Software', year: '2024', color: 'bg-baby-green/20' },
    { title: 'Best Team Performance Award', event: 'DXC Technology', year: '2020', color: 'bg-baby-yellow/20' },
  ]
};

const StaggeredText = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] py-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3 + (i * 0.05), 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

const Home = () => {
  const [isBlogStoryExpanded, setIsBlogStoryExpanded] = React.useState(false);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div className="space-y-32 pb-24">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="border border-ink/10 bg-white/30 backdrop-blur-sm p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center rounded-[3rem] shadow-2xl shadow-ink/5 overflow-hidden"
      >
        <motion.div style={{ y: y2 }} className="flex flex-col justify-between h-full space-y-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl md:text-3xl font-light italic mb-4"
            >
              Live Life Your Way
            </motion.h2>
            <StaggeredText 
              text="Mayth Ng" 
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.9] text-ink"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl font-bold tracking-widest uppercase mb-8"
            >
              Technology · Creativity · Life
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg leading-relaxed max-w-md font-medium"
            >
              A tech project manager exploring the intersection of technology, creativity, and everyday life.
              I write about work, ideas, hobbies, and the small milestones and lessons learned along the journey. Based in Ho Chi Minh City.
            </motion.p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <p className="font-bold text-sm tracking-widest text-ink/60">@hellomayth</p>
              <span className="h-px w-8 bg-ink/20"></span>
              <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Connect</span>
            </div>
            <div className="flex space-x-6">
              {[
                { icon: XIcon, href: "https://x.com/hellomayth", color: "bg-baby-blue" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/hellomayth/", color: "bg-baby-green" },
                { icon: Mail, href: "mailto:hellomayth@gmail.com", color: "bg-baby-yellow" },
                { icon: MediumIcon, href: "https://medium.com/@hellomayth", color: "bg-baby-pink" },
              ].map((social, i) => (
                <div key={i}>
                  <MagneticButton>
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`p-4 ${social.color} rounded-full block shadow-lg hover:shadow-xl transition-shadow`}
                    >
                      <social.icon size={20} className="text-ink" />
                    </a>
                  </MagneticButton>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: y1 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            src="/SIX_3348.jpg"
            alt="Mayth Ng Portrait"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-beige/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        </motion.div>
      </motion.div>

      {/* Why I Started This Blog Section */}
      <FadeInWhenVisible>
        <div className="max-w-3xl mx-auto space-y-12 py-16 border-t border-ink/5">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Why I Started This Blog</h2>
          <div className="space-y-8 text-lg leading-relaxed opacity-80 font-medium relative">
            <p>For as long as I can remember, my mind has rarely been quiet.</p>
            
            <p>
              I used to spend a lot of time thinking—sometimes about random ideas, sometimes about worries or emotions I couldn't quite express to anyone. 
              Thoughts would circle in my head for hours, sometimes days. They weren’t always important thoughts, but they were persistent. 
              And the strange thing about thoughts like that is that they take up space. They make it harder to focus on anything else.
            </p>

            <AnimatePresence>
              {isBlogStoryExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8 overflow-hidden"
                >
                  <p>For a long time, I simply lived with that.</p>

                  <p>Then one day, it occurred to me that maybe writing could help.</p>

                  <p>
                    Writing, in a way, feels like taking the thoughts out of my head and placing them somewhere safe. 
                    Once an idea is written down, I no longer feel the need to hold onto it so tightly. 
                    Once a worry is expressed on paper, it somehow loses its weight. 
                    Writing helps me organize my thoughts, give them structure, and see them more clearly.
                  </p>

                  <p>More importantly, it gives me a sense of calm.</p>

                  <p>
                    When something is written down, I feel reassured. The idea has been captured. 
                    The feeling has been acknowledged. My mind can finally move on.
                  </p>

                  <p>There is also a small story behind my motivation to start writing.</p>

                  <p>
                    Many years ago, around 2019, a friend of mine once looked at my palm and casually told me that I had a natural connection with writing. 
                    She said that writing might bring interesting opportunities into my life someday, and that I could even become somewhat well-known for it—though probably without deliberately trying.
                  </p>

                  <p>At the time, I laughed it off.</p>

                  <p>
                    To be honest, I was quite lazy back then, and there were many other things in life that distracted me from the idea of writing. 
                    The thought stayed somewhere in the back of my mind, but I never truly acted on it.
                  </p>

                  <p>Until recently.</p>

                  <p>
                    Life has a way of changing us. After experiencing different things, growing older, and seeing life from new perspectives, 
                    I began to feel curious again about things I once ignored.
                  </p>

                  <p>So in 2026, I decided to explore writing.</p>

                  <p>
                    Not with any grand ambition, but simply for a few personal reasons:<br />
                    to clear my mind,<br />
                    to organize my thoughts,<br />
                    to capture ideas before they disappear,<br />
                    and to document the experiences and lessons life has given me.<br />
                    This blog is, first and foremost, a place for that.
                  </p>

                  <p>
                    A place where I can write about thoughts, ideas, small reflections, and perhaps a few memorable stories along the way. 
                    Sometimes they may be about work, sometimes about life, and sometimes about things that simply pass through my mind.
                  </p>

                  <p>
                    If someone happens to read these words and finds something useful, comforting, or interesting in them, that would be a wonderful bonus.
                  </p>

                  <p>
                    But even if that never happens, I think writing itself will already have given me something valuable.
                  </p>

                  <div className="space-y-2 italic opacity-60">
                    <p>A little more clarity.</p>
                    <p>A little more calm.</p>
                    <p>And perhaps, a better understanding of my own thoughts.</p>
                  </div>

                  <p>
                    And who knows—maybe my friend’s prediction from 2019 will turn out to be right after all. 😝
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!isBlogStoryExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-beige to-transparent pointer-events-none"></div>
            )}
            
            <button 
              onClick={() => setIsBlogStoryExpanded(!isBlogStoryExpanded)}
              className="flex items-center space-x-4 font-bold text-sm hover:opacity-50 transition-all group pt-4"
            >
              <span className="group-hover:mr-2 transition-all">{isBlogStoryExpanded ? 'Read Less' : 'Read Full Story'}</span>
              <span className="w-12 h-px bg-ink group-hover:w-16 transition-all"></span>
            </button>
          </div>
        </div>
      </FadeInWhenVisible>

      {/* Portfolio Preview */}
      <section className="space-y-12">
        <FadeInWhenVisible>
          <div className="flex justify-between items-end">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Portfolio Highlights</h2>
            <Link to="/portfolio" className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
              <span>View All</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PORTFOLIO_ITEMS.slice(0, 4).map((item, i) => (
            <div key={i} className="flex flex-col">
              <FadeInWhenVisible delay={i * 0.1} className="h-full">
                <motion.div 
                  whileHover={{ y: -15, scale: 1.02 }}
                  onClick={() => navigate(`/portfolio/${item.id}`)}
                  className={`${item.color} rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col`}
                >
                  <div className="aspect-[16/10] overflow-hidden shrink-0">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.2 }}
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div className="p-8 flex justify-between items-start flex-1">
                    <div className="flex-1 mr-4">
                      <h3 className="font-bold text-2xl mb-1">{item.title}</h3>
                      <p className="text-sm opacity-60 uppercase tracking-widest">{item.category}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white group-hover:rotate-45 transition-all duration-500 shrink-0">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="space-y-12">
        <FadeInWhenVisible>
          <div className="flex justify-between items-end">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Latest from Blog</h2>
            <Link to="/blog" className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
              <span>View All</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {BLOG_POSTS.slice(0, 2).map((post, i) => (
            <div key={i}>
              <FadeInWhenVisible delay={i * 0.1}>
                <article 
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="group cursor-pointer border-b border-ink/10 pb-12 hover:border-ink/30 transition-all"
                >
                  {post.img && (
                    <div className="mb-6 aspect-[16/9] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-ink/5">
                      <img 
                        src={post.img} 
                        alt={post.title} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mb-6">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${post.color.replace('text-', 'bg-')} text-ink`}>
                      {post.category}
                    </span>
                    <span className="text-xs opacity-40 font-mono">{post.date}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 group-hover:translate-x-3 transition-transform duration-500 leading-tight">{post.title}</h3>
                  <p className="text-lg opacity-70 leading-relaxed mb-8">{post.excerpt}</p>
                  <div className="flex items-center space-x-3 font-bold text-sm group-hover:opacity-60 transition-opacity">
                    <span>Read More</span>
                    <motion.span 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-10 h-px bg-ink"
                    ></motion.span>
                  </div>
                </article>
              </FadeInWhenVisible>
            </div>
          ))}
        </div>
      </section>

      {/* Little Joys Preview */}
      <section className="space-y-12">
        <FadeInWhenVisible>
          <div className="flex justify-between items-end">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Little Joys</h2>
            <Link to="/little-joys" className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
              <span>Explore</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LITTLE_JOYS_ITEMS.slice(0, 2).map((item, i) => (
            <div key={i}>
              <FadeInWhenVisible delay={i * 0.1}>
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => navigate('/little-joys')}
                  className={`${item.bgColor} p-12 rounded-[3rem] flex flex-col items-center text-center space-y-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500`}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon size={56} className={item.color} />
                  </motion.div>
                  <h3 className="font-bold text-3xl">{item.title}</h3>
                  <p className="text-lg opacity-70 max-w-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              </FadeInWhenVisible>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones Preview */}
      <section className="space-y-12">
        <FadeInWhenVisible>
          <div className="flex justify-between items-end">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Milestones</h2>
            <Link to="/milestones" className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
              <span>View All</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MILESTONES_DATA.awards.slice(0, 3).map((item, i) => (
            <div key={i}>
              <FadeInWhenVisible delay={i * 0.1}>
                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => navigate('/milestones')}
                  className={`${item.color} p-8 rounded-[2rem] border border-ink/5 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500`}
                >
                  <Trophy size={24} className="mb-6 opacity-40" />
                  <h4 className="font-bold text-xl mb-2 leading-tight">{item.title}</h4>
                  <p className="text-sm opacity-60 font-medium">{item.event} — {item.year}</p>
                </motion.div>
              </FadeInWhenVisible>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Portfolio = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <h2 className="text-5xl font-bold">Selected Works</h2>
        <p className="text-sm opacity-50 font-mono">2023 — 2026</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PORTFOLIO_ITEMS.map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            onClick={() => navigate(`/portfolio/${item.id}`)}
            className={`${item.color} rounded-3xl overflow-hidden group cursor-pointer shadow-lg`}
          >
            <div className="aspect-video overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p className="text-sm opacity-60">{item.category}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white transition-colors">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = PORTFOLIO_ITEMS.find(p => p.id === id);

  if (!item) return <div className="py-24 text-center">Project not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12">
      <button 
        onClick={() => navigate('/portfolio')}
        className="flex items-center space-x-2 text-sm font-bold opacity-50 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft size={16} />
        <span>Back to Portfolio</span>
      </button>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${item.color} text-ink`}>
            {item.category}
          </span>
          {item.date && <span className="text-xs opacity-40 font-mono">{item.date}</span>}
        </div>
        {item.title.includes(': ') ? (
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{item.title.split(': ')[0]}</h1>
            <p className="text-xl md:text-2xl opacity-60 font-medium leading-relaxed max-w-3xl">{item.title.split(': ')[1]}</p>
          </div>
        ) : (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-3xl">{item.title}</h1>
        )}
      </div>

      <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>

      <div className="pt-12">
        {item.content || (
          <div className="text-center py-12 opacity-50 italic">
            Full case study coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

const Blog = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-black tracking-tighter">Thoughts & Musings</h2>
        <p className="opacity-60">Weekly updates on life, design, and everything in between.</p>
      </div>
      <div className="space-y-12">
        {BLOG_POSTS.map((post, i) => (
          <article 
            key={i} 
            onClick={() => navigate(`/blog/${post.id}`)}
            className="group cursor-pointer border-b border-ink/5 pb-12 hover:border-ink/20 transition-colors"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-3">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${post.color.replace('text-', 'bg-')} text-ink`}>
                    {post.category}
                  </span>
                  <span className="text-xs opacity-40">{post.date}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:translate-x-2 transition-transform">{post.title}</h3>
                <p className="text-lg opacity-70 leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center space-x-2 font-bold text-sm">
                  <span>Read More</span>
                  <span className="w-8 h-px bg-ink"></span>
                </div>
              </div>
              {post.img && (
                <div className="hidden md:block">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500 bg-ink/5">
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) return <div className="py-24 text-center">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12">
      <button 
        onClick={() => navigate('/blog')}
        className="flex items-center space-x-2 text-sm font-bold opacity-50 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft size={16} />
        <span>Back to Blog</span>
      </button>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${post.color.replace('text-', 'bg-')} text-ink`}>
            {post.category}
          </span>
          <span className="text-xs opacity-40 font-mono">{post.date}</span>
        </div>
        {post.title.includes(': ') ? (
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{post.title.split(': ')[0]}</h1>
            <p className="text-xl md:text-2xl opacity-60 font-medium leading-relaxed max-w-3xl">{post.title.split(': ')[1]}</p>
          </div>
        ) : (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-3xl">{post.title}</h1>
        )}
      </div>

      {post.img && (
        <div className="w-full rounded-[40px] overflow-hidden shadow-2xl border border-ink/5">
          <img 
            src={post.img} 
            alt={post.title} 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="pt-12">
        {post.content || (
          <div className="text-center py-12 opacity-50 italic">
            Full article coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

const LittleJoys = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="md:col-span-2 space-y-8">
      <h2 className="text-5xl font-bold">Little Joys</h2>
      <div className="grid grid-cols-2 gap-6">
        {LITTLE_JOYS_ITEMS.map((item, i) => (
          <div key={i} className={`${item.bgColor} p-8 rounded-[40px] flex flex-col items-center text-center space-y-4`}>
            <item.icon size={40} className={item.color} />
            <h3 className="font-bold text-xl">{item.title}</h3>
            <p className="text-sm opacity-70">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl">
      <h3 className="font-bold text-2xl mb-6">Currently...</h3>
      <ul className="space-y-6">
        <li className="flex items-start space-x-4">
          <div className="w-2 h-2 rounded-full bg-baby-blue-dark mt-2"></div>
          <div>
            <p className="font-bold text-sm">Reading</p>
            <p className="text-sm opacity-60">"The Courage to be Disliked"</p>
          </div>
        </li>
        <li className="flex items-start space-x-4">
          <div className="w-2 h-2 rounded-full bg-baby-pink-dark mt-2"></div>
          <div>
            <p className="font-bold text-sm">Listening</p>
            <p className="text-sm opacity-60">Spring Is Coming</p>
          </div>
        </li>
        <li className="flex items-start space-x-4">
          <div className="w-2 h-2 rounded-full bg-baby-green-dark mt-2"></div>
          <div>
            <p className="font-bold text-sm">Learning</p>
            <p className="text-sm opacity-60">Vibe Code & AWS Cert </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

const Milestones = () => (
  <div className="space-y-16">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <h2 className="text-6xl font-black tracking-tighter">Milestones</h2>
      <p className="text-lg opacity-60 max-w-md">A record of my continuous learning journey and milestones reached.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Learning Paths */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-8">
          <GraduationCap className="text-baby-blue" size={32} />
          <h3 className="text-2xl font-bold uppercase tracking-widest">Learning Paths</h3>
        </div>
        {MILESTONES_DATA.learning.map((item, i) => (
          <div key={i} className={`${item.color} p-6 rounded-3xl border border-ink/5`}>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">{item.status}</p>
            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
            <p className="text-sm opacity-60">{item.institution}</p>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-8">
          <Award className="text-baby-green" size={32} />
          <h3 className="text-2xl font-bold uppercase tracking-widest">Certifications</h3>
        </div>
        {MILESTONES_DATA.certifications.map((item, i) => (
          <div key={i} className={`${item.color} p-6 rounded-3xl border border-ink/5 flex justify-between items-center`}>
            <div>
              <h4 className="font-bold text-lg mb-1">{item.title}</h4>
              <p className="text-sm opacity-60">Issued {item.date}</p>
            </div>
            <Star size={20} className="opacity-20" />
          </div>
        ))}
      </div>

      {/* Awards */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-8">
          <Trophy className="text-baby-orange" size={32} />
          <h3 className="text-2xl font-bold uppercase tracking-widest">Awards</h3>
        </div>
        {MILESTONES_DATA.awards.map((item, i) => (
          <div key={i} className={`${item.color} p-6 rounded-3xl border border-ink/5`}>
            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
            <p className="text-sm opacity-60">{item.event} — {item.year}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/little-joys" element={<LittleJoys />} />
          <Route path="/milestones" element={<Milestones />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
