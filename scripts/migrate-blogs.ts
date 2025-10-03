import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

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

const blogPosts = [
  {
    title: 'Real-Time Data Processing Revolution',
    category: 'AI & Data Analysis',
    date: 'Sep 29, 2025',
    gradient: 'bg-gradient-to-br from-purple-400 via-blue-300 to-blue-500',
    content: 'Real-time data processing has revolutionized how businesses make decisions...'
  },
  {
    title: 'Machine Learning in Financial Markets',
    category: 'Finance',
    date: 'Sep 24, 2025',
    gradient: 'bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-600',
    content: 'Machine learning is transforming financial markets...'
  },
  {
    title: 'Graph Neural Networks for Social Analysis',
    category: 'Research',
    date: 'Sep 20, 2025',
    gradient: 'bg-gradient-to-br from-teal-400 via-green-300 to-emerald-500',
    content: 'Graph neural networks provide powerful tools for social network analysis...'
  },
  {
    title: 'Time Series Forecasting with Transformers',
    category: 'AI & Data Analysis',
    date: 'Sep 18, 2025',
    gradient: 'bg-gradient-to-br from-pink-400 via-purple-300 to-indigo-500',
    content: 'Transformer models are now being applied to time series forecasting...'
  },
  {
    title: 'Privacy-Preserving Analytics in Production',
    category: 'Security & Compliance',
    date: 'Sep 15, 2025',
    gradient: 'bg-gradient-to-br from-blue-400 via-indigo-300 to-purple-500',
    content: 'Privacy-preserving analytics allow organizations to gain insights while protecting user data...'
  },
  {
    title: 'Multi-Modal Data Fusion Techniques',
    category: 'Research',
    date: 'Sep 12, 2025',
    gradient: 'bg-gradient-to-br from-yellow-200 via-green-200 to-emerald-300',
    content: 'Multi-modal data fusion combines information from different sources...'
  },
  {
    title: 'Explainable AI for Transparency',
    category: 'AI & Data Analysis',
    date: 'Sep 10, 2025',
    gradient: 'bg-gradient-to-br from-orange-400 via-red-300 to-pink-500',
    content: 'Explainable AI helps build trust by making model decisions transparent...'
  },
  {
    title: 'Building Scalable Data Pipelines',
    category: 'Integrations',
    date: 'Sep 8, 2025',
    gradient: 'bg-gradient-to-br from-green-400 via-teal-300 to-cyan-500',
    content: 'Scalable data pipelines are essential for modern data infrastructure...'
  },
  {
    title: 'Zero-Trust Security Architecture',
    category: 'Security & Compliance',
    date: 'Sep 5, 2025',
    gradient: 'bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-500',
    content: 'Zero-trust architecture assumes no user or system should be trusted by default...'
  }
];

async function migrateBlogPosts() {
  try {
    const blogsRef = collection(db, 'blogs');

    for (const post of blogPosts) {
      const docRef = await addDoc(blogsRef, {
        ...post,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log(`✅ Added: ${post.title} (ID: ${docRef.id})`);
    }

    console.log('\n🎉 All blog posts migrated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error migrating blog posts:', error);
    process.exit(1);
  }
}

migrateBlogPosts();
