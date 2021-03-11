export interface User {
    id: string;
    username: string;
    email: string;
    hashed: string;
    is_visible?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Task {
    id: string;
    name: string;
    description: string;
    user_id: User["id"];
    status_id: Status["id"];
    complete_by: string;
    is_late: boolean;
    is_completed: boolean;
    completed_at?: string;
    is_visible: string;
    created_at: string;
    updated_at: string;
}

// export interface List {
//     id: string;
//     name: string;
//     description: string;
//     user_id: User["id"];
//     complete_by: string;
//     is_completed: boolean;
//     completed_at: string;
//     is_visible: string;
//     created_at: string;
//     updated_at: string;
// }

// export interface ListTask {
//     task_id: Task["id"];
//     list_id: List["id"];
// }

export interface Status {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface TaskCategories {
    task_id: Task["id"];
    category_id: Category["id"];
}