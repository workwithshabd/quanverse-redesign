/**
 * Quanverse API Service Layer
 * Designed for immediate plug-and-play connection to any REST or GraphQL backend.
 * Uses local mock fallbacks with configurable latency for robust offline development.
 */

import { logger } from './logger';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const USE_MOCK_FALLBACK = true; // Set to false when live backend is available


// Helper for simulated latency
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  /**
   * Fetch landing page builder configuration by audience ('student' | 'teacher')
   */
  async getLandingConfig(audience = 'student') {
    if (!USE_MOCK_FALLBACK) {
      const res = await fetch(`${API_BASE_URL}/cms/landing-builder?audience=${audience}`);
      if (!res.ok) throw new Error('Failed to fetch landing builder data');
      return await res.json();
    }
    await delay(250);
    return {
      status: 'success',
      audience,
      announcement: 'CBSE & ICSE 2027 Board Exam Specimen Papers & Marking Blueprints Now Live',
      stats: {
        questionsEvaluated: '62,400+',
        activeStudents: '24,800+',
        schoolsPartnered: '140+',
        accuracyRate: '99.4%'
      }
    };
  },

  /**
   * Live AI Marking Evaluation Engine
   * Accepts a student's answer and matches against official board step-marking schemes
   */
  async evaluateAnswer({ questionId, subject, maxMarks, studentAnswer }) {
    if (!USE_MOCK_FALLBACK) {
      const res = await fetch(`${API_BASE_URL}/ai/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, subject, maxMarks, studentAnswer })
      });
      if (!res.ok) throw new Error('Evaluation service error');
      return await res.json();
    }

    await delay(1100); // realistic AI evaluation pause

    // Intelligent mock evaluation based on sample questions
    if (subject === 'Maths') {
      return {
        scoreAwarded: 2.5,
        maxMarks: 3.0,
        percentage: 83.3,
        overallFeedback: 'Excellent grasp of the quadratic formula. Clean execution, but the discriminant condition was not explicitly stated before substitution.',
        steps: [
          {
            stepNumber: 1,
            criterion: 'Identification of coefficients (a=2, b=-5, c=3) & Discriminant check',
            marksAwarded: 0.5,
            maxMarks: 0.5,
            status: 'passed',
            comment: 'Correctly identified standard form coefficients.'
          },
          {
            stepNumber: 2,
            criterion: 'Writing the quadratic formula x = (-b ± √(b² - 4ac)) / (2a)',
            marksAwarded: 0.5,
            maxMarks: 0.5,
            status: 'passed',
            comment: 'Formula stated accurately with correct signs.'
          },
          {
            stepNumber: 3,
            criterion: 'Step-by-step substitution & radical simplification',
            marksAwarded: 1.0,
            maxMarks: 1.0,
            status: 'passed',
            comment: 'Evaluated (-5)² - 4(2)(3) = 25 - 24 = 1 flawlessly.'
          },
          {
            stepNumber: 4,
            criterion: 'Explicitly stating both roots x = 3/2 and x = 1 with conclusion',
            marksAwarded: 0.5,
            maxMarks: 1.0,
            status: 'partial',
            comment: 'Missed writing the final concluding statement: "Hence, the roots are 1 and 3/2". CBSE marking guidelines deduct 1/2 mark for omission of final set.'
          }
        ],
        boardTip: 'CBSE Class 10 Board Rubric Tip: Always box your final values of x with their unit or statement.'
      };
    } else {
      // Science: Double circulation
      return {
        scoreAwarded: 3.5,
        maxMarks: 4.0,
        percentage: 87.5,
        overallFeedback: 'Clear explanation of pulmonary vs systemic circulation. Diagram schematic accurately captures oxygenated vs deoxygenated pathways.',
        steps: [
          {
            stepNumber: 1,
            criterion: 'Definition of Double Circulation (blood passes twice through heart in one complete cycle)',
            marksAwarded: 1.0,
            maxMarks: 1.0,
            status: 'passed',
            comment: 'Precise NCERT definition provided.'
          },
          {
            stepNumber: 2,
            criterion: 'Pulmonary circulation route: Right ventricle -> Pulmonary artery -> Lungs -> Pulmonary vein -> Left atrium',
            marksAwarded: 1.0,
            maxMarks: 1.0,
            status: 'passed',
            comment: 'Complete anatomical pathway mapped correctly.'
          },
          {
            stepNumber: 3,
            criterion: 'Systemic circulation route: Left ventricle -> Aorta -> Body organs -> Vena cava -> Right atrium',
            marksAwarded: 1.0,
            maxMarks: 1.0,
            status: 'passed',
            comment: 'High accuracy on high-pressure chamber descriptions.'
          },
          {
            stepNumber: 4,
            criterion: 'Physiological significance: Separation of oxygenated & deoxygenated blood for warm-blooded thermoregulation',
            marksAwarded: 0.5,
            maxMarks: 1.0,
            status: 'partial',
            comment: 'Mentioned oxygen efficiency, but omitted the critical phrase "essential for high energy needs of birds and mammals to maintain constant body temperature".'
          }
        ],
        boardTip: 'ICSE & CBSE Examiner Note: Keywords like "separation of oxygenated & deoxygenated blood" are strictly required for full credit.'
      };
    }
  },

  /**
   * Calculate Real-time Board Readiness Score
   */
  async calculateReadiness({ board = 'CBSE', subjectScores = {} }) {
    if (!USE_MOCK_FALLBACK) {
      const res = await fetch(`${API_BASE_URL}/student/readiness`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ board, subjectScores })
      });
      return await res.json();
    }
    await delay(300);

    const values = Object.values(subjectScores);
    const avg = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 78;

    let predictedGrade = 'A1';
    let predictedRange = '91% - 95%';
    if (avg < 60) {
      predictedGrade = 'B2';
      predictedRange = '65% - 72%';
    } else if (avg < 75) {
      predictedGrade = 'B1';
      predictedRange = '75% - 84%';
    } else if (avg < 85) {
      predictedGrade = 'A2';
      predictedRange = '85% - 90%';
    }

    return {
      readinessScore: avg,
      predictedGrade,
      predictedRange,
      board,
      highYieldFocusTopics: [
        { topic: 'Quadratic Equations & AP', weightage: '12 Marks', urgency: 'High' },
        { topic: 'Light: Reflection & Refraction', weightage: '10 Marks', urgency: 'High' },
        { topic: 'Nationalism in India (Map Work)', weightage: '5 Marks', urgency: 'Medium' }
      ],
      recommendedMocksToGoal: Math.max(2, Math.ceil((98 - avg) / 4))
    };
  },

  /**
   * Get Curated Mock Exams List
   */
  async getMockExams({ board: _board = 'CBSE' } = {}) {
    await delay(200);
    return [
      {
        id: 'cbse-math-01',
        title: 'Class 10 Mathematics Standard — Pre-Board Sprint 1',
        board: 'CBSE',
        subject: 'Mathematics',
        durationMinutes: 180,
        totalMarks: 80,
        difficulty: 'Board Standard',
        questionsCount: 38,
        tags: ['New Pattern', 'Step Marking Included', 'Topper Benchmark'],
        isFree: true
      },
      {
        id: 'cbse-sci-01',
        title: 'Class 10 Science — Complete Syllabus Specimen Mock',
        board: 'CBSE',
        subject: 'Science',
        durationMinutes: 180,
        totalMarks: 80,
        difficulty: 'Rigorous',
        questionsCount: 39,
        tags: ['Assertion-Reason', 'Case-Based', 'AI Graded'],
        isFree: false
      },
      {
        id: 'icse-math-01',
        title: 'ICSE Class 10 Specimen Paper 2027 — Full Simulation',
        board: 'ICSE',
        subject: 'Mathematics',
        durationMinutes: 150,
        totalMarks: 80,
        difficulty: 'Official Blueprint',
        questionsCount: 32,
        tags: ['Section A Mandatory', 'Section B Choice', 'Detailed Soln'],
        isFree: true
      },
      {
        id: 'cbse-sst-01',
        title: 'Social Science All-India Grand Mock Test',
        board: 'CBSE',
        subject: 'Social Science',
        durationMinutes: 180,
        totalMarks: 80,
        difficulty: 'Standard',
        questionsCount: 37,
        tags: ['Map Items Included', 'Competency Questions'],
        isFree: false
      }
    ];
  },

  /**
   * Quick Interactive Demo Mock Exam (for instant browser trial)
   */
  async getQuickDemoExam() {
    await delay(150);
    return {
      id: 'demo-exam-class10',
      title: 'Class 10 Board Practice — 5-Minute Micro Sprint',
      board: 'CBSE & ICSE',
      durationMinutes: 5,
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          marks: 1,
          question: 'In the reaction: CuO + H₂ → Cu + H₂O, which substance undergoes reduction?',
          options: ['H₂', 'CuO', 'Cu', 'H₂O'],
          correctIndex: 1,
          explanation: 'CuO loses oxygen to form Cu, hence Copper(II) oxide undergoes reduction.'
        },
        {
          id: 'q2',
          type: 'mcq',
          marks: 1,
          question: 'If the zeroes of the quadratic polynomial ax² + bx + c are equal, then discriminant D is:',
          options: ['D > 0', 'D < 0', 'D = 0', 'D ≥ 0'],
          correctIndex: 2,
          explanation: 'For real and equal roots, the discriminant b² - 4ac must equal zero.'
        },
        {
          id: 'q3',
          type: 'assertion',
          marks: 1,
          question: 'Assertion (A): The inner lining of small intestine contains numerous finger-like projections called villi.\nReason (R): Villi increase the surface area for rapid absorption of digested food.',
          options: [
            'Both A and R are true and R is the correct explanation of A',
            'Both A and R are true but R is not the correct explanation of A',
            'A is true but R is false',
            'A is false but R is true'
          ],
          correctIndex: 0,
          explanation: 'Villi increase surface area manifold, allowing rapid nutrient uptake into the blood capillaries.'
        },
        {
          id: 'q4',
          type: 'subjective',
          marks: 2,
          question: 'Define Ohm\'s Law and write its mathematical formula stating the condition on temperature.',
          sampleAnswerPlaceholder: 'State Ohm\'s law, V = IR, and constant temperature condition...'
        }
      ]
    };
  },

  /**
   * Latest Board Circulars & Exam News
   */
  async getBoardNews() {
    await delay(200);
    return [
      {
        id: 'news-1',
        title: 'CBSE Clarifies Internal Assessment Policy for Class 10 Third Language',
        category: 'CBSE Notification',
        date: 'Recent Official Release',
        summary: 'Third language will be strictly evaluated via internal school-based formative assessments; board papers retain core 2-language standard.',
        source: 'cbse.gov.in',
        badgeColor: 'sage'
      },
      {
        id: 'news-2',
        title: 'CISCE Releases Class 10 Specimen Papers with 50% Competency Questions',
        category: 'ICSE Updates',
        date: 'Official Blueprint',
        summary: 'New pattern places emphasis on real-world application, experimental analysis, and assertion-reasoning items.',
        source: 'cisce.org',
        badgeColor: 'lavender'
      },
      {
        id: 'news-3',
        title: 'Board Exam Hall Strategy: How Step-Marking Saves 8 to 14 Marks',
        category: 'Exam Strategy',
        date: 'Quanverse Research',
        summary: 'Analysis of 10,000+ Class 10 answer sheets reveals students lose marks not from wrong answers, but from missing intermediate formulas.',
        source: 'Quanverse Board Insights',
        badgeColor: 'peach'
      }
    ];
  },

  /**
   * Subscribe to alerts
   */
  async subscribeNewsletter(email) {
    await delay(400);
    localStorage.setItem('quanverse_subscriber', email);
    return { success: true, message: `Subscribed ${email} to Class 10 Board updates!` };
  },

  /**
   * Request School Partnership
   */
  async requestSchoolDemo(formData) {
    logger.api('requestSchoolDemo invoked', formData);
    await delay(500);
    return { success: true, message: 'Thank you! A Quanverse Academic Advisor will contact your school within 24 hours.' };
  },

  /**
   * Submit Teacher / Educator Network Application
   */
  async submitTeacherApplication(applicationData) {
    logger.teacher('Teacher application received', applicationData);
    await delay(700);

    // Save to local storage for persistence across reloads (great for debugging)
    const existingApps = JSON.parse(localStorage.getItem('quanverse_teacher_applications') || '[]');
    const newRecord = {
      ...applicationData,
      id: `QV-TCH-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedAt: new Date().toISOString(),
      status: 'UNDER_REVIEW'
    };
    existingApps.push(newRecord);
    localStorage.setItem('quanverse_teacher_applications', JSON.stringify(existingApps));

    logger.api('Teacher application stored successfully', newRecord);
    return {
      success: true,
      applicationId: newRecord.id,
      message: 'Application received! Our Academic Board Coordinator will review your submission and contact you within 24-48 hours.',
      data: newRecord
    };
  },

  /**
   * Fetch open career opportunities across Academics, Engineering, and Growth
   */
  async getOpenPositions() {
    logger.api('Fetching open career positions');
    await delay(300);
    return [
      {
        id: 'job-1',
        title: 'Senior Board Paper Author (Class 10 Mathematics)',
        department: 'Academics & Content',
        location: 'Remote (India)',
        type: 'Contract / Royalty',
        experience: '5+ years teaching CBSE/ICSE Class 10',
        compensation: '₹300 - ₹1,200 per approved item + recurring attempt royalties',
        description: 'Design rigorous competency-based math questions and step-marking schemes reflecting CBSE 2027 guidelines.',
        badge: 'Priority Need'
      },
      {
        id: 'job-2',
        title: 'Lead Physics & Chemistry Question Curator',
        department: 'Academics & Content',
        location: 'Remote (India)',
        type: 'Contract / Royalty',
        experience: '4+ years Class 10 Science',
        compensation: '₹300 - ₹1,500 per approved item + attempt royalties',
        description: 'Formulate case-study based practical scenario questions and experimental deduction exercises.',
        badge: 'Popular'
      },
      {
        id: 'job-3',
        title: 'AI Rubric Alignment Evaluator',
        department: 'AI & Educational Research',
        location: 'Hybrid / Remote',
        type: 'Full-time / Part-time',
        experience: 'Prior Board Examiner or Senior Evaluator',
        compensation: 'Competitive monthly retainer',
        description: 'Audit AI-graded student answers against official Board Chief-Moderator answer keys for 99.5%+ accuracy.',
        badge: 'Examiners Preferred'
      },
      {
        id: 'job-4',
        title: 'School Pre-Board Partnership Manager',
        department: 'Institutional Growth',
        location: 'New Delhi / Bengaluru / Remote',
        type: 'Full-time',
        experience: '3+ years B2B EdTech or School Sales',
        compensation: '₹8 - ₹14 LPA + Performance Incentives',
        description: 'Partner with top CBSE & ICSE schools to implement automated pre-board assessments and mock diagnostics.',
        badge: 'Growth'
      }
    ];
  }
};

