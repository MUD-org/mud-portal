import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './AppDrawer.css'; // Import your CSS file

const AppDrawer: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleNavBar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`nav-bar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        </div>
    );
};

export default AppDrawer;
