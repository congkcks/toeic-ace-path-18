const API_BASE_URL = 'https://localhost:7035/api';

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

export interface DashboardStats {
  streakDays: number;
  totalScore: number;
  completedExercises: number;
  totalExercises: number;
  studyHours: number;
  progress: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  recentResults: Array<{
    exercise: string;
    score: number;
  }>;
}

export interface TopicExercises {
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
      body: JSON.stringify(credentials),
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

  async getExercisesByTopic(topicName: string): Promise<TopicExercises> {
    return this.request<TopicExercises>(`/exercises/topic/${topicName}`);
  }

  async getExerciseById(exerciseId: number): Promise<Exercise> {
    return this.request<Exercise>(`/exercises/${exerciseId}`);
  }

  // Submission API
  async submitExercise(submissionData: {
    userId: number;
    exerciseId: number;
    answers: Array<{ questionId: number; optionId: number }>;
  }): Promise<Submission> {
    return this.request<Submission>('/submissions', {
      method: 'POST',
      body: JSON.stringify(submissionData),
    });
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
  async getDashboardStats(userId: number): Promise<DashboardStats> {
    return this.request<DashboardStats>(`/dashboard/${userId}`);
  }

  // Utility methods
  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getCurrentUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}

// Export singleton instance
export const apiService = new ApiService();