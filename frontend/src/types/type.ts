export interface ISignupData {
  username: string;
  fullName: string;
  email: string;
  verifyEmail: string;
  password: string;
  verifyPassword: string;
  preferences?: {
    theme?: string;
    fontSize?: number;
    language?: string;
  };
}
export interface ILoginData {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

export interface IUser {
  preferences: {
    theme: string;
    fontSize: number;
  };
  _id: string;
  fullName: string;
  username: string;
  email: string;
  avatar: string;
  highestWordsPerMinute: number;
  bestAccuracy: number;
  wordCountTyped: number;
  testHistory: Array<any>;
  createdAt: string;
  updatedAt: string;
  testsStarted: number;
  testsCompleted: number;
  timeTyping: number;
}
export interface IGenConfigs {
  min?: number;
  max?: number;
  exactly?: number;
  join?: string;
  number?: boolean;
  punctuation?: boolean;
  cases?: boolean;
}

export interface IResult {
  timeInSec: number;
  wpm: number;
  raw: number;
  acc: number;
  wpmSpeed: number[];
  rawSpeed: number[];
  wrongCharCounts: (number | null)[];
  firstWrongIndexes: (number | null)[];
}
export interface IGraphData {
  wpmSpeed: number[];
  rawSpeed: number[];
}
