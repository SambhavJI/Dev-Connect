import axios from "axios";
import {setFeed,removeFeed} from "./utils/feedSlice";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";


export default function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getFeed = async () => {
    if(feed) return;
    try{
    const response = await axios.get("http://localhost:3000/user/feed",{withCredentials:true});
    dispatch(setFeed(response.data));
    }catch(err){
      console.error("Error fetching feed:", err);
    }
  };
  useEffect(()=>{getFeed()}, []);
  return (
    feed &&
    <div className="flex justify-center items-center h-screen">
      <UserCard user={feed[1]} />
    </div>
  );
}