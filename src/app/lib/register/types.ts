export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  status: string;
  token: string;
  data: {
    user: {
      email: string;
      firstName: string;
      lastName: string;
      isEmailVerified: boolean;
      role: string;
      isActive: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  }
} 
 