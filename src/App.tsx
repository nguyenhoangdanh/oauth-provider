// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OAuthPage from './components/oauth/OAuthPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/sign-in" element={<OAuthPage />} />
                <Route path="/sign-up" element={<OAuthPage />} />
            </Routes>
        </Router>
    );
};

export default App;