// This is inside your App.jsx file

export default function App() {
  // ... (other state variables)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // This is the code that runs automatically when the page loads
  useEffect(() => {
    const autoLogin = async () => {
      try {
        // It tries to call the backend auto-login endpoint
        const response = await API.post('/api/auto-login-debug/');
        // If the backend call is successful, it sets isAuthenticated to true
        setIsAuthenticated(true);
        // ...
      } catch (error) {
        // If the backend call FAILS for any reason, it comes here
        console.error("Auto-login failed:", error);
        // And it sets isAuthenticated to false
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    autoLogin();
  }, []);

  // ... (the handleLogout function) ...

  if (isLoading) {
    // First it shows "Loading..."
    return ( <div>Loading...</div> );
  }

  // --- VVV THIS IS THE EXACT CODE BLOCK CAUSING THE ERROR VVV ---
  // After loading, it checks if the user is authenticated
  if (!isAuthenticated) {
    // If auto-login failed, isAuthenticated is false, so it comes here
    // And it displays the error message you are seeing.
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-red-500">
            Could not automatically log in. Please ensure the user 'testuser' exists and is an agent.
        </div>
    );
  }
  // --- END OF THE CODE BLOCK ---

  // If isAuthenticated is true, it shows the main dashboard
  return (
    // ... the main dashboard JSX ...
  );
}