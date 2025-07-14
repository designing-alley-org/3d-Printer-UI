import './styles.css';
import { Tab } from '../../types/home.types';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { isOrderQuoteClosedService } from '../../services/order';
import { useSelector } from 'react-redux';

interface ITabContainerProps {
  tabs: Tab[];
  numberId: boolean;
  activeTabs?: number;
  insideTab?: boolean;
}

const TabComponent = (props: ITabContainerProps) => {
  const { tabs, activeTabs = 0 } = props;
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 1]);
  const [isQuoteClosed, setIsQuoteClosed] = useState<boolean>(false);
  const activeTabsRef = useRef(activeTabs);
 const quoteDataClosed = useSelector((state: any) => state.quoteData.quoteClosed);

 useEffect(() => {
   quoteDataClosed && setIsQuoteClosed(quoteDataClosed);
 }, [quoteDataClosed]);

  useEffect(() => {
    activeTabsRef.current = activeTabs;
  }, [activeTabs]);

  // Check if quote is closed when route includes 'quote' or 'checkout'
  useEffect(() => {
    const checkQuoteStatus = async () => {
      if (orderId && (location.pathname.includes('quote') || location.pathname.includes('checkout'))) {
        try {
          const isClosed = await isOrderQuoteClosedService(orderId);
          setIsQuoteClosed(isClosed);
        } catch (error) {
          console.error('Error checking quote status:', error);
          setIsQuoteClosed(false);
        }
      }
    };

    checkQuoteStatus();
  }, [orderId, location.pathname]);

  const getTabRange = (activeTab: number): [number, number] => {
    if (activeTab <= 1) {
      return [0, 1];
    } else if (activeTab >= tabs.length - 1) {
      return [tabs.length - 2, tabs.length - 1];
    } else {
      return [activeTab - 1, activeTab];
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 590) {
        const [start, end] = getTabRange(activeTabsRef.current);
        setVisibleRange([start, end]);
      } else {
        setVisibleRange([0, tabs.length - 1]);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [tabs.length]);

  useEffect(() => {
    if (window.innerWidth <= 590) {
      const [start, end] = getTabRange(activeTabs);
      setVisibleRange([start, end]);
    }
  }, [activeTabs, tabs.length]);

  const handleTabClick = (index: number, tab: any) => {
    // Check if quote is closed and prevent navigation to UPLOAD STL or CUSTOMIZE tabs
    if (isQuoteClosed && (tab.label.includes('UPLOAD STL') || tab.label.includes('CUSTOMIZE'))) {
      return; // Do nothing if quote is closed and user tries to click these tabs
    }
    
    if (index < activeTabs) {
      navigate(`${orderId}/${tab.path}`);
    }
  };

  return (
    <ul className={props.insideTab ? 'insideTab' : 'tabrow'}>
      {tabs.slice(visibleRange[0], visibleRange[1] + 1).map((tab, index) => {
        const tabIndex = visibleRange[0] + index;
        const isActive = tabIndex === activeTabs;
        const isDisabled = isQuoteClosed && (tab.label.includes('UPLOAD STL') || tab.label.includes('CUSTOMIZE'));
        
        return (
          <li
            key={tab.id}
            className={`${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
            onClick={() => handleTabClick(tabIndex, tab)}
            style={{ 
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            <span className="tabContent">
              <p className="label">{tab.label}</p>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default TabComponent;
