import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { UserDataType } from '@/share/types';
import { clearUserData, getUserData, setUserData } from '@/util/localStorage';

type AuthContextValueType = {
    loginData: UserDataType | undefined;
    setLoginData: (userData: UserDataType) => void;
    clearLoginData: () => void;
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
    const [loginData, setLoginDataRaw] = useState<UserDataType | undefined>(() =>
        getUserData()
    );

    // set the login data in the state and local storage 
    const setLoginData = (loginResponseData: UserDataType) => {
        setLoginDataRaw(loginResponseData);
        setUserData(loginResponseData);
    };

    // clear the login data from the state and local storage
    const clearLoginData = () => {
        setLoginDataRaw(undefined);
        clearUserData();
    };

    // return the AuthContext.Provider with the values
    return (
        <AuthContext.Provider
            value={{ loginData, clearLoginData, setLoginData }}
        >
            {children}
        </AuthContext.Provider>
    );
};