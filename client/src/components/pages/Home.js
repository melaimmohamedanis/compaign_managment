import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IslogedIn } from "../Api/UserApi";
const backgroundImage = '/assets/invoice.jpg';
const Home = () => {
  const { data, isLoading,  error } = useQuery({ queryKey: ["user"],
    queryFn:IslogedIn});
 // console.log('query_data',data)
//console.log(data)
  return (
    <div
      className="bg-home-bg bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-sky-950 bg-opacity-50 h-screen w-full bg-cover ">
      {/* Hero Section */}
      <section className="text-center  ">
      <div className="bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 text-transparent  bg-clip-text  py-20 px-6 text-center">
      <h1 className="text-4xl font-extrabold mb-4">
        Welcome to <span className="text-blue-900">Invoicely</span>
      </h1>
      <p className="text-2xl mb-6 font-medium">
        Simplifying  Campaign Management and Invoice Generation
      </p>
      <p className="text-lg max-w-2xl mx-auto">
        Our platform streamlines the entire process of managing  campaigns, and invoices—all in one place. Whether you're , <span className="font-semibold">Invoicely</span> ensures seamless interaction, strict data managing and absolute integrity.
      </p>
    </div>
    {data && data.loginStatus===true ? (
     
      <div className="bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 text-transparent  bg-clip-text  py-20 px-6 text-center">
      <h1 className="text-4xl font-extrabold mb-4">
      <span className="text-blue-900">{data.user.lastname }</span>    {data.user.firstname } 
      </h1>
    </div>
    ):(  <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-600">
          Get started
        </button>)}
      
      </section>
      </div>
    </div>
  );
};

export default Home;
