export interface Thing {
    id?: number;
    fileUrl?: string;
    description?: string;
    archived?: boolean;
    removed?: boolean;
    profileId?: number;
    profileTaskId?: number;
    addedDate?: string;
    taskOrdinalNumber?: number;
}