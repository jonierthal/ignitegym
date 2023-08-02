import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode } from "react";

export type AuthContextDataProps = {
    user: UserDTO;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    return (
        <AuthContext.Provider value={{
            user: {
              id:'1',
              name: 'João Pedro',
              email: 'jonierthal@gmail.com',
              avatar: 'jonathan.png'
            }
          }}>
           {children}
          </AuthContext.Provider>
    )
}