"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Dash1 from "../components/Dash-1";
import Navbar from "../components/Navbar";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function Page() {
    
  const { user, signOut } = useAuthenticator();

  return (
    <>
    <div className="w-full h-full bg-white">

    <Navbar user={user} signOut={signOut} />

    <header className="relative bg-white shadow mb-12">
      <div className="flex mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8 items-center">

      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard <span className="text-2xl font-light"> (Duty Manager)</span></h1>
       
       <div className="flex ml-auto text-slate-500 text-[.9rem]">{user?.signInDetails?.loginId}</div>
      </div>
    </header>

    <Dash1 />

    {/* <main className="mx-auto py-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center p-4 bg-amber-50">

      <button className="bg-sky-600" onClick={createTodo} >+ new</button>

      <ul className="text-lime-800">
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul>

      <div>
     
      </div>
    </main> */}

    </div>
    </>
  );
}