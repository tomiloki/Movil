// types.ts
export interface Trip {
    id: number;
    destination: string;
    capacity: number;
    costPerPerson: number;
    createdAt: string;
    updatedAt: string;
    driverId: number;
}

export interface User {
    id: number;
    email: string;
    username?: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}
