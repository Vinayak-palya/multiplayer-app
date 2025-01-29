
const Google = () => {
    const handleGoogleLogin = () => {
        // Redirect to the backend's Google OAuth route
        window.location.href = "http://localhost:5000/auth/google"; // Replace with your backend URL
      };
    
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login with Google</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  )
}

export default Google
