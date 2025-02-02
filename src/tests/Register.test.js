import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import toast from "react-hot-toast";
import React from 'react';
import Register from "../components/Auth/Register"
import { Context } from "../components/context/UserContextProvider";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the axios and toast libraries
jest.mock("axios");
jest.mock("react-hot-toast");

describe('Register Component', () => {
    // Clearing all mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should display success toast message on register', async () => {
        // Render the Register component within the required context and router
        render(
            <Router>
                <Context.Provider value={{ isAuthorized: false, setIsAuthorized: jest.fn() }}>
                    <Register />
                </Context.Provider>
            </Router>
        );

        // Mocking the API response for the registerUserApi
        const mockResponse = {
            data: {
                message: 'User created successfully'
            }
        };
        axios.post.mockResolvedValue(mockResponse);

        // Mocking the success toast
        toast.success = jest.fn();

        // Finding inputs and the submit button from the screen
        const nameInput = await screen.findByPlaceholderText('Name');
        const emailInput = await screen.findByPlaceholderText('eg@gmail.com');
        const phoneInput = await screen.findByPlaceholderText('12345678');
        const passwordInput = await screen.findByPlaceholderText('Your Password');
        const roleSelect = await screen.findByRole('combobox');
        const submitBtn = screen.getByText('Register');

        // Simulating filling in the input fields
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(roleSelect, { target: { value: 'Job Seeker' } });

        // Simulate clicking the submit button
        fireEvent.click(submitBtn);

        // Ensuring all the above tests are working fine
        await waitFor(() => {
            // Expect API call with the data we entered
            expect(axios.post).toHaveBeenCalledWith(
                "http://localhost:4000/api/v1/user/register",
                {
                    name: 'John Doe',
                    phone: '1234567890',
                    email: 'johndoe@example.com',
                    role: 'Job Seeker',
                    password: 'password123'
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            // Check if the success toast is called
            expect(toast.success).toHaveBeenCalledWith('User created successfully');
        });
    });

    it('Should display error toast message on failed register', async () => {
        // Render the Register component within the required context and router
        render(
            <Router>
                <Context.Provider value={{ isAuthorized: false, setIsAuthorized: jest.fn() }}>
                    <Register />
                </Context.Provider>
            </Router>
        );

        // Mocking the API response for a failed registration
        const mockError = {
            response: {
                data: {
                    message: 'Email already exists'
                }
            }
        };
        axios.post.mockRejectedValue(mockError);

        // Mocking the error toast
        toast.error = jest.fn();

        // Finding inputs and the submit button from the screen
        const nameInput = await screen.findByPlaceholderText('Name');
        const emailInput = await screen.findByPlaceholderText('eg@gmail.com');
        const phoneInput = await screen.findByPlaceholderText('12345678');
        const passwordInput = await screen.findByPlaceholderText('Your Password');
        const roleSelect = await screen.findByRole('combobox');
        const submitBtn = screen.getByText('Register');

        // Simulating filling in the input fields
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(roleSelect, { target: { value: 'Job Seeker' } });

        // Simulate clicking the submit button
        fireEvent.click(submitBtn);

        // Ensuring all the above tests are working fine
        await waitFor(() => {
            // Check if the error toast is called
            expect(toast.error).toHaveBeenCalledWith('Email already exists');
        });
    });
});
