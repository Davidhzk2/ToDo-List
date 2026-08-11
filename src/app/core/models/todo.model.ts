
export interface Task {
    id:string;
    name: string;
    categoryId?: string | undefined;
    completed:boolean;
    createdAt: string;
}


export interface Category {
    id:string;
    name: string;
}