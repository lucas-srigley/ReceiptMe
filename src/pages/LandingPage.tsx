import React from "react";
import backgroundImage from "@/assets/background.png"; 
import { GoogleLogin } from "@react-oauth/google"

const LandingPage = () => {
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
        <>
            <GoogleLogin 
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
            }} 
            onError={ () => console.log("Login Failed")}/>
        </>
        
      </div>
    </div>
  );
};

export default LandingPage;
