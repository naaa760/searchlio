// src/components/Redirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the URL from the search parameters
    const params = new URLSearchParams(window.location.search);
    const targetUrl = params.get('url');

    if (targetUrl) {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = targetUrl;
      
      // Set privacy attributes
      link.rel = 'noopener noreferrer';
      link.referrerPolicy = 'no-referrer';
      
      // Simulate click and remove the element
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Navigate back to the search page after a brief delay
      setTimeout(() => {
        navigate('/');
      }, 100);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="mb-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent mx-auto" />
        </div>
        <p>Redirecting you securely...</p>
      </div>
    </div>
  );
}