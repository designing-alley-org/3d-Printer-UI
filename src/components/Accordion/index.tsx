import React, { useState, useEffect } from 'react';
import './styles.css';
import Dropdown from '../../stories/Dropdown/Dropdown';
import {
  colorBtnData,
  dimensionsOption,
  materialBtnData,
  scaleFields,
  sizeOption,
  technologyBtnData,
  info,
  group,
} from '../../constants';
import { Button, TextField } from '@mui/material';
import PrinterCard from '../PrinterCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateColor,selectFileDetailsById } from '../../store/FilesDetails/reducer';
import api from '../../axiosConfig';

interface AccordionProps {
  icon: string;
  id: string;
  title: string;
  selectedId: string | null;
}

interface PrinterData {
  title: string;
  subTitle: string;
  desc: string;
  data: Array<{ name: string; val: string }>;
}


const Accordion: React.FC<AccordionProps> = ({
  icon,
  id,
  title,
  selectedId,
}) => {
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [selectedMat, setSelectedMat] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPrinter, setSelectedPrinter] = useState<string>('');
  const [printerData, setPrinterData] = useState<PrinterData[]>([]);
  const dispatch = useDispatch();
  console.log('selectedId:', selectedId);
  


  const handleColorClick = (color: string) => setSelectedColor(color);
  const handleTechClick = (technology: string) => setSelectedTech(technology);
  const handleMatClick = (material: string) => setSelectedMat(material);

  // Fetch printer data based on selected material and technology
  useEffect(() => {
    const fetchPrinterData = async () => {
      try {
        const response = await api.get(
          `/filter?technology=${selectedTech}&materials=${selectedMat}`
        );
        console.log('printer data' ,response);
        setPrinterData(response.data);
        console.log('Printer data:', response.data);
      } catch (error) {
        console.error('Error fetching printer data:', error);
      }
    };

    if (selectedMat && selectedTech) fetchPrinterData();
  }, [selectedMat, selectedTech]);

  // Send color corresponding to selectedId to store
  useEffect(() => {
    if (selectedColor && selectedId) {
      dispatch(updateColor({ id: selectedId, color: selectedColor }));
    }
  }, [selectedColor, selectedId, dispatch]);

  const handlePrinterSelect = (title: string) =>
    setSelectedPrinter(selectedPrinter === title ? '' : title);

  // Reusable Component for Buttons with Selection
  const renderSelectionButtons = (
    data: { name: string }[],
    selectedValue: string,
    handleClick: (name: string) => void
  ) => (
    <>
      {data.map((item) => (
        <Button
          key={item.name}
          className={selectedValue === item.name ? 'active' : 'btn'}
          onClick={() => handleClick(item.name)}
        >
          {item.name}
        </Button>
      ))}
    </>
  );

  return (
    <div className="accordion">
      <div className="accordion-header">
        <span className="title">
          <img src={icon} alt="icon" />
          <h2>{title}</h2>
        </span>
      </div>
      <div className="accordion-content">
        {id === '1' && (
          <div className="scale">
            <p>Scale In</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Dropdown options={sizeOption} onSelect={() => {}} />
              {scaleFields.map((field) => (
                <TextField
                  key={field.name}
                  id={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  className="fields"
                />
              ))}
            </div>
            <div className="revert">
              <Button className="btn">Revert to original</Button>
              <p>100mm x 120mm x 320mm</p>
            </div>
          </div>
        )}
        {id === '2' &&
          renderSelectionButtons(technologyBtnData, selectedTech, handleTechClick)}
        {id === '3' &&
          renderSelectionButtons(materialBtnData, selectedMat, handleMatClick)}
        {id === '4' && (
          <>
            {colorBtnData.map((item) => (
              <Button
                key={item.name}
                className={selectedColor === item.name ? 'active' : 'btn'}
                onClick={() => handleColorClick(item.name)}
              >
                <span
                  className="btn-color"
                  style={{ backgroundColor: item.id }}
                ></span>
                {item.name}
              </Button>
            ))}
            <div className="check-box">
              {selectedColor ? (
                <img src={group} alt="group" />
              ) : (
                <img src={info} alt="info" />
              )}
            </div>
          </>
        )}
        {id === '5' && (
          <>
            {printerData.length > 0 ? (
              printerData.map((printer) => (
                <PrinterCard
                  key={printer.title}
                  title={printer.title}
                  subTitle={printer.subTitle}
                  desc={printer.desc}
                  data={printer.data}
                  isSelected={selectedPrinter === printer.title}
                  onSelect={handlePrinterSelect}
                />
              ))
            ) : (
              <p className="no-printer">Please select Material and Technology</p>
            )}
          </>
        )}
        {id === '6' && <Dropdown options={dimensionsOption} onSelect={() => {}} />}
      </div>
    </div>
  );
};

export default Accordion;
