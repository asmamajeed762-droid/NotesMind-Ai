import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import {
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  db,
  auth
} from "./firebase";

import {
  useNavigate
} from "react-router-dom";

import {
  generateSummary
} from "./gemini";

import jsPDF from "jspdf";


function Dashboard() {


  const [user,setUser] = useState(null);

  const [notes,setNotes] = useState([]);

  const [note,setNote] = useState("");

  const [editId,setEditId] = useState(null);

  const [search,setSearch] = useState("");

  const [summary,setSummary] = useState("");

  const [darkMode,setDarkMode] = useState(false);

  const [loading,setLoading] = useState(false);


  const navigate = useNavigate();





  // User Check + Notes Load

  useEffect(()=>{


    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser)=>{


        setUser(currentUser);



        if(!currentUser){

          navigate("/");

          return;

        }



        const q = query(

          collection(db,"notes"),

          where(
            "userId",
            "==",
            currentUser.uid
          )

        );



        const notesListener = onSnapshot(
          q,
          (snapshot)=>{


            setNotes(

              snapshot.docs.map((item)=>({

                id:item.id,

                ...item.data()

              }))

            );


          }

        );



        return ()=>notesListener();



      }

    );



    return ()=>unsubscribe();



  },[navigate]);









  // Add / Update Note

  const saveNote = async(e)=>{


    e.preventDefault();



    if(note.trim()===""){

      return;

    }




    if(editId){


      await updateDoc(

        doc(db,"notes",editId),

        {

          text:note

        }

      );


      setEditId(null);



    }

    else{


      await addDoc(

        collection(db,"notes"),

        {

          text:note,

          userId:user.uid,

          createdAt:serverTimestamp()

        }

      );


    }



    setNote("");



  };









  // Delete

  const deleteNote = async(id)=>{


    await deleteDoc(

      doc(db,"notes",id)

    );


  };







  // Edit

  const editNote = (item)=>{


    setNote(item.text);

    setEditId(item.id);


  };







  // Gemini

  const aiSummary = async(text)=>{


    try{


      setLoading(true);


      const result = await generateSummary(text);


      setSummary(result);



    }

    catch(error){


      alert(error.message);


    }


    setLoading(false);


  };







  // PDF

  const downloadPDF = (text)=>{


    const pdf = new jsPDF();


    pdf.text(
      text,
      10,
      20
    );


    pdf.save(
      "NotesMind-note.pdf"
    );


  };







  // Logout

  const logout = async()=>{


    await signOut(auth);


    navigate("/");


  };







  const filteredNotes = notes.filter((item)=>

    item.text
    .toLowerCase()
    .includes(
      search.toLowerCase()
    )

  );
  return (

    <div
      className={
        darkMode
        ? "min-h-screen bg-gray-900 p-6 text-white"
        : "min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-6"
      }
    >


      <div className="max-w-6xl mx-auto">


        {/* Header */}

        <div className="flex flex-wrap justify-between items-center mb-8">


          <div>

            <h1 className="text-4xl font-bold text-purple-700">
              NotesMind AI 🤖
            </h1>

            <p className="text-gray-600 mt-2">
              {user?.email}
            </p>

          </div>



          <div className="flex gap-3">


            <button

            onClick={()=>setDarkMode(!darkMode)}

            className="bg-purple-600 text-white px-4 py-2 rounded-lg"

            >

              🌙

            </button>



            <button

            onClick={logout}

            className="bg-red-500 text-white px-5 py-2 rounded-lg"

            >

              Logout

            </button>


          </div>


        </div>





        {/* Add Note */}


        <form

        onSubmit={saveNote}

        className="bg-white rounded-2xl shadow-xl p-6 mb-8"

        >


          <h2 className="text-2xl font-bold text-blue-600 mb-4">

            {editId ? "Update Note ✏️" : "Create New Note 📝"}

          </h2>



          <textarea

          value={note}

          onChange={(e)=>setNote(e.target.value)}

          placeholder="Write your note..."

          rows="5"

          className="w-full border p-3 rounded-lg text-black"

          />



          <button

          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"

          >

            {editId ? "Update" : "Save Note"}

          </button>


        </form>







        {/* Search */}


        <input

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        placeholder="Search notes..."

        className="w-full p-3 border rounded-lg mb-6 text-black"

        />







        {/* AI Result */}

        {summary && (

          <div className="bg-white rounded-xl shadow p-5 mb-6">


            <h2 className="text-xl font-bold text-blue-600">

              🤖 Gemini Summary

            </h2>


            <p className="mt-3 text-gray-700 whitespace-pre-line">

              {summary}

            </p>


          </div>

        )}








        {/* Notes Cards */}


        <div className="grid md:grid-cols-2 gap-6">



          {filteredNotes.length === 0 && (

            <p className="text-gray-600">

              No notes found. Add your first note!

            </p>

          )}






          {filteredNotes.map((item)=>(


            <div

            key={item.id}

            className="bg-white rounded-2xl shadow-lg p-5"

            >



              <p className="text-gray-800 mb-5">

                {item.text}

              </p>





              <div className="flex flex-wrap gap-2">



                <button

                onClick={()=>editNote(item)}

                className="bg-yellow-500 text-white px-3 py-2 rounded-lg"

                >

                  Edit

                </button>




                <button

                onClick={()=>deleteNote(item.id)}

                className="bg-red-600 text-white px-3 py-2 rounded-lg"

                >

                  Delete

                </button>





                <button

                onClick={()=>aiSummary(item.text)}

                className="bg-blue-600 text-white px-3 py-2 rounded-lg"

                >

                  {loading ? "Loading..." : "AI Summary"}

                </button>





                <button

                onClick={()=>downloadPDF(item.text)}

                className="bg-green-600 text-white px-3 py-2 rounded-lg"

                >

                  PDF

                </button>



              </div>



            </div>


          ))}



        </div>



      </div>



    </div>

  );


}


export default Dashboard;