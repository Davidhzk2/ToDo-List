
export interface Task {
    id:string;
    name: string;
    categoryId?: string;
    completed:boolean;
    createdAt: string;
}


export interface Category {
    id:string;
    name: string;
}