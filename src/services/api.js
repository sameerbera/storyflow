// API service for connecting to the deployed Flask backend
const API_BASE_URL = 'https://dyh6i3cq5g3p.manus.space/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User management
  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  async getUsers() {
    return this.request('/users');
  }

  // Story management
  async createStory(storyData) {
    return this.request('/stories', {
      method: 'POST',
      body: JSON.stringify(storyData),
    });
  }

  async getStory(storyId) {
    return this.request(`/stories/${storyId}`);
  }

  async getUserStories(userId) {
    return this.request(`/stories/user/${userId}`);
  }

  async continueStory(storyId, choice) {
    return this.request(`/stories/${storyId}/continue`, {
      method: 'POST',
      body: JSON.stringify({ choice }),
    });
  }

  async exportStory(storyId) {
    return this.request(`/stories/${storyId}/export`);
  }

  // Media generation
  async generateVoice(text, voice = 'male') {
    return this.request('/media/generate-voice', {
      method: 'POST',
      body: JSON.stringify({ text, voice }),
    });
  }

  async generateImage(prompt) {
    return this.request('/media/generate-image', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  async getVoices() {
    return this.request('/media/voices');
  }

  // Multiplayer functionality
  async createMultiplayerSession(storyId, hostUserId) {
    return this.request('/multiplayer/create', {
      method: 'POST',
      body: JSON.stringify({ story_id: storyId, host_user_id: hostUserId }),
    });
  }

  async joinMultiplayerSession(sessionCode, userId) {
    return this.request('/multiplayer/join', {
      method: 'POST',
      body: JSON.stringify({ session_code: sessionCode, user_id: userId }),
    });
  }

  async getMultiplayerSession(sessionCode) {
    return this.request(`/multiplayer/session/${sessionCode}`);
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default new ApiService();

