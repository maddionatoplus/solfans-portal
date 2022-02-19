import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useParams
} from "react-router-dom";
import CreatorHome from './CreatorHome/CreatorHome';
import EditPost from './EditPost/EditPost';
import MyAccount from './MyAccount/MyAccount';
import NewPost from './NewPost/NewPost';

export default function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creator" element={<CreatorHome />} />
          <Route path="/edit" element={<EditPost />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/new" element={<NewPost />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}