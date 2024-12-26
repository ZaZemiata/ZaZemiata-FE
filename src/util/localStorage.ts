import { UserDataType } from "@/share/types";

export const getUserData = (): UserDataType | undefined => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : undefined;
};

export function setUserData(data: UserDataType): void {
    localStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData(): void {
    localStorage.removeItem('userData');
}