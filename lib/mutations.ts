import fetcher from './fetcher';

export const auth = (
    mode: 'signin' | 'signup', 
    body: {
        email?: string,
        password?: string,
        password_confirm?: string,
    }) => {
        return fetcher(`/${mode}`, body);
    }