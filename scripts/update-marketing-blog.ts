import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqANpM7BPe6kWNALhe2mJB-SMsot59YPs",
  authDomain: "data-d6156.firebaseapp.com",
  projectId: "data-d6156",
  storageBucket: "data-d6156.firebasestorage.app",
  messagingSenderId: "87074128954",
  appId: "1:87074128954:web:2030d6e5d68961ae18e103",
  measurementId: "G-T1GM24BVZP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newBlogData = {
  title: 'From Campaign Data to Customer Insights',
  category: 'Marketing',
  date: 'Sep 30, 2025',
  gradient: 'bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-600',
  content: `Modern marketing is data-driven. Campaigns generate massive volumes of information — impressions, clicks, conversions, customer journeys, and social engagement metrics. Yet, for many organisations, this data remains underutilised. Reports pile up in dashboards, but actionable insights are scarce.

AI-driven marketing analytics changes that. By transforming raw campaign data into meaningful customer insights, AI enables marketing teams to not only measure performance but also understand why campaigns succeed or fail, and how to improve ROI in real time.

⸻

Why Traditional Marketing Analytics Isn't Enough

Most marketing teams rely on manual dashboards or siloed tools. A campaign report might tell you that click-through rates increased 15%, but it doesn't explain:
	•	Which customer segment drove that growth
	•	What combination of channels performed best
	•	How to replicate success in the next campaign

Traditional analytics tends to be backward-looking, descriptive rather than predictive. In fast-moving markets, this leaves teams guessing about the next move.

⸻

How AI Enhances Marketing Analytics

1. Customer Segmentation at Scale
AI can process demographic, behavioural, and transactional data simultaneously. Instead of broad segments ("millennials" or "urban professionals"), machine learning uncovers micro-segments — such as "price-sensitive mobile shoppers active on weekends." This granularity enables hyper-personalised campaigns.

2. Predictive Campaign Performance
By analysing past performance, AI can predict how a new campaign might perform across different audiences and channels. Marketers can test strategies virtually before spending actual budget.

3. Attribution Beyond Last Click
AI models can assign credit across touchpoints, revealing the true drivers of conversions. For instance, an email campaign might not directly convert but may warm leads that later purchase via paid search.

4. Real-Time Optimisation
Instead of waiting until the end of a campaign, AI continuously analyses performance and suggests adjustments. Ad spend can be reallocated dynamically to maximise ROI.

⸻

Real-World Examples of AI in Marketing Decisions

📊 Case 1: E-commerce Personalisation

A global online retailer applied AI clustering algorithms to its campaign data.
	•	Problem: Traditional segmentation (age, gender) failed to capture buying behaviour.
	•	AI Solution: The model identified segments based on browsing frequency, price sensitivity, and product categories.
	•	Impact: Personalised email campaigns increased conversion rates by 22% and reduced customer churn by 15%.

⸻

📊 Case 2: B2B SaaS Lead Scoring

A SaaS provider struggled with prioritising inbound leads.
	•	Problem: Sales teams wasted time on low-quality leads flagged by manual scoring systems.
	•	AI Solution: Machine learning evaluated historical campaign engagement (whitepaper downloads, webinar attendance) and customer lifetime value to predict lead quality.
	•	Impact: Sales conversion rates improved by 18%, and sales cycle length shortened by 12%.

⸻

📊 Case 3: Omnichannel Campaign Optimisation

A consumer electronics brand ran multi-channel campaigns (social media, search ads, TV).
	•	Problem: Attribution models overvalued "last click" and undervalued earlier channels.
	•	AI Solution: An AI-powered attribution system analysed interactions across the entire journey.
	•	Impact: Reallocated 20% of budget to top-of-funnel awareness ads, leading to a 25% increase in ROI within one quarter.

⸻

Business Impact of AI-Driven Marketing Insights
	•	Higher ROI: Resources are allocated to high-performing campaigns and channels.
	•	Better Customer Retention: Segmentation reveals patterns behind churn and loyalty.
	•	Agile Decision-Making: Marketing teams can adjust campaigns mid-flight rather than waiting until post-mortem.
	•	Stronger Alignment with Sales: Predictive lead scoring improves marketing-to-sales handoff.

⸻

Challenges and Considerations
	•	Data silos: Without unified datasets across channels, insights are fragmented.
	•	Privacy concerns: AI systems must comply with GDPR and data protection regulations.
	•	Skill gaps: Marketers may need training to interpret AI outputs effectively.

Despite these hurdles, the benefits of AI-powered marketing analytics are increasingly clear.

⸻

Afterwon: Simplifying Marketing Analytics with AI

AI marketing analytics doesn't have to be reserved for companies with large data science teams. Afterwon makes it accessible to everyone.

With Afterwon, marketing teams can:
	•	Upload raw campaign data (CSV, Excel) from any platform
	•	Ask natural language questions like "Which segment has the highest ROI?"
	•	Get instant interactive charts showing performance across segments and channels
	•	Receive actionable insights that recommend specific next steps, not just numbers

Instead of drowning in dashboards, marketers using Afterwon gain clarity. Campaign data turns into customer insights, and insights turn into measurable growth.`
};

async function updateMarketingBlog() {
  try {
    const blogsRef = collection(db, 'blogs');

    // "Machine Learning in Financial Markets" 제목을 가진 블로그 찾기
    const q = query(blogsRef, where('title', '==', 'Machine Learning in Financial Markets'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('❌ Blog "Machine Learning in Financial Markets" not found');
      process.exit(1);
    }

    // 첫 번째 결과 업데이트
    const docToUpdate = querySnapshot.docs[0];
    const docRef = doc(db, 'blogs', docToUpdate.id);

    await updateDoc(docRef, newBlogData);

    console.log('✅ Blog updated successfully!');
    console.log('📝 New Title:', newBlogData.title);
    console.log('📂 New Category:', newBlogData.category);
    console.log('📅 New Date:', newBlogData.date);
    console.log('🆔 Document ID:', docToUpdate.id);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating blog:', error);
    process.exit(1);
  }
}

updateMarketingBlog();
