import { useState } from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  googleProvider
} from "./firebase";

import {
  Link,
  useNavigate
} from "react-router-dom";



function Login(){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const navigate=useNavigate();





const login = async(e)=>{

e.preventDefault();


try{

await signInWithEmailAndPassword(
auth,
email,
password
);


navigate("/dashboard");


}catch(error){

alert(error.message);

}


};






const googleLogin = async()=>{


try{


await signInWithPopup(
auth,
googleProvider
);


navigate("/dashboard");


}catch(error){

alert(error.message);

}


};





return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-5">


<div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">


<h1 className="text-3xl font-bold text-blue-600 text-center">

NotesMind AI 🤖

</h1>


<p className="text-center text-gray-500 mb-6">

Login Account

</p>




<form onSubmit={login}>


<input

type="email"

placeholder="Email"

className="w-full border p-3 rounded-lg mb-4 text-black"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

placeholder="Password"

className="w-full border p-3 rounded-lg mb-5 text-black"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>




<button

className="w-full bg-blue-600 text-white py-3 rounded-lg"

>

Login

</button>


</form>





<button

onClick={googleLogin}

className="w-full mt-3 bg-red-500 text-white py-3 rounded-lg"

>

Continue with Google

</button>





<p className="text-center mt-5">

Don't have account?

<Link
to="/signup"
className="text-purple-600 ml-2 font-semibold"
>
Signup
</Link>

</p>



</div>


</div>

);


}


export default Login;