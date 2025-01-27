import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import SignUp from './pages/SignUp';
import SuccessPage from './components/SuccessPage';
import Login from './pages/Login';
import VideoUploader from './pages/VideoUploader';
import DownloadFile from './pages/DownloadFile';
import About from "./pages/About"
import Error from "./components/Error"
import Profile from "./pages/Profile"

import GoogleRedirectHandler from './components/GoogleRedirectHandler';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/account-created" element={<SuccessPage />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/video-compress" element={<VideoUploader />} />
                <Route path='/download' element={<DownloadFile />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth/google/callback" element={<GoogleRedirectHandler />} />

                <Route path="/*" element={< Error />} />
            </Routes>
        </Router>
    );
};

export default App;
