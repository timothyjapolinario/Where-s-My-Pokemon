import "./User.css";
const User = ({ submitUser }) => {
  return (
    <div>
      <form
        id="user-name-form"
        className="flex flex-col bg-[#1713ff] p-[5vw] gap-[5vh] rounded-[30px] bg-opacity-70"
        onSubmit={(e) => {
          e.preventDefault();
          submitUser(document.getElementById("user-name-input").value);
        }}
      >
        <label
          htmlFor="user-name-input"
          className="text-[2rem] lg:text-[8rem] text-white"
        >
          UserName
        </label>
        <input className="text-[1rem] lg:text-[4rem]" />
        <button
          type="button"
          onClick={() => {
            submitUser(document.getElementById("user-name-input").value);
          }}
          id="user-submit-button"
        >
          Play!
        </button>
      </form>
    </div>
  );
};

export default User;
