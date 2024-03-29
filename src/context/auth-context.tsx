import React, {  ReactNode, useCallback } from "react";
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/serach-pannel'
import { http } from "utils/http";
import { useMount } from "utils/index";
import { useAsync } from "utils/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
    username:string;
    password:string;
}

const AuthContext = React.createContext< 
  | {
    user:User | null;
    login:(form:AuthForm)=>Promise<void>;
    register:(form:AuthForm)=>Promise<void>;
    logout:()=> Promise<void>;
   } 
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me',{token})
        user = data.user
    }
    return user
}

export const AuthProvider = ({ children }:{ children: ReactNode }) => {
    const {run,isError,isIdle,isLoading,data:user,setData:setUser,error} = useAsync<User | null>()
    
    // point free
    const login = (form:AuthForm) => auth.login(form).then(setUser)
    const register = (form:AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(()=>setUser(null))

    useMount(
        useCallback(()=>{
            run(bootstrapUser())
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
    )

    if (isIdle || isLoading) {
        return <FullPageLoading />
    }

    if (isError) {
        return <FullPageErrorFallback error={error} />
    }

    return <AuthContext.Provider 
        children={children} 
        value={{user,login,register,logout}} 
    />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用');
    }
    return context
}
