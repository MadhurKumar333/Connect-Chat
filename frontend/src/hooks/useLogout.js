import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);//loading state
  const { setAuthUser } = useAuthContext();

    //a function called logout
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {//fetching to our logout endpoint
        method: "POST",//it will be  a post method as we need to send the details
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");//removing item from the local storage
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
