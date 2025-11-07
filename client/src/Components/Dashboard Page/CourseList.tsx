import {ChevronRight, Clock, Star} from 'lucide-react';

const mockCourses = [
    {
      id: 1,
      title: "Advanced JavaScript & React",
      platform: "Coursera",
      instructor: "Meta",
      duration: "6 weeks",
      difficulty: "Intermediate",
      rating: 4.8,
      students: "125K",
      description: "Master modern JavaScript and React to build professional web applications.",
      relevanceScore: 95
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      platform: "Udemy",
      instructor: "Abdul Bari",
      duration: "8 weeks",
      difficulty: "Advanced",
      rating: 4.9,
      students: "200K",
      description: "Strengthen your problem-solving skills with comprehensive DSA training.",
      relevanceScore: 88
    },
    {
      id: 3,
      title: "System Design Fundamentals",
      platform: "Educative",
      instructor: "Alex Xu",
      duration: "4 weeks",
      difficulty: "Intermediate",
      rating: 4.7,
      students: "80K",
      description: "Learn how to design scalable distributed systems from industry experts.",
      relevanceScore: 82
    },
    {
      id: 4,
      title: "Python for Backend Development",
      platform: "Pluralsight",
      instructor: "Reindert-Jan Ekker",
      duration: "5 weeks",
      difficulty: "Beginner",
      rating: 4.6,
      students: "95K",
      description: "Build powerful backend services with Python and modern frameworks.",
      relevanceScore: 78
    },
    {
      id: 5,
      title: "DevOps & CI/CD Mastery",
      platform: "LinkedIn Learning",
      instructor: "Michael Jenkins",
      duration: "7 weeks",
      difficulty: "Advanced",
      rating: 4.8,
      students: "110K",
      description: "Master DevOps practices and automate your deployment pipelines.",
      relevanceScore: 75
    },
    {
      id: 6,
      title: "Cloud Computing with AWS",
      platform: "A Cloud Guru",
      instructor: "Ryan Kroonenburg",
      duration: "10 weeks",
      difficulty: "Intermediate",
      rating: 4.9,
      students: "180K",
      description: "Become proficient in AWS cloud services and architecture.",
      relevanceScore: 85
    }
  ];

const CourseList = () => {
    return (
      <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'white',
          fontFamily: 'Teko, sans-serif',
          marginBottom: '1.5rem'
        }}>
          Personalized Courses for You
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem'
        }} className="course-grid">
          {mockCourses.map((course) => (
            <div
              key={course.id}
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Relevance Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.375rem 0.75rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {course.relevanceScore}%
              </div>
  
              <div style={{ marginBottom: '0.75rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: 'white',
                  fontFamily: 'Teko, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  {course.title}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  fontSize: '0.8125rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>{course.platform}</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>•</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>{course.instructor}</span>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.6)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={13} />
                    {course.duration}
                  </div>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={13} fill="#eab308" color="#eab308" />
                    {course.rating}
                  </div>
                  <span>•</span>
                  <span>{course.students} students</span>
                </div>
              </div>
  
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '0.75rem',
                lineHeight: 1.5,
                fontWeight: '400',
                fontSize: '0.9375rem'
              }}>
                {course.description}
              </p>
  
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{
                  padding: '0.375rem 0.75rem',
                  backgroundColor: course.difficulty === 'Beginner' ? 'rgba(34, 197, 94, 0.2)' : course.difficulty === 'Intermediate' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  borderRadius: '0.5rem',
                  color: course.difficulty === 'Beginner' ? '#22c55e' : course.difficulty === 'Intermediate' ? '#eab308' : '#ef4444',
                  fontSize: '0.8125rem',
                  fontWeight: '600'
                }}>
                  {course.difficulty}
                </span>
                <button
                  style={{
                    padding: '0.625rem 1.5rem',
                    background: 'linear-gradient(135deg, #FFACAC 0%, #10b981 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s',
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Start Learning
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default CourseList;