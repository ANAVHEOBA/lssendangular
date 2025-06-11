export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    status: string;
    token: string;
    data: {
      user: {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
        isEmailVerified: boolean;
        role: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
      }
    }
  }
  