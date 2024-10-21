import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const targetUrl = params.get('url');

    if (targetUrl) {
      const link = document.createElement('a');
      link.href = targetUrl;
      
      link.rel = 'noopener noreferrer';
      link.referrerPolicy = 'no-referrer';
    
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
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