"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";

import Navbar from "../components/Navbar";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function Page() {
    
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <>
    <div className="w-full h-full bg-white">
    <Navbar user={user} signOut={signOut} />
    <main className="mx-auto py-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center p-4 bg-amber-50">

      <button className="bg-sky-600" onClick={createTodo} >+ new</button>

      <ul className="text-lime-800">
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      
      <div>
     
      </div>
    </main>
    </div>
    </>
  );
}