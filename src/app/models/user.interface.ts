export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  age: number;
  about?: string;
  areaOfInterests?: string[];
  type: 'student' | 'professional';
  professionalDetails?: {
    experience: number;
    expertise?: 'front-end' | 'back-end';
    role?: string;
  };
}
