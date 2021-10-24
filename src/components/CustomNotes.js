import { useState, useEffect } from "react";

const CustomNotes = (props) => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/routes/notes/" + props.customerEmail, {
      method: "GET",
      mode: "cors",
    })
      .then((result) => result.json())
      .then((res) => {
        if (res) {
          setNotes(res);
        } else {
          setNotes([]);
        }
      })
      .catch((err) => {
        throw err;
      });
  });

  const saveData = async () => {
    const data = input;
    await fetch("http://localhost:3000/routes/notes/" + props.customerEmail, {
      method: "POST",
      mode: "cors",
      headers: {
        "access-control-request-headers": "content-type",
        "Content-Type": "text/plain",
      },
      body: data,
    })
      .then((result) => result.json())
      .then((res) => {
        setNotes(res["notes"]);
      })
      .catch((err) => {
        throw err;
      })
      .catch((err) => {
        throw err;
      });
  };

  const saveNoteHandler = () => {
      saveData()
    // const data = input;
    // fetch("http://localhost:3000/routes/notes/" + props.customerEmail, {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "access-control-request-headers": "content-type",
    //     "Content-Type": "text/plain",
    //   },
    //   body: data,
    // })
    //   .then((result) => result.json())
    //   .then((res) => {
    //     setNotes(res["notes"]);
    //   })
    //   .catch((err) => {
    //     throw err;
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <ul>
        {notes.map((note) => {
          return <li className="notes-li">{note}</li>;
        })}
      </ul>
      <input
        onChange={inputChangeHandler}
        type="text"
        placeholder="New Customer Note"
      ></input>
      <button className="note-button" onClick={saveNoteHandler}>
        Save
      </button>
    </div>
  );
};

export default CustomNotes;
