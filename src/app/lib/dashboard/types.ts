export interface User {
  isVerified: boolean;
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  status: string;
  data: {
    user: User;
  };
}

export interface DashboardStats {
  totalBalance: number;
  totalProfit: number;
  activeTrades: number;
  portfolioValue: number;
}

export interface DashboardResponse {
  status: string;
  data: {
    stats: DashboardStats;
    recentTrades: any[]; // We'll define this when we implement the trades feature
    portfolio: any[]; // We'll define this when we implement the portfolio feature
  };
}

// Transaction Types
export interface TransactionFees {
  percentage: number;
  lsk: number;
  ngn: number;
  usd: number;
  eur: number;
  gbp: number;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

export interface Amounts {
  base: {
    lsk: number;
    ngn: number;
    usd: number;
    eur: number;
    gbp: number;
  };
  fees: {
    percentage: number;
    lsk: number;
    ngn: number;
    usd: number;
    eur: number;
    gbp: number;
  };
  total: {
    lsk: number;
    ngn: number;
    usd: number;
    eur: number;
    gbp: number;
  };
}

export interface CurrentRates {
  usd: number;
  eur: number;
  gbp: number;
  ngn: number;
  usd_to_ngn_rate: number;
}

export interface PaymentInstructions {
  amount: number;
  bankDetails: BankDetails;
  reference: string;
  deadline: string;
  instructions: string[];
}

export interface Transaction {
  _id: string;
  userId: string;
  liskAmount: number;
  nairaAmount: number;
  liskAddress: string;
  paymentMethod: string;
  status: string;
  paymentReference: string;
  paymentDeadline: string;
  createdAt: string;
  updatedAt: string;
  bankDetails: BankDetails;
  fees: TransactionFees;
  paymentProof?: string; // Optional property for payment proof URL
}

export interface BuyTransactionResponse {
  status: string;
  data: {
    transaction: Transaction;
    amounts: Amounts;
    currentRates: CurrentRates;
    paymentInstructions: PaymentInstructions;
  };
}

export interface BuyTransactionRequest {
  liskAmount: number;
  liskAddress: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface TransactionHistoryResponse {
  status: string;
  data: {
    transactions: Transaction[];
    pagination: PaginationInfo;
  };
}

export interface TransactionDetailsResponse {
  status: string;
  data: {
    transaction: Transaction;
  };
}

export interface PaymentProof {
  url: string;
  uploadedAt: string;
}

export interface PaymentProofUploadResponse {
  status: string;
  data: {
    transaction: Transaction;
    paymentProof: PaymentProof;
  };
} 