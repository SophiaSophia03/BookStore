import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

function ProfileSettings() {
  const [Value, setValue] = useState({ address: "" });
  const [profileData, setprofileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://bookstore-backend-u2h5.onrender.com/api/get-user-Info",
        { headers }
      );
      setprofileData(response.data);
      setValue({ address: response.data.address });
    };
    fetchData();
  }, []);

  const changeTextarea = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value,[ name ]: value });
  };

  const submitAddress = async () => {
    const response = await axios.put(
      "https://bookstore-backend-u2h5.onrender.com/api/updateAddress",
      Value,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {!profileData && (
        <div className="flex justify-center items-center  h-screen bg-[#82A3A1]">
          <Loader />{" "}
        </div>
      )}
      {profileData && (
        <div>
          <h1 className="font-semibold text-3xl">Profile Settings</h1>
          <div>
            <div className="w-full flex md:justify-start md:items-start justify-center items-center gap-8 mt-8 mb-8">
              <div>
                <label className=" font-medium text-xl">Username</label>
                <p className="rounded-md bg-[#7a9594] px-4 py-2 font-medium text-xl mt-2 ">
                  {profileData.username}
                </p>
              </div>
              <div>
                <label className=" font-medium text-xl">Email</label>
                <p className="rounded-md bg-[#7a9594] px-4 py-2 font-medium text-xl mt-2">
                  {profileData.email}
                </p>
              </div>
            </div>
            <div className="flex justify-start items-start flex-col">
              <label className=" font-medium text-xl">Address</label>
              <textarea
                onChange={changeTextarea}
                className="rounded-md bg-[#7a9594] px-4 py-2 w-full font-medium text-xl mt-2"
                rows="5"
                placeholder="Address"
                name="address"
                value={Value.address}
              ></textarea>
            </div>
            <div className="flex justify-end w-full items-end">
              <button
                onClick={submitAddress}
                className="px-12 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl "
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileSettings;
