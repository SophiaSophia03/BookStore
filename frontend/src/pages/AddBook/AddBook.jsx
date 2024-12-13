import React, { useState } from "react";
import { BiSolidBookAdd } from "react-icons/bi";
import axios from "axios"

function AddBook() {
  const [Values, setValues] = useState({
    title: "",
    url: "",
    author: "",
    language: "",
    price: "",
    desc: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    role: localStorage.getItem("role")
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const addNewBook = async () => {
    try {
      if (
        Values.title === "" ||
        Values.url === "" ||
        Values.author === "" ||
        Values.language === "" ||
        Values.price === "" ||
        Values.desc === ""
      ){
        alert("All fields are required!");
      }else{
      const response = await axios.post(
        "http://localhost:3000/api/add-books",
        Values,{headers}
      );
      setValues({
        title: "",
        url: "",
        author: "",
        language: "",
        price: "",
        desc: "",
      });
      alert(response.data.message);
    }
    } catch (error) {
      alert(error.response.data.message || "Book not added");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:justify-start md:items-start justify-center items-center gap-4">
        <h1 className="font-semibold text-3xl">Add New Book</h1>
        <div className="bg-[#7a9594] px-8 py-4 rounded-md w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="title" className="font-semibold text-xl text-left">
              Title of Book
            </label>
            <input
              onChange={inputChange}
              id="title"
              name="title"
              value={Values.title}
              type="text"
              placeholder="Enter the book title"
              className="bg-[#5c7c7a] px-4 py-2 rounded-md font-medium text-lg"
              required
            ></input>
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="url" className="font-semibold text-xl text-left">
              Book Image
            </label>
            <input
              onChange={inputChange}
              type="url"
              id="url"
              name="url"
              value={Values.url}
              placeholder="Enter the URL of Image"
              className="bg-[#5c7c7a] px-4 py-2 rounded-md border-none font-medium text-lg"
              required
            ></input>
          </div>
          <div htmlFor="author" className="flex flex-col gap-2 ">
            <label className="font-semibold text-xl text-left">
              Author of Book
            </label>
            <input
              onChange={inputChange}
              type="text"
              id="author"
              name="author"
              value={Values.author}
              placeholder="Enter the author's name"
              className="bg-[#5c7c7a] px-4 py-2 rounded-md font-medium text-lg"
              required
            ></input>
          </div>
          <div
            htmlFor="language"
            className="flex md:flex-row flex-col w-full gap-4"
          >
            <div className="flex flex-col gap-2 md:w-3/6 ">
              <label className="font-semibold text-xl text-left">
                Language
              </label>
              <input
                onChange={inputChange}
                id="language"
                name="language"
                value={Values.language}
                type="text"
                placeholder="eg: English / French"
                className="bg-[#5c7c7a] px-4 py-2 rounded-md font-medium text-lg"
                required
              ></input>
            </div>
            <div htmlFor="price" className="flex flex-col gap-2 md:w-3/6">
              <label className="font-semibold text-xl text-left">Price</label>
              <input
                onChange={inputChange}
                id="price"
                name="price"
                value={Values.price}
                type="number"
                placeholder="Enter the book's price"
                className="bg-[#5c7c7a] px-4 py-2 rounded-md font-medium text-lg"
                required
              ></input>
            </div>
          </div>
          <div htmlFor="desc" className="flex flex-col gap-2 ">
            <label className="font-semibold text-xl text-left">
              Description
            </label>
            <textarea
              onChange={inputChange}
              id="desc"
              name="desc"
              value={Values.desc}
              type="text"
              rows="3"
              placeholder="Enter the description"
              className="bg-[#5c7c7a] px-4 py-2 rounded-md font-medium text-lg"
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end">
        <button
          type="submit"
          onClick={addNewBook}
          className="px-12 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl flex items-center justify-center gap-4"
        >
          <BiSolidBookAdd /> Add Book
        </button>
      </div>
    </div>
  );
}

export default AddBook;