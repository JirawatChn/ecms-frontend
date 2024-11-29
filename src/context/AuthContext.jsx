import { createContext } from 'react';

const AuthContext = createContext({
    token: '',
    roles: '',
    empId:'',
    setToken: () => {},
    setRoles: () => {},
    setEmpId: () =>{},
    logout: async () => {},
});

export { AuthContext };
