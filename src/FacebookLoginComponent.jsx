import React, { useState } from 'react';

function FacebookLoginComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const handleSuccess = (response) => {
        if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            fetchUserProfile(accessToken);
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    };

    const fetchUserProfile = (accessToken) => {
        window.FB.api('/me', { fields: 'name' }, (profile) => {
            console.log('Login Success:', profile);
            setUserName(profile.name);
            setIsLoggedIn(true);
        });
    };

    const handleLogin = () => {
        window.FB.login(handleSuccess, { scope: 'public_profile,email' });
    };

    return (
        <>
            {!isLoggedIn ? (
                <button onClick={handleLogin}>Login with Facebook</button>
            ) : (
                <h2>Welcome {userName}</h2>
            )}
        </>
    );
}

export default FacebookLoginComponent;