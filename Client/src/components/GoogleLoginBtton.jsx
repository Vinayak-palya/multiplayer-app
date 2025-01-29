import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
const GoogleLoginButton = () => {
  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    window.location.href = 'http://localhost:8000/google'; // Redirect to backend
  };
const clientId = "567873583675-3ku30m63slmq1d43l5ejakm7spcg7a0p.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId = {clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed')}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
