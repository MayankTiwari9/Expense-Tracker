import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../firebase";

const UserProfile = () => {
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

  const token = localStorage.getItem("token");
  const storage = getStorage(firebaseApp);

  function handleChange(e) {
    if (e.target.files[0]) setFile(e.target.files[0]);
  }

  const updateUserHandler = async (e) => {
    e.preventDefault();

    try {
      // Upload the file to Firebase Storage
      if (file) {
        const storageRef = ref(storage, `user-profiles/${token}/profile-image`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        console.log("Image uploaded:", imageUrl);

        // Set the URL to be used when updating the user profile
        setURL(imageUrl);
      }

      // Update user information including the image URL
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCsdHmEyton0hpjeL78i6sCtLW-udHBNGk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: newName,
            photoUrl: url,
            returnSecureToken: true,
          }),
        }
      ).then((res) => {
        console.log(res);
      })

      if (!response.ok) {
        throw new Error("Update failed");
      }

      console.log("Update successful");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={updateUserHandler} className="d-flex m-5 flex-column w-75 mx-auto border-bottom">
      <div className="d-flex justify-content-between m-3">
        <h2>Contact Details</h2>
        <button className="h-25 border-2 border-danger text-danger bg-white" type="button">Cancel</button>
      </div>
      <div className="d-flex">
        <div className="d-flex m-3">
          <label className="mr-2">Full Name:</label>
          <input className="h-75" type="text" onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div className="d-flex m-3">
          <label className="mr-2">Profile Photo:</label>
          <input className="h-75" type="file" onChange={handleChange} />
        </div>
      </div>
      <div>
        <button className="bg-dark text-white rounded p-1 m-2" type="submit">Update</button>
      </div>
    </form>
  );
};

export default UserProfile;
