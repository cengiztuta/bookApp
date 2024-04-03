import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [bookData, setBookData] = useState([]);
  const [moreBook, setMoreBook] = useState(16);
  const [filteredData, setFilteredData] = useState(bookData);
  const [searchBook, setSearchBook] = useState("");
  const [format, setFormat] = useState("All");
  const [filterMenu, setFilterMenu] = useState(false);
  const [filterGenre, setFilterGenre] = useState("");
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  const logout = () => {
    setUserInfo(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };
  const handleSearchBook = () => {
    if (searchBook.length === 0) {
      return alert("Geçerli bir değer gir");
    }
    const filteredBooks = bookData.filter((b) => {
      const { title, genres, format, authors } = b;
      const lowercaseBook = searchBook.toLowerCase();
      return (
        title.toLowerCase().includes(lowercaseBook) ||
        genres.toLowerCase().includes(lowercaseBook) ||
        authors.toLowerCase().includes(lowercaseBook) ||
        format.toLowerCase().includes(lowercaseBook)
      );
    });
    setFormat("All");
    setSearchBook("");
    setFilteredData(filteredBooks);
  };
  const getBookData = () => {
    axios
      .get("https://example-data.draftbit.com/books?_limit=50")
      .then((response) => {
        const data = response.data;
        setBookData(data);
        setFilteredData(data);
      });
  };
  const getUserData = async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("sikimi ye");
    }
    const users = await response.json();
    setUserData(users);
  };
  const addUser = async (newName, newLastName, newEmail, newPassword) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          lastname: newLastName,
          email: newEmail,
          password: newPassword,
        }),
      });
      if (!response.ok) {
        alert("Something Wrong");
      }
      if (response.ok) {
        alert("Sign up is succesfully. You are going to login page");
        console.log("user added");
        navigate("/Login");
      }
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        bookData,
        logout,
        setBookData,
        filteredData,
        setFilteredData,
        searchBook,
        setSearchBook,
        format,
        setFormat,
        filterMenu,
        setFilterMenu,
        getBookData,
        filterGenre,
        setFilterGenre,
        moreBook,
        setMoreBook,
        handleSearchBook,
        getUserData,
        setCurrentUser,
        currentUser,
        userData,
        addUser,
        setUserInfo,
        userInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => {
  return useContext(DataContext);
};
