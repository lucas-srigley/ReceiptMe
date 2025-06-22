import React from "react";
import backgroundImage from "@/assets/background.png"; 
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-end px-6 md:px-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="text-right max-w-xl mt-20 md:mt-0">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 drop-shadow-sm">
          Welcome
        </h1>
        <p className="text-lg md:text-xl text-blue-800 mb-8">
          Track your expenses smartly. Visualize spending. Let AI summarize receipts.
        </p>
        <div className="flex justify-end">
            <>
                <GoogleLogin
                    theme="outline"
                    size="large"
                    shape="pill"
                    text="signin_with"
                    onSuccess={async (credentialResponse) => {
                    if (!credentialResponse.credential) return;

                    const decoded = jwtDecode(credentialResponse.credential) as any;

                    const userData = {
                        googleId: decoded.sub,
                        email: decoded.email,
                        firstName: decoded.given_name,
                        lastName: decoded.family_name,
                        picture: decoded.picture,
                    };
                    localStorage.setItem("user", JSON.stringify(userData));
                    // navigate("/dashboard");


                    try {
                        const response = await fetch("http://localhost:3001/api/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                        });

                        if (!response.ok) throw new Error("Failed to store user");

                        const savedUser = await response.json();
                        console.log("User saved:", savedUser);

                        navigate("/dashboard");
                    } catch (error) {
                        console.error("User saving error:", error);
                    }
                    }}
                    onError={() => console.log("Login Failed")}
                />
            </>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
