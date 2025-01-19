import axios from 'axios';

const userapi=axios.create({
    baseURL:process.env.REACT_APP_BACKENDURL
});

export const registeruserApi=async(newUser)=>{
    try {
        const response = await userapi.post("/register", newUser);
       // console.log(response.status); // Log success status
       // console.log(response.data.message); // Log success message
        return { type: "success", text: response.data.message }; // Return success message
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Handle 400 error
        // console.log('error',error.response.data.message); // Log the error message
          return { type: "error", text: error.response.data.message }; // Return error message
        }
    
        // Handle other errors (network issues, server errors, etc.)
       // console.error("An unexpected error occurred:", error.message);
        return { type: "error", text: "An unexpected error occurred!" }; // Rethrow unexpected errors
      }
   
}
export const loginuserApi=async(user)=>{
    try {
        const response = await userapi.post("/login", user,{ withCredentials: true });
       // console.log(response.status); // Log success status
       // console.log(response.data.message); // Log success message
        return  response.data ; // Return data
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Handle 400 error
        //  console.log(error.response.data.message); // Log the error message
          return { type: "error", text: error.response.data.message }; // Return error message
        }
    
        // Handle other errors (network issues, server errors, etc.)
       // console.error("An unexpected error occurred:", error.message);
        return { type: "error", text: "An unexpected error occurred!" }; // Rethrow unexpected errors
      }

    }

export const IslogedIn   = async()=>{
  try {
    const response = await userapi.get("/me",{ withCredentials: true });
    return  response.data
    
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Handle 400 error
    //  console.log(error.response.data.message); // Log the error message
      return {loginStatus:false, type: "error", text: error.response.data.message }; // Return error message
    }
    
  }
}
export const Logout =async()=>{
  try {
    const response = await userapi.post('/logout',{}, {withCredentials: true  });
      console.log(response.data)
    return response.data;
    
    
  } catch (error) {
      console.log('error',error.response.data.message); // Log the error message
     return { type: "error", text: error.response.data.message }; // Return error message
    
  }
}