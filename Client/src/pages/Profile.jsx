import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.user);
    const profile = user?.user?.data;
    const { avatar, username, email, wins, losses, draws, ranking } = profile;
  
    const getTitle = (ranking) => {
      if (ranking > 1000) return "Grandmaster";
      if (ranking > 500) return "Master";
      if (ranking > 100) return "Expert";
      return "Novice";
    };
  
    return (
      <div className="profile-container bg-gray-900 text-white grid grid-cols-1 md:flex items-center justify-evenly p-8 md:p-12 mx-auto rounded-lg  border border-gray-700 max-w-4xl my-12 shadow-2xl">
        {/* User Information */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-400">{username}</h1>
          <p className="text-gray-400 text-lg mt-2">Email: {email}</p>
          <div className="stats mt-6">
            <p className="text-green-400 text-xl">Wins: {wins}</p>
            <p className="text-red-400 text-xl">Losses: {losses}</p>
            <p className="text-yellow-400 text-xl">Draws: {draws}</p>
          </div>
          <h2 className="text-2xl font-semibold mt-4 text-indigo-400">Title: {getTitle(ranking)}</h2>
        </div>
  
        {/* User Avatar */}
        <div className="avatar-container flex justify-center items-center mt-8 md:mt-0">
          <img
            src={avatar}
            alt="avatar"
            className="avatar h-48 w-48 md:h-64 md:w-64 rounded-full border-4 border-blue-500 shadow-md hover:scale-105 transform transition duration-300"
          />
        </div>
      </div>
    );
  };
  
  export default Profile;
  