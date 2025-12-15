import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { loginWithEmail, registerWithEmail, loginWithGoogle, error } = useAuth();

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegistering) {
            await registerWithEmail(email, password);
        } else {
            await loginWithEmail(email, password);
        }
    };

    return (
        <div className="auth-container" style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '8px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {isRegistering ? 'Sign Up' : 'Sign In'}
                </button>
            </form>

            <div style={{ margin: '1rem 0', textAlign: 'center' }}>OR</div>

            <button
                onClick={loginWithGoogle}
                style={{ width: '100%', padding: '8px', backgroundColor: '#db4437', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Sign in with Google
            </button>

            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    style={{ background: 'none', border: 'none', color: '#646cff', cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
                >
                    {isRegistering ? 'Login' : 'Register'}
                </button>
            </p>
        </div>
    );
};
