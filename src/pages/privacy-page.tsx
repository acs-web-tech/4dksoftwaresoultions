import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, Database, Globe, UserCheck, Bell, Trash2, Mail } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";

export const PrivacyPage = memo(() => {
    const { isDark } = useTheme();
    const lastUpdated = "January 4, 2026";
    const effectiveDate = "January 4, 2026";

    const sections = [
        {
            id: "introduction",
            title: "1. Introduction",
            icon: Shield,
            content: `Welcome to ${COMPANY.name}'s Privacy Policy.

${COMPANY.name} ("Company," "we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with us in any way.

Our Privacy Commitment:
We believe that privacy is a fundamental right. We are committed to:
• Being transparent about the data we collect and how we use it
• Giving you control over your personal information
• Protecting your data with industry-standard security measures
• Only collecting data that is necessary for providing our services
• Never selling your personal information to third parties

This Privacy Policy applies to all information collected through our website (${COMPANY.name.toLowerCase().replace(' ', '')}.com), mobile applications, and any related services, sales, marketing, or events.

Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.`
        },
        {
            id: "information-collected",
            title: "2. Information We Collect",
            icon: Database,
            content: `We collect information in various ways depending on how you interact with us:

Personal Information You Provide:
When you use our services or contact us, you may provide:

• Contact Information: Name, email address, phone number, company name, job title, and mailing address
• Account Information: Username, password, and account preferences
• Communication Data: Messages, feedback, and correspondence with our team
• Project Information: Requirements, specifications, and business details relevant to your project
• Payment Information: Billing address, credit card or bank account details (processed securely through third-party payment processors)

Information Collected Automatically:
When you visit our website, we automatically collect:

• Device Information: IP address, browser type and version, operating system, device type, and unique device identifiers
• Usage Data: Pages visited, time spent on pages, click patterns, navigation paths, and referring URLs
• Location Data: General geographic location based on IP address
• Cookies and Similar Technologies: Information collected through cookies, web beacons, and pixel tags

Information from Third Parties:
We may receive information about you from:

• Social Media Platforms: If you interact with us through social media
• Analytics Providers: Aggregated data about website usage
• Business Partners: Referral information when you're introduced by partners
• Public Sources: Publicly available information relevant to our business relationship`
        },
        {
            id: "how-we-use",
            title: "3. How We Use Your Information",
            icon: Eye,
            content: `We use the information we collect for the following purposes:

Service Delivery:
• Providing, maintaining, and improving our services
• Processing and fulfilling project requests
• Communicating project updates and deliverables
• Managing client accounts and relationships
• Processing payments and billing

Communication:
• Responding to inquiries and providing customer support
• Sending project updates, progress reports, and notifications
• Sharing newsletters, industry insights, and company updates (with your consent)
• Notifying you about changes to our services or policies

Business Operations:
• Analyzing usage patterns to improve our website and services
• Conducting internal research and analytics
• Developing new products, features, and services
• Training and quality assurance purposes

Legal and Security:
• Complying with legal obligations and regulatory requirements
• Enforcing our terms and conditions
• Protecting against fraudulent, unauthorized, or illegal activity
• Maintaining the security and integrity of our systems

Marketing (With Your Consent):
• Sending promotional materials about our services
• Personalizing content and recommendations
• Conducting market research and surveys
• Displaying targeted advertisements (on third-party platforms)

Legal Basis for Processing (GDPR):
For users in the European Economic Area, we process your data based on:
• Your consent
• Performance of a contract
• Compliance with legal obligations
• Our legitimate business interests`
        },
        {
            id: "sharing",
            title: "4. Information Sharing and Disclosure",
            icon: Globe,
            content: `We may share your information in the following circumstances:

Service Providers:
We work with third-party companies that help us deliver our services:
• Cloud hosting providers (AWS, Google Cloud, Azure)
• Payment processors and banking partners
• Email and communication platforms
• Analytics and monitoring tools
• Project management and collaboration tools

These providers are contractually bound to protect your information and may only use it to provide services on our behalf.

Business Transfers:
If ${COMPANY.name} is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change and any choices you may have.

Legal Requirements:
We may disclose your information if required to do so by law or in response to:
• Court orders, subpoenas, or legal processes
• Government or regulatory requests
• Investigations of potential Terms of Service violations
• Protection of rights, property, or safety

With Your Consent:
We may share your information with third parties when you have given us explicit consent to do so.

Aggregated or De-identified Data:
We may share aggregated or de-identified information that cannot reasonably be used to identify you for research, analytics, or other purposes.

What We Never Do:
• We NEVER sell your personal information to third parties
• We NEVER share your data with unrelated third parties for their marketing purposes
• We NEVER use your project information for purposes other than serving you`
        },
        {
            id: "cookies",
            title: "5. Cookies and Tracking Technologies",
            icon: Eye,
            content: `What Are Cookies?
Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience by remembering your preferences and understanding how you use our site.

Types of Cookies We Use:

Essential Cookies:
• Required for the website to function properly
• Enable core features like page navigation and secure areas
• Cannot be disabled

Functional Cookies:
• Remember your preferences and settings
• Enable personalized features
• Improve your browsing experience

Analytics Cookies:
• Help us understand how visitors interact with our website
• Collect information about pages visited, time spent, and errors encountered
• Provided by services like Google Analytics

Marketing Cookies:
• Track your activity across websites
• Help us deliver relevant advertisements
• May be set by third-party advertising partners

Managing Cookies:
You can control and manage cookies through your browser settings. Options include:
• Blocking all cookies
• Accepting only first-party cookies
• Deleting cookies when you close your browser
• Receiving notifications when cookies are set

Please note that disabling certain cookies may affect the functionality of our website.

Do Not Track:
Some browsers have a "Do Not Track" feature that lets you tell websites not to track you. We currently do not respond to Do Not Track signals, but we respect your privacy preferences as outlined in this policy.

Third-Party Tracking:
Our website may contain links to third-party websites or embed content from third parties. These third parties may use their own cookies and tracking technologies. We are not responsible for their privacy practices.`
        },
        {
            id: "data-security",
            title: "6. Data Security",
            icon: Lock,
            content: `Our Security Measures:
We implement comprehensive security measures to protect your personal information:

Technical Safeguards:
• SSL/TLS encryption for all data transmission
• Encrypted storage for sensitive data
• Regular security audits and vulnerability assessments
• Firewalls and intrusion detection systems
• Secure coding practices and code reviews

Access Controls:
• Role-based access controls for employee access
• Multi-factor authentication for sensitive systems
• Regular access reviews and permission audits
• Principle of least privilege for data access

Operational Security:
• Regular employee security training
• Background checks for employees with data access
• Incident response and breach notification procedures
• Secure data backup and disaster recovery plans

Physical Security:
• Secure data center facilities
• Access controls and monitoring
• Environmental controls and protection

Third-Party Security:
• Due diligence on all service providers
• Contractual security requirements
• Regular vendor security assessments

Limitations:
While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but commit to promptly addressing any security incidents.

Reporting Security Concerns:
If you believe you have discovered a security vulnerability or have concerns about data security, please contact us immediately at ${COMPANY.email}.`
        },
        {
            id: "data-retention",
            title: "7. Data Retention",
            icon: Database,
            content: `How Long We Keep Your Data:
We retain your personal information for as long as necessary to:
• Provide our services and fulfill our contractual obligations
• Comply with legal and regulatory requirements
• Resolve disputes and enforce our agreements
• Maintain business records for audit purposes

Specific Retention Periods:

Client Project Data:
• Active project data: Duration of the project plus 2 years
• Completed project archives: 7 years for legal and warranty purposes
• Financial records: 7-10 years as required by tax laws

Communication Records:
• Customer support inquiries: 3 years
• Email correspondence: 5 years
• Contract and legal documents: 10 years

Website Analytics:
• Aggregated analytics: Indefinitely
• Individual session data: 26 months

Marketing Data:
• Newsletter subscriptions: Until unsubscribed plus 1 year
• Marketing preferences: 3 years from last interaction

After Retention Period:
When data is no longer needed, we will:
• Securely delete or anonymize the information
• Remove it from our active systems
• Ensure it cannot be recovered or reconstructed

Your Deletion Requests:
You may request deletion of your data at any time. We will honor your request except where we are required by law to retain certain information.`
        },
        {
            id: "your-rights",
            title: "8. Your Privacy Rights",
            icon: UserCheck,
            content: `Depending on your location, you may have the following rights regarding your personal information:

Right to Access:
You can request a copy of the personal information we hold about you, including:
• Categories of data collected
• Sources of the data
• Purposes for processing
• Third parties with whom we share data

Right to Rectification:
You can request that we correct any inaccurate or incomplete information about you.

Right to Deletion:
You can request that we delete your personal information, subject to certain exceptions required by law.

Right to Data Portability:
You can request to receive your data in a structured, machine-readable format and transfer it to another service provider.

Right to Restrict Processing:
You can request that we limit the processing of your personal information in certain circumstances.

Right to Object:
You can object to the processing of your personal information for direct marketing or based on our legitimate interests.

Right to Withdraw Consent:
Where processing is based on consent, you can withdraw your consent at any time without affecting the lawfulness of prior processing.

Right to Non-Discrimination:
We will not discriminate against you for exercising any of your privacy rights.

How to Exercise Your Rights:
To exercise any of these rights, please contact us at:
• Email: ${COMPANY.email}
• Response Time: We will respond within 30 days (or as required by applicable law)

Verification:
We may need to verify your identity before processing your request to protect your privacy and security.`
        },
        {
            id: "international",
            title: "9. International Data Transfers",
            icon: Globe,
            content: `Where Your Data May Be Processed:
${COMPANY.name} is based in India. Your information may be transferred to and processed in India and other countries where our service providers operate.

Countries may include:
• India (primary operations)
• United States (cloud infrastructure)
• European Union (certain services)
• Other countries where our partners operate

Safeguards for International Transfers:
When we transfer data internationally, we ensure appropriate safeguards are in place:

Standard Contractual Clauses:
We use EU-approved Standard Contractual Clauses when transferring data from the EEA to countries without adequate data protection laws.

Data Processing Agreements:
All service providers handling personal data are bound by contractual obligations to protect the data.

Privacy Shield (where applicable):
We work with service providers who are certified under relevant privacy frameworks.

Security Measures:
Regardless of where data is processed, we apply the same security measures described in this policy.

Your Consent:
By using our services, you consent to the transfer of your information to India and other countries as described here.

Questions About Transfers:
If you have questions about how your data is transferred or protected, please contact us.`
        },
        {
            id: "children",
            title: "10. Children's Privacy",
            icon: Shield,
            content: `Age Restrictions:
Our services are not intended for children under the age of 18. We do not knowingly collect, use, or disclose personal information from children under 18.

Business-to-Business Focus:
${COMPANY.name} provides business-to-business services. Our typical clients are:
• Businesses and organizations
• Entrepreneurs and startups
• Professionals and consultants
• Educational institutions and non-profits

Parental Rights:
If you are a parent or guardian and believe your child has provided us with personal information without your consent, please contact us immediately. We will take steps to:
• Verify the claim
• Delete the child's information from our records
• Prevent further collection of data from the child

How to Report:
If you believe we have collected information from a child under 18, please contact us at ${COMPANY.email} with subject line "Child Privacy Concern."`
        },
        {
            id: "updates",
            title: "11. Updates to This Policy",
            icon: Bell,
            content: `Policy Changes:
We may update this Privacy Policy from time to time to reflect:
• Changes in our practices or services
• New legal or regulatory requirements
• Technological developments
• Feedback from users and stakeholders

How We Notify You:
When we make changes to this policy, we will:
• Update the "Last Updated" date at the top of this page
• Post the revised policy on our website
• Send email notification for material changes (if we have your email)
• Display a notice on our website for significant updates

Review Recommendation:
We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.

Your Continued Use:
Your continued use of our services after any changes to this Privacy Policy constitutes your acceptance of the updated policy.

Previous Versions:
If you would like to review previous versions of this Privacy Policy, please contact us and we will provide them upon request.

Questions About Changes:
If you have questions about any changes to this policy, please contact us before continuing to use our services.`
        },
        {
            id: "contact",
            title: "12. Contact Us",
            icon: Mail,
            content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:

${COMPANY.name}

Email: ${COMPANY.email}
Phone: ${COMPANY.phone}
Address: ${COMPANY.address}

For Privacy-Specific Inquiries:
Please use the subject line "Privacy Inquiry" when contacting us about privacy matters.

Response Time:
We aim to respond to all privacy-related inquiries within:
• General inquiries: 5 business days
• Data access requests: 30 days
• Urgent security concerns: 24 hours

Data Protection Officer:
For matters requiring attention of our Data Protection Officer, please specify "Attention: DPO" in your communication.

Complaints:
If you are not satisfied with our response to your privacy concerns, you may:
• Escalate the matter within our organization
• File a complaint with a supervisory authority (for EU residents, this would be your local Data Protection Authority)

Feedback Welcome:
We welcome your feedback on our privacy practices. Your input helps us improve our data protection measures and maintain your trust.`
        }
    ];

    return (
        <div className={cn(
            "min-h-screen w-screen overflow-hidden",
            isDark ? "bg-black text-white" : "bg-gray-50 text-gray-800"
        )}>
            {/* Hero Section */}
            <section className="relative py-32 px-6">
                <div className={cn(
                    "absolute inset-0",
                    isDark
                        ? "bg-gradient-to-b from-emerald-900/20 via-black to-black"
                        : "bg-gradient-to-b from-emerald-100/30 via-gray-50 to-gray-50"
                )} />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <Link
                        to="/"
                        className={cn(
                            "inline-flex items-center gap-2 mb-8 transition-colors",
                            isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"
                        )}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black">
                                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                    Privacy Policy
                                </span>
                            </h1>
                            <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                                Last updated: {lastUpdated} | Effective: {effectiveDate}
                            </p>
                        </div>
                    </div>

                    <p className={cn(
                        "text-lg leading-relaxed max-w-2xl",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        Your privacy is important to us. This Privacy Policy explains how {COMPANY.name} collects, uses,
                        protects, and handles your personal information when you use our services.
                    </p>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        {[
                            { icon: Lock, text: "Your data is encrypted and secure" },
                            { icon: Trash2, text: "We never sell your information" },
                            { icon: UserCheck, text: "You control your data" }
                        ].map((item, i) => (
                            <div key={i} className={cn(
                                "flex items-center gap-3 p-4 rounded-xl border",
                                isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
                            )}>
                                <item.icon className="w-5 h-5 text-emerald-500" />
                                <span className={cn(
                                    "text-sm font-medium",
                                    isDark ? "text-gray-300" : "text-gray-600"
                                )}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Table of Contents */}
            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className={cn(
                        "p-6 rounded-2xl border",
                        isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
                    )}>
                        <h2 className={cn(
                            "text-lg font-bold mb-4",
                            isDark ? "text-white" : "text-gray-800"
                        )}>Table of Contents</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className={cn(
                                        "text-sm transition-colors",
                                        isDark ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"
                                    )}
                                >
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <article
                                key={section.id}
                                id={section.id}
                                className={cn(
                                    "p-8 rounded-2xl border scroll-mt-24",
                                    isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
                                )}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className={cn(
                                        "text-2xl font-bold",
                                        isDark ? "text-white" : "text-gray-800"
                                    )}>{section.title}</h2>
                                </div>
                                <div className={cn(
                                    "prose max-w-none",
                                    isDark ? "prose-invert prose-gray" : "prose-gray"
                                )}>
                                    <div className={cn(
                                        "whitespace-pre-line text-base leading-relaxed",
                                        isDark ? "text-gray-300" : "text-gray-600"
                                    )}>
                                        {section.content}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className={cn(
                        "p-8 rounded-2xl border text-center",
                        isDark ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-white/10" : "bg-gradient-to-br from-emerald-100/50 to-teal-100/50 border-emerald-200"
                    )}>
                        <Shield className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
                        <h2 className={cn(
                            "text-2xl font-bold mb-4",
                            isDark ? "text-white" : "text-gray-800"
                        )}>Your Privacy Matters</h2>
                        <p className={cn(
                            "mb-6 max-w-xl mx-auto",
                            isDark ? "text-gray-300" : "text-gray-600"
                        )}>
                            We take your privacy seriously. If you have any questions or concerns about how we handle your data,
                            or if you want to exercise any of your privacy rights, please don't hesitate to contact us.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href={`mailto:${COMPANY.email}`}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                            >
                                <Mail className="w-4 h-4" />
                                Contact Us
                            </a>
                            <Link
                                to="/terms"
                                className={cn(
                                    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2 transition-all",
                                    isDark ? "border-white/20 text-white hover:bg-white/10" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                View Terms & Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

PrivacyPage.displayName = "PrivacyPage";

export default PrivacyPage;