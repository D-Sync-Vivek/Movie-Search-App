"use client";
import React, { useEffect, useState } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    loading && (
      <div className="min-h-screen flex flex-col justify-center items-center gap-3">
        <div className="h-12 w-12 rounded-full border-3 border-gray-200 border-t-blue-500 animate-spin text-white"></div>
        <span className="ml-4 text-lg text-white">loading...</span>
      </div>
    )
  );
};

export default Loading;
