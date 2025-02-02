import React from 'react';
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import toast from "react-hot-toast";
import Login from "../components/Auth/Login";
import { Context } from "../components/context/UserContextProvider";
import { BrowserRouter as Router } from "react-router-dom";

// Mock axios and toast
jest.mock("axios");
jest.mock("react-hot-toast");

describe('Login Component', () => {
    const mockSetIsAuthorized = jest.fn();
    const mockSetUser = jest.fn();

    const renderComponent = (isAuthorized = false) => {
        return render(
            <Router>
                <Context.Provider
                    value={{
                        isAuthorized,
                        setIsAuthorized: mockSetIsAuthorized,
                        user: null,
                        setUser: mockSetUser,
                    }}
                >
                    <Login />
                </Context.Provider>
            </Router>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should display success toast message on successful login', async () => {
        const mockResponse = {
            data: {
                message: 'Login successful',
                user: {
                    id: '123',
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    role: 'Job Seeker'
                }
            }
        };
        axios.post.mockResolvedValue(mockResponse);

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('eg@gmail.com'), {
            target: { value: 'johndoe@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Your Password'), {
            target: { value: 'password123' }
        });
        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: 'Job Seeker' }
        });

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                "http://localhost:4000/api/v1/user/login",
                {
                    email: 'johndoe@example.com',
                    password: 'password123',
                    role: 'Job Seeker'
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            expect(mockSetUser).toHaveBeenCalledWith({
                id: '123',
                name: 'John Doe',
                email: 'johndoe@example.com',
                role: 'Job Seeker'
            });

            expect(mockSetIsAuthorized).toHaveBeenCalledWith(true);
            expect(toast.success).toHaveBeenCalledWith('Login successful');
        });
    });

    it('Should display error toast message on failed login', async () => {
        const mockError = {
            response: {
                data: {
                    message: 'Invalid credentials'
                }
            }
        };
        axios.post.mockRejectedValue(mockError);

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('eg@gmail.com'), {
            target: { value: 'wrongemail@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Your Password'), {
            target: { value: 'wrongpassword' }
        });
        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: 'Job Seeker' }
        });

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
            expect(screen.getByPlaceholderText('eg@gmail.com').value).toBe('');
            expect(screen.getByPlaceholderText('Your Password').value).toBe('');
            expect(screen.getByRole('combobox').value).toBe('');
        });
    });

    it('Should redirect to home page if already authorized', () => {
        renderComponent(true);
        expect(screen.queryByText('Login to your account')).not.toBeInTheDocument();
    });
});
