import { UserDataType } from "@/share/types";

export const getStorageUserData = (): UserDataType | undefined => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : undefined;
};

export function setStorageUserData(data: UserDataType): void {
    localStorage.setItem('userData', JSON.stringify(data));
}

export function clearStorageUserData(): void {
    localStorage.removeItem('userData');
}