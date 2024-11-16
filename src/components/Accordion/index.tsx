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

interface AccordionProps {
  icon: string;
  id: string;
  title: string;
}

interface PrinterData {
  title: string;
  subTitle: string;
  desc: string;
  data: Array<{ name: string; val: string }>;
}

const Accordion: React.FC<AccordionProps> = ({ icon, id, title }) => {
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [selectedMat, setSelectedMat] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPrinter, setSelectedPrinter] = useState<string>('');
  const [printerData, setPrinterData] = useState<PrinterData[]>([]);

  const handleUnitClick = (unit: string) => setSelectedTech(unit);
  const handleMatClick = (material: string) => setSelectedMat(material);
  const handleColorClick = (color: string) => setSelectedColor(color);

  const handlePrinterSelect = (title: string) =>
    setSelectedPrinter(selectedPrinter === title ? '' : title);

  const options = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    value: `${(i + 1) * 5}`,
    label: `${(i + 1) * 5}`,
  }));

  useEffect(() => {
    if (selectedTech && selectedMat) {
      const fetchPrinters = async () => {
        try {
          const response = await fetch(
            `/filter?technology=${selectedTech}&materials=${selectedMat}`
          );
          const data = await response.json();

          if (data.success) {
            const formattedData: PrinterData[] = data.data.map((printer: any) => ({
              title: printer.Name,
              subTitle: printer.Model,
              desc: 'Ultra High Resolution',
              data: [
                {
                  name: 'Build Volume',
                  val: `X: ${printer.buildVolume.x} mm, Y: ${printer.buildVolume.y} mm, Z: ${printer.buildVolume.z} mm`,
                },
                {
                  name: 'Layer Resolution',
                  val: `Min: ${printer.layerResolution.min} mm, Max: ${printer.layerResolution.max} mm`,
                },
                {
                  name: 'Material Compatibility',
                  val: printer.materialCompatibility.join(', '),
                },
                { name: 'Technology Type', val: printer.technologyType },
                { name: 'Nozzle Size', val: `${printer.nozzleSize} mm` },
                { name: 'Print Speed', val: `${printer.printSpeed} mm/s` },
                { name: 'Extruders', val: `${printer.extruders}` },
              ],
            }));
            setPrinterData(formattedData);
          }
        } catch (error) {
          console.error('Error fetching printers:', error);
        }
      };
      fetchPrinters();
    }
  }, [selectedTech, selectedMat]);

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
        {id === '2' && (
          <>
            {technologyBtnData.map((item) => (
              <Button
                key={item.name}
                className={selectedTech === item.name ? 'active' : 'btn'}
                onClick={() => handleUnitClick(item.name)}
              >
                {item.name}
              </Button>
            ))}
            <div className="check-box">
              {selectedTech ? (
                <img src={group} alt="group" />
              ) : (
                <img src={info} alt="info" />
              )}
            </div>
          </>
        )}
        {id === '3' && (
          <>
            {materialBtnData.map((item) => (
              <Button
                key={item.name}
                className={selectedMat === item.name ? 'active' : 'btn'}
                onClick={() => handleMatClick(item.name)}
              >
                {item.name}
              </Button>
            ))}
            <div className="check-box"> 
              {selectedMat ? (
                <img src={group} alt="group" />
              ) : (
                <img src={info} alt="info" />
              )}
            </div>
          </>
        )}
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
        {id === '6' && <Dropdown options={options} onSelect={() => {}} />}
      </div>
    </div>
  );
};

export default Accordion;
