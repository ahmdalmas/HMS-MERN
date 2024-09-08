import { Input } from "./Input";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useStore from "../../../utils/StoreContext";

export default function RequestAcc() {
  const { requests, addRequest } = useStore();
  const register = async (event) => {
    console.log('request page: ' + requests);
    event.preventDefault();

    let data = {
      cms_id: inputCms,
    };

    try {
      const response = await fetch("http://localhost:3001/api/request/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errors?.[0]?.msg || 'An error occurred');
      }

      addRequest(result.cms_id);

      if (result.success) {
        toast.success(
          "Request sent Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.error(
          result.errors?.[0]?.msg || 'An error occurred', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      toast.error(error.message || 'Failed to send request. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };


  const [inputCms, setInputCms] = useState('');
  const changeCms = (event) => {
    setInputCms(event.target.value);
  }


  const cms = {
    name: "cms",
    type: "number",
    placeholder: "000000",
    req: true,
    onChange: changeCms,
  }

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Request account from Hostel Manager
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={register}>
          <Input field={cms} />
          <button
            type="submit"
            className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 focus:ring-blue-800"
          >
            Request
          </button>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <p className="text-sm font-light text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth"
              className="font-medium hover:underline text-blue-500"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
