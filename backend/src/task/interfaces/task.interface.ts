import { Document } from 'mongoose';

export interface Task extends Document {
    readonly title: string;
    readonly description: string; 
    readonly complete: boolean; 
    readonly created_at: Date;
}