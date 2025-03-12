import { MobiltabData, navtabSmallScreen, notificationIcon } from '../../constants'
import { useEffect, useRef, useState } from 'react'
import './MobileNav.css'
import { useNavigate } from 'react-router-dom';
import NotificationBox from './NotificationBox';

const NavTabMenu = ({ setShowTab }: { setShowTab: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const navigate = useNavigate();
    const tabOnClick = (path: string) => {
        navigate(path);
        setShowTab(() => false);
    }
    const tabRef = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    tabRef.current &&
                    !tabRef.current.contains(event.target as Node)
                ) {
                    setShowTab(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [tabRef]);
    
    return (
        <div className='tab-container' ref={tabRef}>
            {
                MobiltabData.map((item) => {
                    return (
                        <div key={item.id} className="tab-item" onClick={() => { tabOnClick(item.path) }}>
                            {item.label}
                        </div>
                    )
                })
            }
        </div>
    );
}


const MobileHeader = () => {
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
            <NavTabMenu setShowTab={setShowTab} />
            </div>
            }
        </>

    )
}

export default MobileHeader;