import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordAPI } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const { mutate } = useMutation({
        mutationFn: resetPasswordAPI,
        onSuccess: () => {
            navigate("/");
            console.log("success");
            
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { password, id, token };
        mutate(data);
        console.log(password, id, token);  
    };
    return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        
        <div className="w-full bg-white rounded-lg shadow dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Your Password
            </h1>
            <form className="space-y-6 " onSubmit={handleSubmit}>
            <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              {/* <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div> */}
          
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Confirm
              </button>
         
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
)}

export default ResetPassword;