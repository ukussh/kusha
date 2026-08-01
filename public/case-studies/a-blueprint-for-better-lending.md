# The Collective Best: Loans24

In my opinion, the best loan product will be assembled by taking the best from every other option available and wiring those into one seamless borrower journey.

I then chose a worthy competitor, based on the Core Product, Target Customers, Key USPs, and Distribution Moat.

**Core Products**
Used car loans, new car loans, Loan Against Car (LAC), personal loans

**Target Customers**
Salaried professionals, first-time car buyers, thin-credit profiles, Tier 1–3 city borrowers

**Strategic Goal**
Evolve from an auto-financing arm into a inclusive fintech credit platform

**Distribution Moat**
Embedded within CARS24's **80,000+** customer base and dealer network with **₹15,000 Cr+** dealer WC loans

To build it, I chose **KreditBee** as the primary comparator as it is well documented publicly, strong in some slices and visibly broken in others. For each friction point, I asked:
**who does this slice best globally, and what does Loans24 need to adapt, and go beyond?**

[ConsumerComplaints.in](https://www.consumercomplaints.in/kreditbee-b115901/page/34)
Complaints 723, Resolved 284, Unresolved 439

[Google Play Store](https://play.google.com/store/apps/details?id=com.kreditbee.android&hl=en&gl=DE)
100M+ downloads & 4.5 Play Store rating

[RBI Penalty](https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=55160)
Reserve Bank of India has, by an order dated February 1, 2023, imposed a monetary
penalty of ₹42.48 lakh on Krazybee Services Private Limited, Bangalore for non-
compliance with certain provisions of the directions issued by RBI.

**NOTE**
KrazyBee Services Private Limited is the parent NBFC registered with the RBI, based
in Bengaluru.

# Side-By-Side Walkthrough

For each slice, the structure is:

- **Current state:** what each platform does today
- **The gap:** where friction lives, backed by reviews or data
- **Verdict:** a clear call

## Slice 1: Onboarding

### Loans24 (via Cars24 reviews)

The Loans24 has a structural advantage (80,000+ existing customers, dealer network, established trust) that is currently being squandered. The Cars24 onboarding for sellers is built around a paid plan architecture. Sellers are charged **₹1,060–₹1,800** to list, **₹350–₹700** to access the auction report, and again to relist when listings expire. None of this is disclosed upfront. The inspection agent in the field often creates the impression that one payment is sufficient.

> "They charged me ₹1,060 just to list my car for sale, but even after more than 24 hours, I didn't receive a single offer. Now they are asking an additional ₹1,500 to relist the car." — **Milan Sahana,** ⭐

> "Show good price in the app, call center people say some other price, finally after inspection say lowest rate." — **Ahamed Alameen,** ⭐

For a borrower entering the Loans24 funnel via a Cars24 car purchase or sale, the first impression of the ecosystem is one of fee extraction before value delivery.

### KreditBee

Broadly positive. Users find sign-up, KYC, and first-loan application simple and fast, even for first-time borrowers. The friction is limited to profile data rigidity. Once salary or personal details are entered, users cannot update them, causing rejections based on stale information. But there is no pre-commitment fee.

#### Verdict

KreditBee wins this slice clearly. KreditBee's onboarding earns trust on first contact.

## Slice 2: Underwriting

### Loans24

Based on the Cars24 review corpus and public job postings, Loans24 likely operates a bureau score + income document model for loan approval. Multiple reviewers describe AI misreading design curves as dents, inspectors filling in vehicle condition randomly, and post-inspection offers arriving **₹50,000–₹70,000** below the app estimate.

> "All 16 parts of their car were marked as dented or scratched despite no visible damage, with the AI reportedly misreading design curves as dents." — **Review corpus**

This is AI actively producing inaccurate outputs that determine loan collateral valuations. The inspection model is AI as a liability, not as infrastructure.

### KreditBee

In 2023, they partnered with **Digitap.ai** to analyse raw bank account statements and generate a comprehensive variable set for underwriting, automating decisions and reducing turnaround time. During the trial period alone, this gave KreditBee access to **100,000+** bank statements through the Account Aggregator (AA) framework.

> [Source: Digitap.ai](https://www.digitap.ai/enhancing-credit-underwriting-for-kreditbee.html)
> [Source: Retail Banker International](https://www.retailbankerinternational.com/news/fintech-kreditbee-taps-digitap-ai/)

After their **$280 million Series E** at a **$1.5 billion** valuation, KreditBee's CEO stated:

> "We are increasingly embedding AI into the core of our lending stack to enhance underwriting precision, strengthen risk controls, and deliver a faster, more intuitive customer experience."
> [Source: IBS Intelligence](https://ibsintelligence.com/ibsi-news/kreditbee-secures-280m-to-scale-ai-driven-lending/)

But KreditBee's underwriting has a critical flaw. Users who repay on time, repay early, or foreclose are blocked with a **"try after 2 months"** message that repeats indefinitely with no explanation.

> "It's been 2 years now. The app still says to try after 2 months, after every 2 months." — **Krishna Arjun Mani Rai,** ⭐

> "I have been using this app for almost 6 years and have always maintained 100% on-time payment record. After closing the loan, the app initially showed I was eligible for a higher limit. Then suddenly it stopped working." -**Sushma Burka,** ⭐⭐⭐

#### Verdict

KreditBee leads on infrastructure but both fail on outcomes. It has the right architecture as data based underwriting, AA integration and AI in the decision. But the model is producing outcomes (locking out loyal borrowers) that contradict its intent. Loans24 has neither the architecture nor the outcome.

## Slice 3: Collections

### Loans24 / Cars24

Aggressive outbound calling is the most universally mentioned complaint across the Cars24 review corpus. 6–7 calls per day starting from 8 AM, triggered even by users who only browsed prices without booking. DND registration is reported as ineffective. Buyers who completed purchases also report incessant post-transaction calls.

### KreditBee

Collections at KreditBee are the most emotionally charged category as agents use
abusive language, send threatening WhatsApp messages, dispatch fake legal
notices, and harass borrowers for delays of 1–12 days. The app sends EMI reminders
6–7 days before the due date and calls even after payment has already been made.
RBI imposed a ₹42.48 lakh penalty on KrazyBee Services Private Limited in February
2023 for non-compliance with RBI directions.
(Source: RBI Press Release)

> "Late by 12 days for late salary — even after adding penalty, this company sends fake legal notice paper and threat voice messages, harasses by calls." — **Paramita Sarma,** ⭐

> "Recovery agent is harassing with phone calls with rude behaviours. I have taken 7 loans from this app and never missed a single EMI." — **Nirmal Deka**, ⭐⭐⭐

#### Verdict

Both lose. Neither platform has solved collections. KreditBee's model is operationally
broken and legally exposed. Loans24's model is a spam problem. The opportunity here is collections intelligence.

# Friction Points and How AI Removes Them

## Friction 1: Underwriting

### The friction

Both platforms lean on bureau scores and income documents. **NTC (new-to-credit) borrowers and thin-file borrowers are systematically rejected or under-served.** KreditBee compounds this by penalising early repayment the algorithm **(punishing the behaviour it should reward)**.

### How it is currently handled

Rules-based bureau + document model with manual verification fallback. KreditBee has added AA as a data source, but the model logic is opaque.

### How infrastructure AI changes the answer

**Upstart (US)** has their model analysing more than **2,500** variables trained on **82 million** monthly borrower repayment events. The outcomes is they have **101% more borrowers approved at **38%** lower APRs than traditional models.**

> [In Q4 2024, 91% of loans were fully automated, for NTC borrowers specifically](https://blog.cobaltintelligence.com/post/upstarts-q4-2024-performance-500-banks-adopt-upstart-ai-lending-platform)

> [Upstart approves 44.28% more borrowers than traditional models at 36% lower APRs](https://www.upstart.com/our-story)

**Nubank (Brazil)** built this for a structurally identical market, considering a large population, underdeveloped bureau data, and massive NTC segment. In June 2024, Nubank acquired **Hyperplane,** a startup that built self-supervised foundation models trained on first-party financial transaction data.

> [In Q4 2025, Nubank posted the largest quarterly credit card market share gain inBrazil in ten quarters](https://whitesight.net/nubanks-ai-model-rewrites-credit-underwriting/)

### The critical constraint

As of December 2025, approximately 38% of borrowers in India have accounts enabled on the AA framework. Any implementation must maintain PDF-based bank statement analysis as a parallel fallback, not a legacy replacement.

> [NBFCs that launched AA-only lending in 2024–25 discovered a 62% applicationfailure rate at the data collection stage](https://precisa.in/blog/account-aggregator-lenders-guide-2026/)

## Friction 2: Collections

### The friction

Neither platform uses the data they already hold on borrower behaviour to make collections intelligent. KreditBee calls 6–7 days before EMI due dates. Loans24 calls non-customers who browsed a price. Neither is predicting who will pay, who is at risk, and who needs a different engagement channel.

## How it is currently handled

Call at **T-7, T-3, T-0, T+1.** No behavioural differentiation or empathy framework needed.

## How infrastructure AI changes the answer

**TrueAccord (US)** since 2019, have their model segment borrowers by predicted response to different engagement types as low-frequency, high-frequency, empathetic outreach. Their platform uses machine learning to predict which communication type (email, text, digital) each borrower is most likely to respond to, and at what time.

## The specific application for Loans24

Use AA-refreshed transaction data to predict intent-to-pay before the due date. A borrower whose salary hit their account 3 days ago needs a different intervention than a borrower who has had no inflows in 15 days.

# What I Would Build Differently for Loans24

## The Onboarding Stack

The application feels like a commitment before they have any information. Three ideas to fix this.

### Idea O1: Soft Eligibility Before Any Commitment ("Check Before You Apply")

This can be solved with a pre-application eligibility checker that requires zero document upload and zero hard bureau inquiry. The borrower enters five fields: **loan purpose, loan amount, monthly income, employer type and city.** The system returns an eligibility summary in under 30 seconds.

> **Building Approach**
> An application to connect a soft bureau pull with using PAN entry only (no document upload) to run a soft CIBIL inquiry.

### Idea O2: Progressive KYC

The borrower is asked for PAN, Aadhaar, salary slip, bank statement, and selfie before they have received any confirmation that they are likely to qualify. Instead, progressive KYC cam be followed, where the application unfolds in stages gated by eligibility signals.

- Stage 1 (2 fields): Mobile number + loan amount requested. System checks if this number has a Loans24/Cars24 history. If yes, skip to Stage 3.
- Stage 2 (3 fields): PAN + income + employer. Soft bureau check runs. System shows eligibility signal (Idea O1 above). Borrower decides whether to continue.
- Stage 3 (document upload): Only if Stage 2 is positive. PAN card, Aadhaar, salary slip or AA consent. Also, real-time document feedback (Idea U2 above) runs here.
- Stage 4 (final verification): Selfie + video KYC if required. Only reached by borrowers who have cleared Stages 1–3.

> **Building Approach**
> A borrower who reaches Stage 2 and drops off should be able to resume from Stage 2, not restart from Stage 1. This requires session storage tied to mobile number, not login session. Also, it measures the drop-off rates at each stage gate.
> If Stage 2 → Stage 3 drop-off is high, the eligibility signal at Stage 2 is too discouraging.

### Idea O3: AA-First Income Verification

The salary slip is the single most friction-generating document in Indian lending. It is often **unavailable** (informal employment), **outdated** (self-employed borrowers), or **inaccurate** (declared vs. actual income diverges). The AA framework provides a direct alternative.
At the income verification step, offer AA consent as the primary path, not as an alternative to the salary slip.

**"Verify your income in 30 seconds by connecting your bank account" → AA consent tap → 6 months of transaction data retrieved → income verified automatically.**

> **Building Approach**
> **Setu**, **Finvu**, and **Perfios** are the primary AA gateway providers in India. Perfios and Digitap.ai both offer pre-built income derivation models on AA data.

## The Underwriting Stack

The single biggest underwriting failure across both platforms is that borrowers are approved or rejected with no visibility into why, no signal before they invest time and documents, and no path forward when the answer is no. Three ideas to fix this, in order of implementation complexity.

### Idea U1: The Pre-Submission Eligibility

The point where a user has entered basic profile data (monthly income, employer type, loan amount requested, tenure), **before any document upload,** the system runs a soft eligibility check using available signals. Bureau score pulled with a soft inquiry (no CIBIL impact), UPI transaction pattern from AA if consent is given, and the loan request parameters. The system then shows one of these states:

- Strong eligibility: "Based on your profile, you're likely to qualify. Completing your
  application takes 8 minutes." **(The borrower is encouraged to proceed)**
- Conditional eligibility: "You may qualify, but we need to verify your income more
  carefully." **(The borrower knows exactly what the swing factor is)**

> **Building Approach**
> Applying a rule-based soft check using income bracket, employer type, and bureau band would be helpful. The model predicts approval probability. Then, integrate AA consent at this step. With a single tap, the borrower shares 6-month bank statement data. The model re-runs with richer input and produces a sharper signal.

### Idea U2: Document Feedback

Both platforms ask users to upload documents but the feedback loop is faulty. Users upload a blurry PAN card or an outdated salary slip and receive a rejection 2–3 days later with a generic **"documents not acceptable"** message.

The idea is a AI-powered document validation at the point of upload. As soon as the borrower uploads a document, the system checks:

- Is the document readable? (OCR confidence score)
- Is it the right document type? (PAN vs. Aadhaar vs. salary slip classification)
- Is the data extractable? (name, date, amount fields)
- Does the extracted data match the profile the borrower entered?

> **Building Approach**
> The core is a document classification and OCR pipeline. Als, it is needed to surface the feedback inline in the upload UI to let the borrower fix it in the same session.

### Idea U3: Explainable Rejection with a Forward Path

When a rejection is unavoidable, the current standard across both platforms is a generic. So, whenever the underwriting model outputs a rejection, the system **generates a personalised explanation like**

- "Your current credit utilisation is above 70%, which is a risk signal for new
  lenders." **(The reason)**
- "Reducing your outstanding credit card balance by approximately ₹15,000 would
  bring your utilisation below the threshold." **(What to fix)**
- "While you may not qualify for ₹2,00,000 today, you do qualify for ₹80,000 at the
  same interest rate. Would you like to proceed with that?" **(What's available now)**

> **Building Approach**
> The rejection reason must come from the model itself which requires the
> underwriting model to produce responses alongside the decision.

## Closing Argument

KreditBee’s core promise is fast and accessible credit but the friction appears later in the lifecycle, particularly post-repayment, where re-engagement constraints can limit long-term value from otherwise high-quality users.

In contrast, Cars24/Loans24 has taken a structurally different approach while prioritizing monetization and marketplace efficiency early in the journey. **This is a deliberate and understandable design choice in a supply constrained ecosystem.**

If this direction of thinking aligns, like a binding loan-against-car (LAC) pre-approval
delivered within minutes of valuation, before any upfront cost, it would shift the first interaction from evaluation to confidence while still preserving downstream monetization levers.

**The question, then, is less about identifying what to build and more about when
to layer this in to capture the maximum advantage.**

Best,
Kushagra Upadhyay
ua.kushagra@gmail.com
