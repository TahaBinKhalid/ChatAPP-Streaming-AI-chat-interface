import { useAuthModel } from './AuthModel';
import { useAuth } from '../../context/AuthContext';

export const useAuthViewModel = () => {
    const { user } = useAuth();
    const authModel = useAuthModel();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        authModel.authenticate();
    };

    return {
        user,
        ...authModel,
        handleSubmit
    };
};