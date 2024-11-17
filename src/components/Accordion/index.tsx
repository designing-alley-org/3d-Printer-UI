/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import './styles.css';
import Dropdown from '../../stories/Dropdown/Dropdown';
import {
  dimensionsOption,
  scaleFields,
  sizeOption,
  info,
  group,
} from '../../constants';
import { Button, TextField } from '@mui/material';
import PrinterCard from '../PrinterCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateColor,
  updateMaterial,
  updatePrinter,
  updateTechnology,
  updateWeight,
} from '../../store/customizeFilesDetails/reducer';
import api from '../../axiosConfig';
import { useParams } from 'react-router-dom';
import { set } from 'react-hook-form';

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

interface MaterialWithMass {
  material_name: string;
  material_mass: number;
}

interface Specification {
  color: string[];
  technologyType: string[];
  material_with_mass: MaterialWithMass[];
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
  const [printerData, setPrinterData] = useState([]);
  const [colorBtnData, setColorBtnData] = useState<string[]>([]);
  const [technologyData, setTechnologyData] = useState<string[]>([]);
  const [materialData, setMaterialData] = useState<MaterialWithMass[]>([]);
  const  [selectSize, setSelectSize] = useState<string>('');
  const [selectSize, setSelectSize] = useState<string>('');
  console.log('selectSize', selectSize);
  const [weight, setWeight] = useState<number>(0);
  const { orderId } = useParams();
  const handleColorClick = (color: string) => setSelectedColor(color);
  const handleTechClick = (technology: string) => setSelectedTech(technology);
  const handleMatClick = (material: string) => setSelectedMat(material);
  const fileDetails = useSelector((state: any) => state.fileDetails.files);
  const selectedFile = fileDetails.find((file: any) => file._id === selectedId);
  const dataspec = useSelector((state: any) => state.specification);
  useEffect(() => {
    if (dataspec) {
      setColorBtnData(dataspec.color || []);
      setTechnologyData(dataspec.technologyType || []);
      setMaterialData(dataspec.material_with_mass || []);
    }
  }, [dataspec]);
  const dimansions = selectedFile?.dimensions;
  const dispatch = useDispatch();

  // Fetch printer data based on selected material and technology
  useEffect(() => {
    const fetchPrinterData = async () => {
      try {
        const response = await api.get(
          `/filter?technology=${selectedTech}&materials=${selectedMat}`
        );
        setPrinterData(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching printer data:', error);
      }
    };

    if (selectedMat && selectedTech) fetchPrinterData();
  }, [selectedMat, selectedTech]);

  // Take selected technology and material from selected file
  useEffect(() => {
    if (selectedFile) {
      setSelectedTech(selectedFile.technology);
      setSelectedMat(selectedFile.material);
      setSelectedColor(selectedFile.color);
      setSelectedPrinter(selectedFile.printer);
    }
  }, [selectedFile]);

  // Send color corresponding to selectedId to store
  useEffect(() => {
    if (selectedColor && selectedId) {
      dispatch(updateColor({ id: selectedId, color: selectedColor }));
    }
  }, [selectedColor]);

  // send printer corresponding to selectedId to store
  useEffect(() => {
    if (selectedPrinter && selectedId) {
      dispatch(updatePrinter({ id: selectedId, printer: selectedPrinter }));
    }
  }, [selectedPrinter]);

  // Send technology corresponding to selectedId to store
  useEffect(() => {
    if (selectedTech && selectedId) {
      dispatch(updateTechnology({ id: selectedId, technology: selectedTech }));
    }
  }, [selectedTech]);

  // Send material corresponding to selectedId to store
  useEffect(() => {
    if (selectedMat && selectedId) {
      dispatch(updateMaterial({ id: selectedId, material: selectedMat }));
    }
  }, [selectedMat]);

  // Send printer corresponding to selectedId to store
  useEffect(() => {
    if (selectedPrinter && selectedId) {
      dispatch(updatePrinter({ id: selectedId, printer: selectedPrinter }));
    }
  }, [selectedPrinter]);

  const handlePrinterSelect = (title: string) =>
    setSelectedPrinter(selectedPrinter === title ? '' : title);

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
              <Dropdown
                options={sizeOption}
                onSelect={(option: Option) => setSelectSize(option.value)}
                defaultValue="mm"
              />
              {scaleFields.map((field) => (
                <TextField
                  key={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  className="fields"
                  value={dimansions ? dimansions[field.name] : ''}
                  onChange={(e) => setDimansions((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }))}
                />
              ))}
            </div>
            <div className="revert">
              <Button className="btn">Revert to original</Button>
              {dimansions && (
                <p>
                  {dimansions.height} mm x {dimansions.width} mm x{' '}
                  {dimansions.length} mm
                </p>
              )}
            </div>
          </div>
        )}
        {id === '2' && (
          <>
            {technologyData ? (
              technologyData.map((item) => (
                <Button
                  key={item}
                  className={selectedTech === item ? 'active' : 'btn'}
                  onClick={() => handleTechClick(item)}
                >
                  {item}
                </Button>
              ))
            ) : (
              <p className="no-printer">Loading...</p>
            )}
          </>
        )}
        {id === '3' && (
          <>
            {materialData ? (
              materialData.map((item) => (
                <Button
                  key={item.material_name}
                  className={
                    selectedMat === item.material_name ? 'active' : 'btn'
                  }
                  onClick={() => handleMatClick(item.material_name)}
                >
                  {item.material_name}
                </Button>
              ))
            ) : (
              <p className="no-material">Loading...</p>
            )}
          </>
        )}
        {id === '4' && (
          <>
            {colorBtnData.map((item) => (
              <Button
                key={item}
                className={selectedColor === item ? 'active' : 'btn'}
                onClick={() => handleColorClick(item)}
              >
                <span
                  className="btn-color"
                  style={{ backgroundColor: item }}
                ></span>
                {item}
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
            {(selectedTech === '' || selectedMat === '') && (
              <p className="no-data">Please select Material and Technology</p>
            )}
            {printerData.length <= 0 &&
              selectedTech !== '' &&
              selectedMat !== '' && (
                <p className="no-data">
                  No Printer Data Found Please select Other Material and
                  Technology
                </p>
              )}
            {printerData.length > 0 &&
              printerData?.map((item: any, idx: number) => (
                <PrinterCard
                  key={idx}
                  title={item.name}
                  subTitle={item.model}
                  desc={item.printerName}
                  data={item}
                  isSelected={selectedPrinter === item._id}
                  onSelect={handlePrinterSelect}
                />
              ))}
          </>
        )}
        {id === '6' && (
          <Dropdown options={dimensionsOption} onSelect={() => {}} />
        )}
      </div>
    </div>
  );
};

export default Accordion;
