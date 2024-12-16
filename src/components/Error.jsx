import React from "react";
import { useNavigate } from "react-router-dom"; // To navigate programmatically

const PageNotFound = () => {
    const navigate = useNavigate(); // Hook to get navigate function

    const handleGoHome = () => {
        navigate(-1); // Navigate to prev page
    };

    return (
        <div className="text-center h-4/6 p-12 min-h-screen md:p-36 w-full md:mt-24 pt-64">
            <img src='/404.jpg' className='h-80 md:h-96 mx-auto justify-center ' />
            <p className="text-2xl text-gray-600 mb-10">An Unexpected Error has Occured!.Please retry</p>
            <a
                href="/explore"
                className="text-lg text-white bg-green-500 px-6 py-4 rounded-full cursor-pointer hover:underline"
            >
                Go Back 
            </a>
        </div>
    );
};

export default PageNotFound;
