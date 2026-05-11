import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, BarChart3, Award, Play, CheckCircle, Lock, Star } from 'lucide-react'
import MainLayout, { PageContainer, PageHeader, Section } from '../components/layout/MainLayout'
import { Card, Badge } from '../components/ui/FormElements'
import Button from '../components/ui/Button'
import { courses } from '../data/mockData'
import { fadeInUp, staggerContainer } from '../utils/animations'

// Lessons for selected course
const courseLessons = [
  { id: 1, title: 'Introduction to Stocks', duration: '12 min', completed: true },
  { id: 2, title: 'How Stock Market Works', duration: '15 min', completed: true },
  { id: 3, title: 'Reading Stock Charts', duration: '18 min', completed: false },
  { id: 4, title: 'Bull & Bear Markets', duration: '14 min', completed: false },
  { id: 5, title: 'Fundamental Analysis', duration: '22 min', completed: false, locked: true },
  { id: 6, title: 'Technical Analysis Basics', duration: '20 min', completed: false, locked: true },
]

// Learning paths
const learningPaths = [
  { title: 'Beginner Path', courses: 4, time: '12 weeks', progress: 45 },
  { title: 'Intermediate Path', courses: 3, time: '8 weeks', progress: 0 },
  { title: 'Advanced Path', courses: 2, time: '10 weeks', progress: 0 },
]

// Resources
const resources = [
  { type: 'Video', title: 'Market Crash Survival Guide', views: '2.5K', rating: 4.8 },
  { type: 'Article', title: 'Best Stocks for 2024', views: '1.2K', rating: 4.6 },
  { type: 'Webinar', title: 'Live Q&A with Market Expert', views: '892', rating: 4.9 },
  { type: 'PDF', title: 'Stock Trading Handbook', views: '3.1K', rating: 4.7 },
]

export default function LearningHub() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0])
  const [activeTab, setActiveTab] = useState('courses')

  return (
    <MainLayout>
      <PageContainer>
        <PageHeader
          title="Learning Hub"
          subtitle="Master investment strategies with our comprehensive courses"
        />

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-electric-400/5 to-neon-400/5 border-electric-400/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Your Learning Progress</h3>
                <p className="text-gray-400">You've completed 2 out of 6 lessons in Stock Market Basics</p>
              </div>
              <Award size={32} className="text-neon-400" />
            </div>
            <div className="w-full bg-dark-border rounded-full h-2">
              <motion.div
                animate={{ width: '33%' }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-electric-400 to-neon-400 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">33% Complete</p>
          </Card>
        </motion.div>

        {/* Learning Paths */}
        <Section title="Learning Paths" subtitle="Choose your investment learning journey">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {learningPaths.map((path, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="cursor-pointer hover:border-electric-400/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-white mb-2">{path.title}</h3>
                      <div className="flex gap-4 text-xs text-gray-400 mb-4">
                        <span>📚 {path.courses} courses</span>
                        <span>⏱️ {path.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-dark-border rounded-full h-1.5 mb-2">
                    <motion.div
                      animate={{ width: `${path.progress}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-electric-400 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{path.progress}% Complete</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    {path.progress === 0 ? 'Start' : 'Continue'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Tabs */}
        <div className="flex gap-4 my-12 border-b border-dark-border">
          {['courses', 'lessons', 'resources'].map(tab => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? 'text-electric-400 border-b-2 border-electric-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Course List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="space-y-2">
                {courses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedCourse(course)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${
                      selectedCourse.id === course.id
                        ? 'bg-electric-400/20 border-electric-400/60'
                        : 'border-dark-border/50 hover:border-electric-400/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{course.image}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white line-clamp-2">{course.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{course.lessons} lessons • {course.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Course Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Card>
                <div className="mb-6">
                  <div className="text-6xl mb-4">{selectedCourse.image}</div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedCourse.title}</h2>
                  <p className="text-gray-400 mb-4">{selectedCourse.description}</p>
                  <div className="flex gap-3 mb-4">
                    <Badge variant="blue">{selectedCourse.level}</Badge>
                    <Badge variant="green">{selectedCourse.lessons} Lessons</Badge>
                    <Badge variant="blue">{selectedCourse.duration}</Badge>
                  </div>
                </div>

                <div className="bg-dark-card/50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-300 mb-3">Course Curriculum</p>
                  <div className="space-y-2">
                    {courseLessons.map((lesson, idx) => (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`p-3 rounded-lg flex items-center gap-3 ${
                          lesson.locked
                            ? 'bg-dark-border/30 opacity-50'
                            : lesson.completed
                            ? 'bg-neon-400/10'
                            : 'bg-dark-border/50 hover:bg-electric-400/10'
                        } transition-all cursor-pointer group`}
                      >
                        <div className="flex-shrink-0">
                          {lesson.locked ? (
                            <Lock size={16} className="text-gray-500" />
                          ) : lesson.completed ? (
                            <CheckCircle size={16} className="text-neon-400" />
                          ) : (
                            <Play size={16} className="text-electric-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white group-hover:text-electric-400 transition-colors">
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500">{lesson.duration}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                  <Play size={20} /> Enroll Now
                </Button>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <Section title="Learning Resources">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {resources.map((resource, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="cursor-pointer hover:border-electric-400/30 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="blue">{resource.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-neon-400 fill-neon-400" />
                        <span className="text-xs font-semibold text-neon-400">{resource.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-white mb-2">{resource.title}</h3>
                    <p className="text-xs text-gray-500">{resource.views} views</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        )}

        {/* Certifications */}
        <Section title="Earn Certifications" className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Stock Market Basics', icon: '📜', progress: 67 },
              { title: 'Investment Professional', icon: '🎓', progress: 0 },
              { title: 'Portfolio Manager', icon: '🏆', progress: 0 },
            ].map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="text-center">
                  <div className="text-4xl mb-3">{cert.icon}</div>
                  <p className="font-bold text-white mb-3">{cert.title}</p>
                  <div className="w-full bg-dark-border rounded-full h-1.5 mb-2">
                    <motion.div
                      animate={{ width: `${cert.progress}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-neon-400 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{cert.progress}% Complete</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
      </PageContainer>
    </MainLayout>
  )
}
