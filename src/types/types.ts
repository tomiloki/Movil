// types.ts
export type Trip = {
    id: number;
    destination: string;
    capacity: number;
    costPerPerson: number;
  };

export interface User {
    id: number;
    email: string;
    username?: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}
