export interface TodoRow {
    id: number,
    user_id: string,
    task: string,
    is_complete: boolean,
    created_at: string,
    completed_date: null,
    status: 'planned' | 'in_progress' | 'completed' | 'paused' | 'canceled',
    last_modified: string
}
