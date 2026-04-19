import { NextResponse } from 'next/server'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number // index of correct option
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which algorithm is commonly used for binary classification tasks in machine learning?',
    options: ['Linear Regression', 'Logistic Regression', 'K-Means Clustering', 'Principal Component Analysis'],
    correctAnswer: 1,
    explanation: 'Logistic Regression is specifically designed for binary classification problems. It models the probability of an instance belonging to a particular class using the logistic (sigmoid) function.',
    difficulty: 'easy',
    category: 'Machine Learning',
  },
  {
    id: 2,
    question: 'In a neural network, what does the activation function ReLU do?',
    options: [
      'Squashes values between 0 and 1',
      'Returns 0 for negative inputs and the input value for positive inputs',
      'Normalizes output to sum to 1',
      'Applies a sigmoid transformation',
    ],
    correctAnswer: 1,
    explanation: 'ReLU (Rectified Linear Unit) returns max(0, x) — it outputs 0 for negative inputs and the raw input for positive values. This introduces non-linearity while being computationally efficient.',
    difficulty: 'easy',
    category: 'Deep Learning',
  },
  {
    id: 3,
    question: 'What is the primary purpose of Word2Vec in Natural Language Processing?',
    options: [
      'Text classification',
      'Machine translation',
      'Generating dense word embeddings',
      'Named entity recognition',
    ],
    correctAnswer: 2,
    explanation: 'Word2Vec learns dense vector representations (embeddings) of words where semantically similar words are mapped to nearby points in vector space. It captures contextual relationships between words.',
    difficulty: 'medium',
    category: 'NLP',
  },
  {
    id: 4,
    question: 'Which evaluation metric is most appropriate for an imbalanced classification dataset?',
    options: ['Accuracy', 'Precision', 'F1-Score', 'Mean Squared Error'],
    correctAnswer: 2,
    explanation: 'F1-Score is the harmonic mean of precision and recall, making it ideal for imbalanced datasets where accuracy can be misleading. A high F1-Score indicates both good precision and recall.',
    difficulty: 'medium',
    category: 'Machine Learning',
  },
  {
    id: 5,
    question: 'What is the key innovation of the Transformer architecture in deep learning?',
    options: [
      'Convolutional kernels',
      'Recurrent hidden states',
      'Self-attention mechanism',
      'Pooling layers',
    ],
    correctAnswer: 2,
    explanation: 'Transformers introduced the self-attention mechanism, which allows the model to weigh the importance of different words in a sequence relative to each other, enabling parallel processing and capturing long-range dependencies.',
    difficulty: 'medium',
    category: 'Deep Learning',
  },
  {
    id: 6,
    question: 'In computer vision, what technique is used to detect edges in an image?',
    options: ['Histogram Equalization', 'Canny Edge Detection', 'K-Means Segmentation', 'Bilinear Interpolation'],
    correctAnswer: 1,
    explanation: 'Canny Edge Detection is a multi-step algorithm that uses Gaussian smoothing, gradient calculation, non-maximum suppression, and hysteresis thresholding to detect edges in images with good accuracy.',
    difficulty: 'medium',
    category: 'Computer Vision',
  },
  {
    id: 7,
    question: 'What is the curse of dimensionality in machine learning?',
    options: [
      'Too many features lead to overfitting and increased computational cost',
      'Models become too simple to capture patterns',
      'Data becomes linearly separable',
      'Feature scaling becomes unnecessary',
    ],
    correctAnswer: 0,
    explanation: 'The curse of dimensionality refers to the various phenomena that arise when analyzing data in high-dimensional spaces. As dimensions increase, data becomes sparse, distances become less meaningful, and models require exponentially more data to generalize.',
    difficulty: 'hard',
    category: 'Machine Learning',
  },
  {
    id: 8,
    question: 'Which SQL window function is used to assign a rank to each row within a partition, with gaps for ties?',
    options: ['ROW_NUMBER()', 'DENSE_RANK()', 'RANK()', 'NTILE()'],
    correctAnswer: 2,
    explanation: 'RANK() assigns a rank to each row with gaps for ties (e.g., 1, 2, 2, 4). ROW_NUMBER() gives unique numbers, DENSE_RANK() doesn\'t have gaps (1, 2, 2, 3), and NTILE() divides rows into groups.',
    difficulty: 'hard',
    category: 'SQL & Data Engineering',
  },
  {
    id: 9,
    question: 'What is the vanishing gradient problem and which architecture was specifically designed to address it?',
    options: [
      'Weights becoming too large; solved by Dropout',
      'Gradients becoming extremely small in deep networks; addressed by LSTM',
      'Data augmentation issues; solved by Transfer Learning',
      'Overfitting in CNNs; solved by Batch Normalization',
    ],
    correctAnswer: 1,
    explanation: 'The vanishing gradient problem occurs when gradients become exponentially small during backpropagation through deep networks, making early layers learn very slowly. LSTM (Long Short-Term Memory) networks use gated cells to maintain gradient flow over long sequences.',
    difficulty: 'hard',
    category: 'Deep Learning',
  },
  {
    id: 10,
    question: 'In a recommendation system, what is the difference between collaborative filtering and content-based filtering?',
    options: [
      'Collaborative filtering uses user-item interactions; content-based uses item features',
      'Collaborative filtering is faster; content-based is more accurate',
      'They are the same technique with different names',
      'Collaborative filtering uses demographics; content-based uses ratings',
    ],
    correctAnswer: 0,
    explanation: 'Collaborative filtering recommends items based on patterns of user-item interactions (e.g., "users who liked X also liked Y"). Content-based filtering recommends items based on their features and the user\'s preference profile (e.g., recommending movies of similar genres).',
    difficulty: 'medium',
    category: 'Data Science',
  },
]

// GET /api/quiz — return quiz questions
export async function GET() {
  try {
    // Return questions without correct answers
    const questions = QUIZ_QUESTIONS.map(({ correctAnswer: _, ...rest }) => rest)

    return NextResponse.json({
      success: true,
      quizId: 'ai-ml-ds-2026',
      totalQuestions: questions.length,
      questions,
    })
  } catch (error) {
    console.error('Quiz GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz questions' },
      { status: 500 }
    )
  }
}
