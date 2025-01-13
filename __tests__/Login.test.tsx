import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from '../src/App';

test('navigates to Home screen on successful login', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
        <NavigationContainer>
            <App />
        </NavigationContainer>
    );

    // Simulate entering credentials
    const usernameInput = getByPlaceholderText('Enter mobile number');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');

    fireEvent.changeText(usernameInput, '1234512345');
    fireEvent.changeText(passwordInput, 'yoursecretpasscode');

    // Simulate pressing the login button
    fireEvent.press(loginButton);

    // Wait for navigation to complete and the Home screen to appear
    const homeScreenText = await findByText('Home');
    expect(homeScreenText).toBeTruthy();
});
