export interface Alarm {
    id: number;
    time: string;
    sound: string;
    message: string;
    isActive: boolean;
    repeat?: string;
}

export type CreateAlarmRequest = Partial<Alarm>; // Permet la création d'alarmes avec des champs optionnels
export type UpdateAlarmRequest = Alarm; //
