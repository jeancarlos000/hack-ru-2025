import { useEffect } from "react";
import axios from "axios";

function Login() {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );

    // Optional: show One Tap prompt
    google.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: response.credential,
      });

      // Store JWT & user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(`Welcome ${res.data.user.name}!`);
    } catch (err) {
      console.error(err);
      alert("Google Sign-In failed.");
    }
  };

  return <div id="googleSignInDiv"></div>;
}

export default Login;
