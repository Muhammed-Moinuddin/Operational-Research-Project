import * as React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../App.css'

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer-content' >
                <div className='footer-text'>
                <List>
                    <ListItem sx={{p: 0, m: 0}}>
                    <ListItemText
                        sx={{p: 0, m: 0}}
                        primary="Muhammad Moinuddin"
                    />
                    <ListItemText
                        sx={{pl: 1, pr: 1, m: 0}}
                        primary="  |  "
                    />
                     <ListItemText
                        sx={{p: 0, m: 0}}
                        primary="Ahsan Iqbal"
                    />
                    </ListItem>
                    <ListItem sx={{p: 0, m: 0}}>
                    <ListItemText
                        sx={{p: 0, m: 0}}
                        primary="Shahmeer Ameen"
                    />
                     <ListItemText
                        sx={{pl: 1, pr: 1, m: 0}}
                        primary="  |  "
                    />
                    <ListItemText
                        sx={{p: 0, m: 0}}
                        primary="Marij Ahmed"
                    />
                    </ListItem>
                    
                </List>
                </div>
                <div className='footer-text'>
                    <span>&copy; 2023 | All rights reserved.</span>
                </div>
                <div className='footer-icon'>
                    <IconContext.Provider value={{ size: '2em', gap: '2em' }}>
                        <a href="https://github.com/Muhammed-Moinuddin" target="_blank" rel="noopener noreferrer">
                            <FaGithub className='footer-icon' />
                        </a>
                        <a href="https://www.linkedin.com/in/muhammad-moinuddin-software-developer/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className='footer-icon' />
                        </a>
                    </IconContext.Provider>
                </div>

            </div>
        </footer>
    );
}

export default Footer;