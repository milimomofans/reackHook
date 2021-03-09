import React,{FormEvent} from 'react'

const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = () => {

    const login = (params:{username:string,password:string}) => {
        fetch(`${apiUrl}/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(params)
        }).then(async response=>{
            if (response.ok) {
               console.log(response)
            }
        })
    }

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const username = (event.currentTarget.elements[0] as HTMLFormElement).value
        const password = (event.currentTarget.elements[1] as HTMLFormElement).value
        
        login({username,password})
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={'username'} />
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={'password'} />
        </div>
        <button>登录</button>
    </form>
}