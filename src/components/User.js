import { useState } from "react";
import "./User.css";
const User = ({ submitUser }) => {
  const [userName, setUserName] = useState("");
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  return (
    <div>
      <form
        id="user-name-form"
        className="flex flex-col bg-[#1713ff] p-[30px] gap-[5vh] rounded-[60px] bg-opacity-70 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          submitUser(document.getElementById("user-name-input").value);
        }}
      >
        <label
          htmlFor="user-name-input"
          className="text-[1.4rem] lg:text-[2rem] text-white"
        >
          Enter your PokeName
        </label>
        <input
          className="text-[1rem] lg:text-[2rem] p-[10px] rounded-[30px] w-[70%]"
          value={userName}
          onChange={handleChangeUserName}
        />
        <button
          type="button"
          onClick={() => {
            submitUser(userName);
          }}
          className="w-[40%] text-[#1713ff] bg-[#e5e908] no-underline border-none text-[1rem] font-bold rounded-[10px]"
        >
          Play!
        </button>
      </form>
    </div>
  );
};

export default User;
