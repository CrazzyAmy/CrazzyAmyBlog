
export const setLocalToken = (token)=> {
    localStorage.setItem('todoListToken', token);
  }
  
  export const getLocalToken = () => {
    return localStorage.getItem('todoListToken');
  }