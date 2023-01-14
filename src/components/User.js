import "./User.css";
const User = ({ submitUser }) => {
  return (
    <div id="user-name-form-wrapper">
      <form
        id="user-name-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitUser(document.getElementById("user-name-input").value);
        }}
      >
        <label htmlFor="user-name-input" id="user-name-input-label">
          UserName
        </label>
        <input id="user-name-input" />
        <button
          type="button"
          onClick={() => {
            submitUser(document.getElementById("user-name-input").value);
          }}
          id="user-submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default User;
