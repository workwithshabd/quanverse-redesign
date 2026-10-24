/**
 * Authentication Constants
 * Isolated demo student profile strictly reserved for local development preview.
 * Production users MUST authenticate via real Firebase Authentication.
 */

export const DEMO_STUDENT = {
  id: 'usr_demo_1001',
  uid: 'demo_uid_1001',
  name: 'Arjun Sharma',
  email: 'student@quanverse.in',
  role: 'student',
  board: 'CBSE',
  grade: 'Class 10',
  targetYear: '2027',
  provider: 'demo',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  stats: {
    mockTestsCompleted: 4,
    readinessScore: 92,
    predictedMarks: '74 / 80'
  }
};
