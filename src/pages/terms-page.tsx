import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, FileText, Scale, AlertTriangle, CheckCircle, Mail } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";

export const TermsPage = memo(() => {
    const { isDark } = useTheme();
    const lastUpdated = "January 4, 2026";

    const sections = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            icon: CheckCircle,
            content: `By accessing and using the services provided by ${COMPANY.name} ("Company," "we," "our," or "us"), you ("Client," "you," or "your") acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ("Terms"). These Terms constitute a legally binding agreement between you and ${COMPANY.name}.

If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not agree to these Terms, you may not access or use our services.

We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.`
        },
        {
            id: "services",
            title: "2. Services Description",
            icon: FileText,
            content: `${COMPANY.name} provides comprehensive digital solutions including but not limited to:

Web Development Services:
• Custom website design and development
• E-commerce solutions and online store development
• Progressive Web Applications (PWA)
• Content Management System (CMS) integration
• Website maintenance and updates
• Performance optimization and SEO

Mobile Application Development:
• Native iOS and Android applications
• Cross-platform mobile development (React Native, Flutter)
• Mobile app maintenance and support
• App Store and Play Store deployment

Cloud & Infrastructure Services:
• Cloud architecture and deployment (AWS, GCP, Azure)
• DevOps and CI/CD implementation
• Server management and monitoring
• Database design and optimization

AI & Machine Learning Solutions:
• Custom AI model development
• Machine learning integration
• Data analytics and visualization
• Chatbot and virtual assistant development

UI/UX Design Services:
• User interface design
• User experience research and testing
• Brand identity design
• Prototyping and wireframing

The specific scope, deliverables, timeline, and pricing for each project will be detailed in a separate Service Agreement or Statement of Work (SOW) mutually agreed upon by both parties.`
        },
        {
            id: "obligations",
            title: "3. Client Obligations",
            icon: Scale,
            content: `As a client of ${COMPANY.name}, you agree to:

Provide Necessary Information:
• Supply all required content, materials, and information in a timely manner
• Ensure all provided materials are accurate and do not infringe on third-party rights
• Designate a primary point of contact for communication

Communication & Feedback:
• Respond to communications and requests within reasonable timeframes
• Provide clear and constructive feedback during review phases
• Attend scheduled meetings and project reviews

Payment Obligations:
• Pay all invoices according to the agreed payment schedule
• Understand that delays in payment may result in project delays
• Cover any additional costs arising from scope changes

Access & Credentials:
• Provide necessary access to systems, accounts, and platforms
• Maintain confidentiality of shared credentials
• Notify us immediately of any security concerns

Legal Compliance:
• Ensure that your use of our services complies with all applicable laws
• Obtain necessary licenses and permissions for your content
• Respect intellectual property rights of third parties`
        },
        {
            id: "payment",
            title: "4. Payment Terms",
            icon: Shield,
            content: `Payment Structure:
Unless otherwise specified in the Service Agreement, our standard payment terms are:
• 50% deposit upon project commencement
• 25% at midpoint milestone
• 25% upon project completion

Payment Methods:
We accept payments via:
• Bank transfer (NEFT/IMPS/RTGS)
• UPI payments
• Credit/Debit cards
• International wire transfers

Invoice Terms:
• All invoices are due within 15 days of issuance unless otherwise agreed
• Late payments will incur a late fee of 2% per month
• We reserve the right to suspend work if payments are significantly overdue

Refund Policy:
• Deposits are non-refundable once work has commenced
• Partial refunds may be considered for work not yet completed
• Refund decisions are made on a case-by-case basis
• No refunds will be issued for completed and approved work

Currency:
All prices are quoted in Indian Rupees (INR) unless otherwise specified. International clients may be quoted in USD or other currencies as agreed.`
        },
        {
            id: "intellectual-property",
            title: "5. Intellectual Property Rights",
            icon: FileText,
            content: `Ownership of Deliverables:
Upon full payment, the Client will own all rights to the final deliverables as specified in the Service Agreement. This includes:
• Custom code developed specifically for the project
• Design assets and graphics created for the Client
• Documentation and user guides

${COMPANY.name} Retains Rights To:
• Pre-existing code libraries and frameworks
• Development tools and methodologies
• General knowledge and skills gained during the project
• The right to display work in our portfolio (unless otherwise agreed)

Third-Party Components:
• Some projects may include third-party libraries, frameworks, or assets
• These remain subject to their respective licenses
• We will inform you of any significant third-party dependencies

Client Materials:
• You retain ownership of all materials you provide to us
• You grant us a license to use these materials solely for project purposes
• You warrant that you have the right to use all provided materials

Attribution:
Unless explicitly waived in writing, ${COMPANY.name} reserves the right to place a small, tasteful credit link on delivered websites and applications.`
        },
        {
            id: "confidentiality",
            title: "6. Confidentiality",
            icon: Shield,
            content: `Mutual Confidentiality:
Both parties agree to maintain the confidentiality of any proprietary or sensitive information disclosed during the course of the engagement.

Confidential Information Includes:
• Business strategies and plans
• Financial information and pricing
• Technical specifications and source code
• Customer data and personal information
• Any information marked as "Confidential"

Obligations:
• Use confidential information only for purposes related to the project
• Not disclose confidential information to third parties without consent
• Take reasonable measures to protect confidential information
• Return or destroy confidential information upon project completion

Exceptions:
Confidentiality obligations do not apply to information that:
• Is publicly available through no fault of the receiving party
• Was known to the receiving party before disclosure
• Is independently developed without use of confidential information
• Is required to be disclosed by law

Duration:
Confidentiality obligations survive for three (3) years after the termination of the engagement.`
        },
        {
            id: "warranties",
            title: "7. Warranties & Disclaimers",
            icon: AlertTriangle,
            content: `Our Warranties:
${COMPANY.name} warrants that:
• Services will be performed in a professional and workmanlike manner
• Deliverables will substantially conform to agreed specifications
• We have the right to provide the services and deliverables
• Our work will not knowingly infringe third-party intellectual property rights

Bug Fix Period:
We provide a 30-day warranty period after project delivery during which we will fix any bugs or defects in our work at no additional cost. This warranty covers:
• Functional bugs that prevent features from working as specified
• Visual inconsistencies from approved designs
• Performance issues directly caused by our code

Disclaimer:
Except as expressly stated above, services are provided "AS IS" without warranties of any kind. We specifically disclaim:
• Implied warranties of merchantability or fitness for a particular purpose
• Warranties regarding third-party services, hosting, or infrastructure
• Guarantees of specific business outcomes or results

Third-Party Services:
We are not responsible for the performance, availability, or security of third-party services, APIs, or platforms integrated into your project.`
        },
        {
            id: "limitation",
            title: "8. Limitation of Liability",
            icon: Scale,
            content: `Maximum Liability:
The total liability of ${COMPANY.name} for any claims arising from or related to these Terms or our services shall not exceed the total amount paid by the Client for the specific project giving rise to the claim.

Exclusion of Damages:
In no event shall ${COMPANY.name} be liable for:
• Indirect, incidental, special, consequential, or punitive damages
• Loss of profits, revenue, data, or business opportunities
• Damages arising from the use or inability to use our deliverables
• Damages resulting from unauthorized access to or alteration of your data

Exceptions:
These limitations do not apply to:
• Liability arising from gross negligence or willful misconduct
• Liability that cannot be excluded by applicable law
• Breach of confidentiality obligations

Client Responsibility:
The Client is responsible for:
• Maintaining backups of all data and content
• Implementing appropriate security measures
• Ensuring compliance with applicable laws and regulations
• The consequences of any instructions provided to us`
        },
        {
            id: "termination",
            title: "9. Termination",
            icon: AlertTriangle,
            content: `Termination by Client:
You may terminate the engagement at any time by providing written notice. Upon termination:
• Payment is due for all work completed to date
• Any prepaid amounts may be credited toward completed work
• We will provide all completed deliverables and work-in-progress

Termination by ${COMPANY.name}:
We may terminate the engagement if:
• Payment is overdue by more than 30 days
• You breach any material term of these Terms
• You fail to provide necessary cooperation or materials
• Continuing the engagement would be unlawful or unethical

Effect of Termination:
Upon termination:
• All outstanding invoices become immediately due
• Both parties must return or destroy confidential information
• License grants terminate except as specified in the Service Agreement
• Provisions that by their nature should survive will remain in effect

Force Majeure:
Neither party shall be liable for delays or failures in performance resulting from circumstances beyond reasonable control, including natural disasters, war, terrorism, epidemics, government actions, or internet outages.`
        },
        {
            id: "dispute",
            title: "10. Dispute Resolution",
            icon: Scale,
            content: `Governing Law:
These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.

Informal Resolution:
Before initiating any formal dispute resolution, both parties agree to attempt to resolve any dispute informally through good-faith negotiations for a period of at least 30 days.

Mediation:
If informal negotiations fail, the parties agree to submit to mediation before a mutually agreed-upon mediator before pursuing arbitration or litigation.

Arbitration:
Any dispute that cannot be resolved through mediation shall be finally settled by binding arbitration in Chennai, Tamil Nadu, India, in accordance with the Arbitration and Conciliation Act, 1996. The language of arbitration shall be English.

Court Jurisdiction:
For any disputes not subject to arbitration, the courts of Chennai, Tamil Nadu, India shall have exclusive jurisdiction.

Legal Fees:
In any legal action to enforce these Terms, the prevailing party shall be entitled to recover reasonable attorney's fees and costs.`
        },
        {
            id: "general",
            title: "11. General Provisions",
            icon: FileText,
            content: `Entire Agreement:
These Terms, together with any Service Agreement and its attachments, constitute the entire agreement between the parties and supersede all prior negotiations, representations, or agreements relating to this subject matter.

Amendment:
These Terms may only be modified by a written agreement signed by both parties, except that we may update these Terms on our website with reasonable notice.

Waiver:
The failure of either party to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.

Severability:
If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.

Assignment:
You may not assign or transfer your rights under these Terms without our prior written consent. We may assign our rights and obligations to a successor or affiliate.

Independent Contractors:
The parties are independent contractors. Nothing in these Terms creates a partnership, joint venture, employment, or agency relationship.

Notices:
All notices shall be in writing and delivered via email to the addresses specified in the Service Agreement. Notices are deemed received on the business day sent if by email.

Survival:
Provisions regarding intellectual property, confidentiality, limitation of liability, and dispute resolution shall survive termination of these Terms.`
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
                        ? "bg-gradient-to-b from-violet-900/20 via-black to-black"
                        : "bg-gradient-to-b from-violet-100/30 via-gray-50 to-gray-50"
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
                        <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black">
                                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                                    Terms & Conditions
                                </span>
                            </h1>
                            <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                                Last updated: {lastUpdated}
                            </p>
                        </div>
                    </div>

                    <p className={cn(
                        "text-lg leading-relaxed max-w-2xl",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        Please read these terms and conditions carefully before using {COMPANY.name}'s services.
                        These terms govern your use of our services and establish the legal relationship between you and {COMPANY.name}.
                    </p>
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
                                        isDark ? "text-gray-400 hover:text-violet-400" : "text-gray-600 hover:text-violet-600"
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
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
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
                        isDark ? "bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30 border-white/10" : "bg-gradient-to-br from-violet-100/50 to-fuchsia-100/50 border-violet-200"
                    )}>
                        <Mail className="w-12 h-12 mx-auto mb-4 text-violet-500" />
                        <h2 className={cn(
                            "text-2xl font-bold mb-4",
                            isDark ? "text-white" : "text-gray-800"
                        )}>Questions About These Terms?</h2>
                        <p className={cn(
                            "mb-6",
                            isDark ? "text-gray-300" : "text-gray-600"
                        )}>
                            If you have any questions about these Terms and Conditions, please contact us at:
                        </p>
                        <a
                            href={`mailto:${COMPANY.email}`}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                        >
                            <Mail className="w-4 h-4" />
                            {COMPANY.email}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
});

TermsPage.displayName = "TermsPage";

export default TermsPage;