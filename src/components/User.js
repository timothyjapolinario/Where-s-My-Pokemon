import "./User.css";
const User = ({ submitUser }) => {
  return (
    <div id="user-name-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitUser(document.getElementById("user-name-input").value);
        }}
      >
        <label htmlFor="user-name-input">UserName</label>
        <input id="user-name-input" />
        <button
          type="button"
          onClick={() => {
            submitUser(document.getElementById("user-name-input").value);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default User;
