import { db } from '@/lib/firebase'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore'

export interface BlogPost {
  id: string
  title: string
  category: 'Finance' | 'Marketing' | 'Growth' | 'Research' | 'AI & Data Analysis' | 'Integrations' | 'Security & Compliance' | 'Company News'
  date: string
  gradient: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const BLOGS_COLLECTION = 'blogs'

export const blogService = {
  // 모든 블로그 포스트 가져오기
  async getAllBlogs(): Promise<BlogPost[]> {
    try {
      const blogsRef = collection(db, BLOGS_COLLECTION)
      const q = query(blogsRef, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as BlogPost[]
    } catch (error) {
      console.error('Error fetching blogs:', error)
      return []
    }
  },

  // 카테고리별 블로그 포스트 가져오기
  async getBlogsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const blogsRef = collection(db, BLOGS_COLLECTION)
      const q = query(
        blogsRef,
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as BlogPost[]
    } catch (error) {
      console.error('Error fetching blogs by category:', error)
      return []
    }
  },

  // 특정 블로그 포스트 가져오기
  async getBlogById(id: string): Promise<BlogPost | null> {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id)
      const blogDoc = await getDoc(blogRef)

      if (blogDoc.exists()) {
        return {
          id: blogDoc.id,
          ...blogDoc.data(),
          createdAt: blogDoc.data().createdAt?.toDate() || new Date(),
          updatedAt: blogDoc.data().updatedAt?.toDate() || new Date()
        } as BlogPost
      }
      return null
    } catch (error) {
      console.error('Error fetching blog:', error)
      return null
    }
  },

  // 새 블로그 포스트 추가
  async createBlog(blogData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const blogsRef = collection(db, BLOGS_COLLECTION)
      const now = Timestamp.now()

      const docRef = await addDoc(blogsRef, {
        ...blogData,
        createdAt: now,
        updatedAt: now
      })

      console.log('Blog created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating blog:', error)
      return null
    }
  },

  // 블로그 포스트 업데이트
  async updateBlog(id: string, blogData: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id)
      await updateDoc(blogRef, {
        ...blogData,
        updatedAt: Timestamp.now()
      })

      console.log('Blog updated:', id)
      return true
    } catch (error) {
      console.error('Error updating blog:', error)
      return false
    }
  },

  // 블로그 포스트 삭제
  async deleteBlog(id: string): Promise<boolean> {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id)
      await deleteDoc(blogRef)

      console.log('Blog deleted:', id)
      return true
    } catch (error) {
      console.error('Error deleting blog:', error)
      return false
    }
  }
}
