import { MobiltabData, navtabSmallScreen } from '../../constants'
import { useEffect, useRef, useState } from 'react'
import './MobileNav.css'
import { useNavigate } from 'react-router-dom';
import NotificationBox from './NotificationBox';
import { Box, Typography } from '@mui/material';

interface ITab {
    activeTabs?: number;
    setShowTab?: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavTabMenu = ({ setShowTab, activeTabs }: ITab) => {
    const navigate = useNavigate();
    const tabOnClick = (path: string) => {
        navigate(path);
        setShowTab((prev) => !prev);
    }
    const tabRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                tabRef.current &&
                !tabRef.current.contains(event.target as Node)
            ) {
                setShowTab((prev) => !prev);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [tabRef]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '5.5rem',
            right: '1rem',
            padding: '0.5rem',
            borderRadius: '0.8rem',
            backgroundColor: '#fff',
            zIndex: 100,
            boxShadow: '0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1)',
        }} ref={tabRef}>
            {
                MobiltabData.map((item) => {
                    return (
                        <Typography key={item.id}  onClick={() => {tabOnClick(item.path) }}
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'start',
                                padding: '0.4rem 0.5rem',
                                fontSize: '0.6rem',
                                cursor: 'pointer',
                                borderRadius: '0.5rem',
                                color: activeTabs === item.id ? '#000' : '#000',
                                backgroundColor: activeTabs === item.id ? 'whitesmoke' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'whitesmoke'
                                }
                            }}>
                            {item.label}
                        </Typography>
                    )
                })
            }
        </Box>
    );
}


const MobileHeader = ({activeTabs}: ITab) => {
    const [showTab, setShowTab] = useState<boolean>(false);
    const tabOnClick = () => {
        setShowTab(!showTab);
    }

    return (
        <>
            <nav className='mobile-navBar'>
                <div className='mob-notification'>
                    <NotificationBox />
                </div>
                <span className='nav-tav'>
                    <img src={navtabSmallScreen} alt="tab" className='tab-img' onClick={tabOnClick} />
                </span>
            </nav>
            {showTab &&
                <div >
                    <NavTabMenu setShowTab={setShowTab} activeTabs={activeTabs}  />
                </div>
            }
        </>

    )
}

export default MobileHeader;