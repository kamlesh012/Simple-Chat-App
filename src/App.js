import { getDatabase, ref, push, set,onChildAdded } from "firebase/database";
import {useEffect, useState} from 'react';
import React from 'react';
import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth";

import './App.css';

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin=()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setUser({name:result.user.displayName,email:result.user.email});
      console.log(token,user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  }
  const[user,setUser]=useState('');
  const [chats,setChat]=useState([]);
  const [msg,setMsg]=useState('');
  
  const db = getDatabase();
  const chatListRef = ref(db, 'chats'); //THis chatListRef Stores reference to chats inside db database

  const updateHeight=()=>{
    const element=document.getElementById("chat");
    if(element) {element.scrollTop=element.scrollHeight;}
    
  }
  //UseEffect Creating a bug here.
  //that dependency array is running forever.
  useEffect(()=>{
    onChildAdded(chatListRef,(data)=>{
      setChat(chats=>[...chats,data.val()])   //don't know how this arrow func is escaping closure.
      setTimeout(()=>{
        updateHeight();
      },100);
    });
  },[])

  //Below code won't work as Only last chat will be read due to JS CLosures.
  //still can't figure out exactly what is happening
  // useEffect(()=>{ //executes afer every update & render
  //   onChildAdded(chatListRef, (data) => {   //firebase func. reads data from chatListRef
  //     const c=[...chats];
  //     c.push(data.val());
  //     setChat(c);
  //   });
  // },[])

  const sendChat=()=>{
    const chatRef = push(chatListRef);  //This chatRef is pushed to CharListRef

    set(chatRef, {
      user,message:msg   //set  chatRef //data to be pushed
    });

    // const tempchats=[...chats];
    // tempchats.push({name:name,message:msg});
    // setChat(tempchats);
    setMsg('');
  }

  return (
    <div>
      {
        user.email?null:<div>
        {/* <input type="text" placeholder="ENTER Your NAME" onBlur={(e)=>setUser(e.target.value)}>
        </input> */}
        <button onClick={e=>{googleLogin()}}>Google SignIn</button>
        {/* <button className="btn" type="submit">Enter</button> */}
        </div>
      }
    {
      user.email?
      <div>
        <h2>User:  {user.name}</h2>
        <div id="chat" className="chat-container">
            { 
              chats.map((chat,id)=>{
                return(
                  //Key inside React Map -to keep siblings unique in react

                  <div key={id} className={`container ${chat.user.email===user.email?"me":''}`}>
                    <p className="chatbox">

                      <strong>{chat.user.name}:  </strong>

                      <span>{chat.message}</span>
                    </p>  
                  </div>
                )
              }
              )

            }
          
          <div className="btm">
            <input type="text"
             onInput={(e)=>{
              setMsg(e.target.value);
              }}
              value={msg}
              placeholder="ENTER YOUR MESSAGE" >
            </input>
            <button className="btn" type="submit" onClick={(e)=>sendChat()} >
             Send </button>
          </div>
        </div>
      </div>
     :null
     }

     </div>
  );
}

export default App;
