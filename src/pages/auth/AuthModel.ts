import { useState } from 'react';
import { FirebaseService } from '../../services/FirebaseService';

export const useAuthModel = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const authenticate = async () => {
        setError('');
        setLoading(true);
        try {
            if (isRegistering) {
                await FirebaseService.signUp(email, password);
            } else {
                await FirebaseService.signIn(email, password);
            }
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await FirebaseService.logout();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        isRegistering, setIsRegistering,
        error, loading, authenticate, logout
    };
};