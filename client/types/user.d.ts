export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

export interface Rating {
  id: string;
  comment: string;
  rate: number;
  userId: string;
  ratedUserId: string;
}
