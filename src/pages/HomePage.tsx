import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/User';

function HomePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }
  
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            navigate('/login');
            throw new Error('Failed to fetch user data');
          }
  
          const data: User = await response.json();
          setUser(data);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, [navigate]);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-gray-900">Loading...</div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-red-500">{error}</div>
        </div>
      );
    }
  
    return (
      <div className="App flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">User Information</h3>
              <div className="mt-4">
                <p className="text-sm text-gray-600"><strong>Email:</strong> {user!.email}</p>
                <p className="text-sm text-gray-600"><strong>password:</strong> {user!.password}</p>
                <p className="text-sm text-gray-600"><strong>id:</strong> {user!.id}</p>
                <p className="text-sm text-gray-600"><strong>Created At:</strong> {new Date(user!.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default HomePage;