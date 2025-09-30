const API_BASE_URL = 'https://tile-comfort-housing-bathrooms.trycloudflare.com/api';

// Types based on API responses
export interface User {
  id: number;
  username: string;
  email: string;
  streakDays?: number;
  badges?: string[];
  createdAt?: string;
}

export interface Exercise {
  id: number;
  title: string;
  description?: string;
  exerciseType: 'Reading' | 'Listening' | 'Writing' | 'Speaking';
  topic: string;
  status?: 'Completed' | 'InProgress' | 'Pending';
  materials?: Material[];
  questions?: Question[];
}

export interface Material {
  id: number;
  materialType: 'Text' | 'Audio' | 'Video';
  content: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
}

export interface Option {
  id: number;
  optionLabel: string;
  optionText: string;
  isCorrect: boolean;
}

export interface Submission {
  id: number;
  score: number;
  isCompleted: boolean;
  submittedAt: string;
}

export interface LearningPlan {
  planId: number;
  exerciseId: number;
  status: 'Completed' | 'Pending' | 'InProgress';
  startTime: string;
  endTime: string;
}

export interface Badge {
  badgeId: number;
  badgeName: string;
  awardedAt: string;
}

export interface DashboardSummary {
  streakDays: number;
  predictedScore: number;
  completedLessons: number;
  totalLessons: number;
  studyTimeHours: number;
}

export interface DashboardProgress {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

export interface RecentResult {
  exercise: string;
  score: number;
}

export interface DashboardStats {
  streakDays: number;
  totalScore: number;
  completedExercises: number;
  totalExercises: number;
  studyHours: number;
  progress: DashboardProgress;
  recentResults: RecentResult[];
}

export interface TopicExercises {
  topic: string;
  exercises: Exercise[];
}

export interface ExercisesByTopicResponse {
  topic: string;
  exercises: Exercise[];
}

// API Service Class
export class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // User API
  async register(userData: { username: string; email: string; password: string }): Promise<User> {
    return this.request<User>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }): Promise<{ token: string; userId: number }> {
    const response = await this.request<{ token: string; userId: number }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        passwordHash: credentials.password
      }),
    });
    
    this.token = response.token;
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userId', response.userId.toString());
    
    return response;
  }

  async getUser(userId: number): Promise<User> {
    return this.request<User>(`/users/${userId}`);
  }

  // Exercise API
  async getAllExercises(): Promise<Exercise[]> {
    return this.request<Exercise[]>('/exercises');
  }

  async getExercisesByTopic(): Promise<ExercisesByTopicResponse[]> {
    return this.request<ExercisesByTopicResponse[]>('/exercises/by-topic');
  }

  async getExercisesByTopicName(topicName: string): Promise<TopicExercises> {
    const allTopics = await this.getExercisesByTopic();
    const topic = allTopics.find(t => t.topic === topicName);
    if (!topic) {
      throw new Error(`Topic ${topicName} not found`);
    }
    return topic;
  }

  async getExerciseById(exerciseId: number): Promise<Exercise> {
    return this.request<Exercise>(`/exercises/${exerciseId}`);
  }

  async getPendingExercises(userId: number): Promise<Exercise[]> {
    return this.request<Exercise[]>(`/users/users/${userId}/exercises/pending`);
  }

  // Submission API
  async submitExercise(submissionData: {
    userId: number;
    exerciseId: number;
    score: number;
    isCompleted: boolean;
    durationMinutes?: number;
  }): Promise<Submission> {
    return this.request<Submission>('/submissions', {
      method: 'POST',
      body: JSON.stringify(submissionData),
    });
  }

  async getUserSubmissions(userId: number): Promise<Submission[]> {
    return this.request<Submission[]>(`/submissions/user/${userId}`);
  }

  // Learning Plan API
  async getLearningPlan(userId: number): Promise<LearningPlan[]> {
    return this.request<LearningPlan[]>(`/learningplans/user/${userId}`);
  }

  // Badges API
  async getUserBadges(userId: number): Promise<Badge[]> {
    return this.request<Badge[]>(`/userbadges/${userId}`);
  }

  // Dashboard API
  async getDashboardSummary(userId: number): Promise<DashboardSummary> {
    return this.request<DashboardSummary>(`/dashboard/summary/${userId}`);
  }

  async getDashboardProgress(userId: number): Promise<DashboardProgress> {
    return this.request<DashboardProgress>(`/dashboard/progress/${userId}`);
  }

  async getDashboardToday(userId: number): Promise<LearningPlan[]> {
    return this.request<LearningPlan[]>(`/dashboard/today/${userId}`);
  }

  async getDashboardRecentResults(userId: number): Promise<RecentResult[]> {
    return this.request<RecentResult[]>(`/dashboard/recent-results/${userId}`);
  }

  async getDashboardStats(userId: number): Promise<DashboardStats> {
    // Combine multiple dashboard endpoints
    const [summary, progress, recentResults] = await Promise.all([
      this.getDashboardSummary(userId),
      this.getDashboardProgress(userId),
      this.getDashboardRecentResults(userId)
    ]);

    return {
      streakDays: summary.streakDays,
      totalScore: summary.predictedScore,
      completedExercises: summary.completedLessons,
      totalExercises: summary.totalLessons,
      studyHours: summary.studyTimeHours,
      progress,
      recentResults
    };
  }

  // Utility methods
  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return true; // Always authenticated for testing
  }

  getCurrentUserId(): number {
    return 4; // Fixed userId for testing
  }
}

// Export singleton instance
export const apiService = new ApiService();