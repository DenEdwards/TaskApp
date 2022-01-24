export class CreateTaskDTO {
    readonly title: string;
    readonly description: string; 
    readonly complete: boolean; 
    readonly created_at: Date;
}