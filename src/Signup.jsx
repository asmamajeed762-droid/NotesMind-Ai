import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";


function Signup() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();



  const handleSignup = async(e)=>{

    e.preventDefault();


    try{

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


      navigate("/dashboard");


    }catch(error){

      alert(error.message);

    }

  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-5">


      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">


        <h1 className="text-3xl font-bold text-purple-600 text-center">
          Create Account 🚀
        </h1>


        <p className="text-gray-500 text-center mt-2 mb-6">
          Join NotesMind AI
        </p>




        <form onSubmit={handleSignup}>


          <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          className="w-full border p-3 rounded-lg mb-4 text-black"

          />




          <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          className="w-full border p-3 rounded-lg mb-5 text-black"

          />




          <button

          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"

          >

            Signup

          </button>


        </form>




        <p className="text-center mt-5 text-gray-600">

          Already have account?

          <Link
          to="/"
          className="text-blue-600 ml-2 font-semibold"
          >
            Login
          </Link>

        </p>


      </div>


    </div>

  );

}


export default Signup;