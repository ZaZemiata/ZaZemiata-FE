import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { UserDataType } from '@/share/types';
import { clearStorageUserData, getStorageUserData, setStorageUserData } from '@/util/localStorage';

type AuthContextValueType = {
    userData: UserDataType | undefined;
    setUserData: (userData: UserDataType) => void;
    clearUserData: () => void;
};

const AuthContext = createContext<AuthContextValueType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginData = () => {
    const authValue = useContext(AuthContext);
    if (!authValue) {
        throw new Error('Error! AuthContext called from outside the AuthContextProvider');
    }

    return authValue;
};

export const AuthContextProvider = ({ children }: PropsWithChildren<object>) => {
    // get the login data from the local storage and set it in the state
    const [userData, setUserDataRaw] = useState<UserDataType | undefined>(() =>
        getStorageUserData()
    );

    // set the login data in the state and local storage 
    const setUserData = (loginResponseData: UserDataType) => {
        setUserDataRaw(loginResponseData);
        setStorageUserData(loginResponseData);
    };

    // clear the login data from the state and local storage
    const clearUserData = () => {
        setUserDataRaw(undefined);
        clearStorageUserData();
    };

    // return the AuthContext.Provider with the values
    return (
        <AuthContext.Provider
            value={{ userData, clearUserData, setUserData }}
        >
            {children}
        </AuthContext.Provider>
    );
};