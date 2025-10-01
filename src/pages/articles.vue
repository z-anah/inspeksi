<script setup>
import AccordionLayout from '@/views/front-pages/community/articles/accordion-layout.vue'
import ArticlesSidebar from '@/views/front-pages/community/articles/articles-sidebar.vue'
import CardGridLayout from '@/views/front-pages/community/articles/card-grid-layout.vue'
import CarouselLayout from '@/views/front-pages/community/articles/carousel-layout.vue'
import CategoryTabbedLayout2 from '@/views/front-pages/community/articles/category-tabbed-layout-2.vue'
import CategoryTabbedLayout from '@/views/front-pages/community/articles/category-tabbed-layout.vue'
import FeaturedSpotlightLayout from '@/views/front-pages/community/articles/featured-spotlight-layout.vue'
import ListThumbnailsLayout from '@/views/front-pages/community/articles/list-thumbnails-layout.vue'
import MagazineStyleLayout from '@/views/front-pages/community/articles/magazine-style-layout.vue'
import MasonryLayout from '@/views/front-pages/community/articles/masonry-layout.vue'
import MinimalTextLayout from '@/views/front-pages/community/articles/minimal-text-layout.vue'
import TimelineLayout from '@/views/front-pages/community/articles/timeline-layout.vue'
import VisualHeavyLayout from '@/views/front-pages/community/articles/visual-heavy-layout.vue'
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import { useConfigStore } from '@core/stores/config'
import { ref } from 'vue'

const store = useConfigStore()
store.skin = 'default'

const articles = ref([
  {
    id: 1,
    title: "Improving Front Office Services",
    author: "Jane Doe",
    authorRole: "Community Manager",
    date: "Sept 25, 2025",
    readingTime: "5 min read",
    excerpt: "How the front office can enhance community engagement with modern tools and streamlined processes that benefit everyone.",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=250&fit=crop",
    category: "Rilis",
    tags: ["services", "improvement", "community"],
    views: 245,
    likes: 18,
    featured: true
  },
  {
    id: 2,
    title: "Stories from the Community",
    author: "John Smith",
    authorRole: "Local Journalist",
    date: "Sept 20, 2025",
    readingTime: "3 min read",
    excerpt: "Voices and stories that inspire change within the local environment, showcasing real impact and transformation.",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=250&fit=crop",
    category: "Kisah",
    tags: ["stories", "inspiration", "change"],
    views: 189,
    likes: 32,
    featured: false
  },
  {
    id: 3,
    title: "New Digital Tools for Better Communication",
    author: "Maria Garcia",
    authorRole: "Tech Coordinator",
    date: "Sept 15, 2025",
    readingTime: "7 min read",
    excerpt: "Exploring innovative apps and platforms that facilitate better communication between community members and local government.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    category: "Rilis",
    tags: ["technology", "communication", "digital"],
    views: 156,
    likes: 24,
    featured: false
  },
  {
    id: 4,
    title: "Policy Updates and Community Impact",
    author: "David Wilson",
    authorRole: "Policy Analyst",
    date: "Sept 10, 2025",
    readingTime: "4 min read",
    excerpt: "Recent changes to community office policies and their direct impact on residents' daily lives and local services.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    category: "Rilis",
    tags: ["policy", "updates", "impact"],
    views: 203,
    likes: 15,
    featured: false
  },
  {
    id: 5,
    title: "Community Garden Success Story",
    author: "Sarah Chen",
    authorRole: "Environmental Coordinator",
    date: "Sept 8, 2025",
    readingTime: "6 min read",
    excerpt: "How our neighborhood transformed an empty lot into a thriving community garden that brings neighbors together.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
    category: "Kisah",
    tags: ["environment", "community", "success"],
    views: 312,
    likes: 45,
    featured: true
  },
  {
    id: 6,
    title: "Youth Leadership Program Launch",
    author: "Michael Rodriguez",
    authorRole: "Youth Program Director",
    date: "Sept 5, 2025",
    readingTime: "4 min read",
    excerpt: "Announcing our new youth leadership initiative designed to empower young community members to drive positive change.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop",
    category: "Rilis",
    tags: ["youth", "leadership", "program"],
    views: 178,
    likes: 28,
    featured: false
  },
  {
    id: 7,
    title: "Local Business Spotlight: Martinez Bakery",
    author: "Lisa Thompson",
    authorRole: "Business Liaison",
    date: "Sept 3, 2025",
    readingTime: "5 min read",
    excerpt: "Celebrating 30 years of Martinez Bakery and their contribution to our community's culture and economy.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
    category: "Kisah",
    tags: ["business", "spotlight", "local"],
    views: 267,
    likes: 38,
    featured: false
  },
  {
    id: 8,
    title: "Community Health Initiative Results",
    author: "Dr. Angela Foster",
    authorRole: "Public Health Director",
    date: "Aug 30, 2025",
    readingTime: "8 min read",
    excerpt: "Comprehensive report on our six-month community health program and the positive outcomes achieved for residents.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    category: "Opini",
    tags: ["health", "initiative", "results"],
    views: 234,
    likes: 41,
    featured: true
  }
])

const recentArticles = ref([
  { id: 1, title: "New Policy Updates and Community Impact", date: "Sept 10, 2025" },
  { id: 2, title: "Team Achievements This Month", date: "Sept 8, 2025" },
  { id: 3, title: "Tips for Better Communication", date: "Sept 5, 2025" },
  { id: 4, title: "Community Safety Guidelines", date: "Sept 2, 2025" },
  { id: 5, title: "Upcoming Infrastructure Projects", date: "Aug 28, 2025" },
  { id: 6, title: "Volunteer Appreciation Event", date: "Aug 25, 2025" }
])

const categories = ref(["Opini", "Kisah", "Rilis"])

const events = ref([
  { id: 1, name: "Community Gathering", date: "Oct 10, 2025", time: "6:00 PM", location: "Community Center" },
  { id: 2, name: "Workshop: Digital Services", date: "Oct 15, 2025", time: "2:00 PM", location: "Library Meeting Room" },
  { id: 3, name: "Youth Leadership Training", date: "Oct 22, 2025", time: "10:00 AM", location: "School Auditorium" },
  { id: 4, name: "Business Networking Event", date: "Oct 28, 2025", time: "7:00 PM", location: "Chamber of Commerce" },
  { id: 5, name: "Community Health Fair", date: "Nov 5, 2025", time: "9:00 AM", location: "Town Square" }
])

const spotlight = ref({
  name: "Maria Lopez",
  quote: "This community helped me share my story and connect with others."
})

const testimonials = ref([
  { id: 1, text: "Amazing support from the front office team. They made the permit process so much easier.", author: "Alex P.", role: "Local Business Owner" },
  { id: 2, text: "I feel more connected to the community now. The events and programs are fantastic.", author: "Samira K.", role: "Resident" },
  { id: 3, text: "The youth program changed my perspective and gave me leadership skills I use every day.", author: "Jordan M.", role: "Program Graduate" },
  { id: 4, text: "Excellent communication and transparency from the community office.", author: "Robert L.", role: "Community Volunteer" },
  { id: 5, text: "The digital tools have made accessing services so much more convenient.", author: "Elena V.", role: "Senior Resident" }
])

const partners = ref([
  { id: 1, name: "Local Chamber", logo: "https://via.placeholder.com/80x40?text=Chamber" },
  { id: 2, name: "Community Bank", logo: "https://via.placeholder.com/80x40?text=Bank" },
  { id: 3, name: "Regional Health", logo: "https://via.placeholder.com/80x40?text=Health" },
  { id: 4, name: "Education Foundation", logo: "https://via.placeholder.com/80x40?text=Education" },
  { id: 5, name: "Environmental Group", logo: "https://via.placeholder.com/80x40?text=Green" },
  { id: 6, name: "Tech Collaborative", logo: "https://via.placeholder.com/80x40?text=Tech" }
])

const faqs = ref([
  { id: 1, question: "How can I submit a permit application?", category: "Services" },
  { id: 2, question: "Where do I find community event schedules?", category: "Events" },
  { id: 3, question: "Who do I contact for neighborhood concerns?", category: "Support" },
  { id: 4, question: "How do I register for community programs?", category: "Programs" },
  { id: 5, question: "What are the office hours and contact information?", category: "Contact" },
  { id: 6, question: "How can I volunteer for community initiatives?", category: "Volunteer" },
  { id: 7, question: "Where can I access community resources and services?", category: "Resources" },
  { id: 8, question: "How do I report community issues or suggestions?", category: "Feedback" }
])

const searchQuery = ref("")

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})
</script>

<template>
  <Navbar />

  <div class="checkout-card">
    <VContainer class="py-8" style="max-width: 1400px;">
      <VRow>
        <!-- Main Column -->
        <VCol cols="12" lg="8">
          <h1 class="text-h3 font-weight-bold mb-6">Hello Community Articles</h1>

          <div class="d-flex flex-column ga-12">
            <CategoryTabbedLayout2 :articles="articles" :categories="categories" />
          </div>
        </VCol>

        <!-- Sidebar -->
        <VCol cols="12" lg="4">
          <ArticlesSidebar :recent-articles="recentArticles" :categories="categories" :events="events"
            :spotlight="spotlight" :testimonials="testimonials" :partners="partners" :faqs="faqs"
            v-model:search-query="searchQuery" />
        </VCol>
      </VRow>
    </VContainer>
  </div>

  <Footer />
</template>

<style lang="scss">
.checkout-card {
  margin-block: 10.5rem 5.25rem;

  .v-container {
    max-width: 1400px !important;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .checkout-page {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (max-width: 600px) {
  .checkout-card {
    margin-block-start: 6rem;
  }
}
</style>
