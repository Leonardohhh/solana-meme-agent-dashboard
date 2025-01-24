"use client";

import { useState } from "react";
import { addAccount, deleteAccount } from "./services";
import { useMutation } from "@tanstack/react-query";

export default function Home() {
  const [username, setUsername] = useState("");

  const {
    mutate: addAccountMutation,
    isPending,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: addAccount,
    onError: (error) => {
      console.error("Error adding account:", error);
    },
  });

  const {
    mutate: deleteAccountMutation,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    data: deleteData,
  } = useMutation({
    mutationFn: deleteAccount,
    onError: (error) => {
      console.error("Error deleting account:", error);
    },
  });

  const handleOnSubmit = () => {
    if (username) {
      addAccountMutation(username);
    }
  };

  const handleDelete = () => {
    if (username) {
      deleteAccountMutation(username);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <label htmlFor="username-input" className="flex flex-col gap-2">
          Add account:
          <input
            id="username-input"
            type="text"
            placeholder="Enter x account username"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <div className="flex gap-2 w-full">
          <button
            onClick={handleOnSubmit}
            disabled={isPending}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isPending ? "Loading..." : "Submit"}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeletePending}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {isDeletePending ? "Deleting..." : "Delete"}
          </button>
        </div>
        <div>
          {isSuccess ? (
            <div className="text-green-600">
              {JSON.stringify(data, null, 2)}
            </div>
          ) : null}
          {isDeleteSuccess ? (
            <div className="text-red-600">
              {JSON.stringify(deleteData, null, 2)}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
