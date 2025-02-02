import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import JobDetails from "../components/Job/JobDetails";
import { Context } from "../components/context/UserContextProvider";
import { createMemoryHistory } from "history";

// Mock axios
jest.mock("axios");

describe('JobDetails Component', () => {
    const mockNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate,
    }));

    const renderComponent = (isAuthorized = true, user = null) => {
        return render(
            <Router>
                <Context.Provider value={{ isAuthorized, user }}>
                    <Routes>
                        <Route path="/job/:id" element={<JobDetails />} />
                    </Routes>
                </Context.Provider>
            </Router>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should fetch and display job details on successful fetch', async () => {
        const mockJobData = {
            data: {
                job: {
                    _id: '123',
                    title: 'Software Developer',
                    category: 'IT',
                    country: 'USA',
                    city: 'New York',
                    location: 'Remote',
                    description: 'Job description here',
                    jobPostedOn: '2024-08-16',
                    fixedSalary: 60000,
                    salaryFrom: null,
                    salaryTo: null
                }
            }
        };
        axios.get.mockResolvedValue(mockJobData);

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(/Software Developer/)).toBeInTheDocument();
            expect(screen.getByText(/IT/)).toBeInTheDocument();
            expect(screen.getByText(/USA/)).toBeInTheDocument();
            expect(screen.getByText(/New York/)).toBeInTheDocument();
            expect(screen.getByText(/Remote/)).toBeInTheDocument();
            expect(screen.getByText(/Job description here/)).toBeInTheDocument();
            expect(screen.getByText(/60000/)).toBeInTheDocument();
        });
    });

    it('Should redirect to login page if user is not authorized', async () => {
        renderComponent(false);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });

    it('Should redirect to not found page if job does not exist', async () => {
        axios.get.mockRejectedValue(new Error('Job not found'));

        renderComponent();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/notfound');
        });
    });

    it('Should render "Apply Now" button for non-employer users', async () => {
        const mockJobData = {
            data: {
                job: {
                    _id: '123',
                    title: 'Software Developer',
                    category: 'IT',
                    country: 'USA',
                    city: 'New York',
                    location: 'Remote',
                    description: 'Job description here',
                    jobPostedOn: '2024-08-16',
                    fixedSalary: 60000,
                    salaryFrom: null,
                    salaryTo: null
                }
            }
        };
        axios.get.mockResolvedValue(mockJobData);

        renderComponent(true, { role: 'Job Seeker' });

        await waitFor(() => {
            expect(screen.getByText(/Apply Now/)).toBeInTheDocument();
        });
    });

    it('Should not render "Apply Now" button for employer users', async () => {
        const mockJobData = {
            data: {
                job: {
                    _id: '123',
                    title: 'Software Developer',
                    category: 'IT',
                    country: 'USA',
                    city: 'New York',
                    location: 'Remote',
                    description: 'Job description here',
                    jobPostedOn: '2024-08-16',
                    fixedSalary: 60000,
                    salaryFrom: null,
                    salaryTo: null
                }
            }
        };
        axios.get.mockResolvedValue(mockJobData);

        renderComponent(true, { role: 'Employer' });

        await waitFor(() => {
            expect(screen.queryByText(/Apply Now/)).not.toBeInTheDocument();
        });
    });
});
