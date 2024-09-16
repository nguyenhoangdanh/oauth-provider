import React, { useState } from 'react';
import googleIcon from '../assets/google-icon.svg';
import facebookIcon from '../assets/facebook-icon.svg';
import { useAuth } from '../../hooks';
import { useNavigation } from '../../ultils/useNavigation';

const OAuthPage: React.FC = () => {
    const navigate = useNavigation();
    const { signIn, signUp } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [serverError, setServerError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const isSignUp = typeof window !== 'undefined' && window.location.pathname === '/sign-up';

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one letter and one number';
        }

        if (isSignUp) {
            if (!name) {
                newErrors.name = 'Name is required';
            }
            if (!confirmPassword) {
                newErrors.confirmPassword = 'Confirm Password is required';
            } else if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        setServerError('');
        setSuccessMessage('');
        try {
            if (isSignUp) {
                // Handle sign-up logic
                const response = await signUp({ name, email, password });
                if (!response.ok) {
                    throw new Error(response?.message);
                }
                setSuccessMessage('Sign up successful! You can now sign in.');
                console.log('Sign Up:', { name, email, password });
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                // Handle sign-in logic
                const response = await signIn({ email, password });
                if (!response.ok) {
                    throw new Error(response?.message);
                }
                setSuccessMessage('Sign in successful! Welcome back.');
                console.log('Sign In:', { email, password });
                setEmail('');
                setPassword('');
            }
        } catch (error: any) {
            setServerError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = () => {
        navigate(isSignUp ? '/sign-in' : '/sign-up');
    };

    return (
        <div>
            <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                )}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                {isSignUp && (
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </div>
                )}
                {serverError && <p>{serverError}</p>}
                {successMessage && <p>{successMessage}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
                <div className="sns">
                    <button id='google'>
                        <img src={googleIcon} alt="Google" />
                        Google
                    </button>
                    <button id='facebook'>
                        <img src={facebookIcon} alt="Facebook" />
                        Facebook
                    </button>
                </div>
                <div className="text">
                    <p onClick={handleNavigate}>{isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                </div>
            </form>
        </div>
    );
};

export default OAuthPage;