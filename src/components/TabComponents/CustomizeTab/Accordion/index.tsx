/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './styles.css';
import Dropdown from '../../../../stories/Dropdown/Dropdown';
import { sizeOption, info, group } from '../../../../constants';
import { Button, TextField } from '@mui/material';
import PrinterCard from '../../../PrinterCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateColor,
  updateMaterial,
  updatePrinter,
  updateTechnology,
} from '../../../../store/customizeFilesDetails/reducer';
import api from '../../../../axiosConfig';
import { useParams } from 'react-router-dom';

interface AccordionProps {
  icon: string;
  id: string;
  title: string;
  selectedId: string | null;
  setUpdateHeight: (height: number) => void;
  setUpdateLength: (length: number) => void;
  setUpdateWidth: (width: number) => void;
  selectedMat: string;
  selectedColor: string;
  selectedPrinter: string;
  setSelectedMat: (selectedMat: string) => void;
  setSelectedColor: (selectedColor: string) => void;
  setSelectedPrinter: (selectedPrinter: string) => void;
  setSelectUnit: (unit: string) => void;
  setSelectInfill: (infill: number) => void;
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

const MM_TO_INCH = 1 / 25.4;
const INCH_TO_MM = 25.4;

const Accordion: React.FC<AccordionProps> = ({
  icon,
  id,
  title,
  selectedId,
  setUpdateHeight,
  setUpdateLength,
  setUpdateWidth,
  selectedMat,
  selectedColor,
  selectedPrinter,
  setSelectedMat,
  setSelectedColor,
  setSelectedPrinter,
  setSelectUnit,
  setSelectInfill,
}) => {
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [printerData, setPrinterData] = useState([]);
  const [colorBtnData, setColorBtnData] = useState<string[]>([]);
  const [technologyData, setTechnologyData] = useState<string[]>([]);
  const [materialData, setMaterialData] = useState<MaterialWithMass[]>([]);
  const [selectSize, setSelectSize] = useState<string>('');
  const [unit, setUnit] = useState<'mm' | 'inch'>('mm');
  const { orderId } = useParams();
  const handleColorClick = (color: string) => setSelectedColor(color);
  const handleTechClick = (technology: string) => setSelectedTech(technology);
  const handleMatClick = (material: string) => setSelectedMat(material);
  const fileDetails = useSelector((state: any) => state.fileDetails.files);
  const selectedFile = fileDetails.find((file: any) => file._id === selectedId);
  const dataspec = useSelector((state: any) => state.specification);
  const dimansions = selectedFile?.dimensions;

  const [dimensions, setDimensions] = useState({
    height: dimansions?.height || 0,
    width: dimansions?.width || 0,
    length: dimansions?.length || 0,
  });
  const [originalDimensions, setOriginalDimensions] = useState({
    height: 0,
    width: 0,
    length: 0,
  });

  useEffect(() => {
    setDimensions({
      height: dimansions?.height || 0,
      width: dimansions?.width || 0,
      length: dimansions?.length || 0,
    });
  }, [dimansions]);

  useEffect(() => {
    if (dataspec) {
      setColorBtnData(dataspec.color || []);
      setTechnologyData(dataspec.technologyType || []);
      setMaterialData(dataspec.material_with_mass || []);
    }
  }, [dataspec]);

  const convertDimensions = (
    value: number,
    fromUnit: 'mm' | 'inch',
    toUnit: 'mm' | 'inch'
  ) => {
    if (fromUnit === toUnit) return value;
    return fromUnit === 'mm'
      ? Math.abs(value * MM_TO_INCH)
      : Math.abs(value * INCH_TO_MM);
  };

  // Update useEffect to set dimensions from selectedFile
  useEffect(() => {
    if (selectedFile?.dimensions) {
      setSelectSize(selectedFile.unit);
      const initialDimensions = {
        height: selectedFile.dimensions.height || 0,
        width: selectedFile.dimensions.width || 0,
        length: selectedFile.dimensions.length || 0,
      };
      setDimensions(initialDimensions);
      setOriginalDimensions(initialDimensions);
    }
  }, [selectedFile?.dimensions]);

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
      setSelectUnit(selectedFile.unit);
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

  useEffect(() => {
    setUpdateHeight(dimensions.height);
    setUpdateWidth(dimensions.width);
    setUpdateLength(dimensions.length);
  }, [dimensions, setUpdateHeight, setUpdateWidth, setUpdateLength]);

  const handleUnitChange = (option: Option) => {
    const newUnit = option.value as 'mm' | 'inch';

    // Ensure conversion happens only when units actually change
    if (newUnit !== unit) {
      // Convert current dimensions when unit changes
      const convertedDimensions = {
        height: convertDimensions(dimensions.height.toFixed(3), unit, newUnit),
        width: convertDimensions(dimensions.width.toFixed(3), unit, newUnit),
        length: convertDimensions(dimensions.length.toFixed(3), unit, newUnit),
      };
      setDimensions(convertedDimensions);
      setUnit(newUnit);
      setSelectUnit(newUnit);
    }
  };

  // Handle input changes
  const handleChange =
    (field: 'height' | 'width' | 'length') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setDimensions((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  // Revert to original dimensions
  const handleRevert = () => {
    setDimensions(originalDimensions);
  };
  const handlePrinterSelect = (title: string) =>
    setSelectedPrinter(selectedPrinter === title ? '' : title);

  const options = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    value: `${(i + 1) * 5}`,
    label: `${(i + 1) * 5}`,
  }));
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
            <div className="scaling">
              <p>Scale In</p>
              <p>Height</p>
              <p>Width</p>
              <p>Length</p>
            </div>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}
            >
              <Dropdown
                options={sizeOption}
                onSelect={handleUnitChange}
                defaultValue={selectedFile ? selectedFile.unit : 'mm'}
              />
              <TextField
                type="number"
                // label="Height"
                variant="outlined"
                className="fields"
                value={dimensions.height.toFixed(2)}
                onChange={handleChange('height')}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  style: {
                    // Optional: add any additional input styles here
                    textAlign: 'left',
                    paddingRight: '8px',
                  },
                }}
              />
              <TextField
                type="number"
                // label="Width"
                variant="outlined"
                className="fields"
                value={dimensions.width.toFixed(2)}
                onChange={handleChange('width')}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  style: {
                    // Optional: add any additional input styles here
                    textAlign: 'left',
                    paddingRight: '8px',
                  },
                }}
              />
              <TextField
                type="number"
                // label="Length"
                variant="outlined"
                className="fields"
                value={dimensions.length.toFixed(2)}
                onChange={handleChange('length')}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  style: {
                    // Optional: add any additional input styles here
                    textAlign: 'left',
                    paddingRight: '8px',
                  },
                }}
              />
            </div>
            <div className="revert">
              <Button className="btn" onClick={handleRevert}>
                Revert to original
              </Button>
              {dimansions && (
                <p>
                  {originalDimensions.height} mm x {originalDimensions.width} mm
                  x {originalDimensions.length} mm
                </p>
              )}
            </div>
          </div>
        )}
        {id === '2' && (
          <>
            {technologyData &&
              technologyData.map((item) => (
                <Button
                  key={item}
                  className={selectedTech === item ? 'active' : 'btn'}
                  onClick={() => handleTechClick(item)}
                >
                  {item}
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
            {materialData &&
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
          <div className="infill">
            <Dropdown
              options={options}
              onSelect={(option: Option) =>
                setSelectInfill(
                  typeof option.value === 'string'
                    ? Number(option.value)
                    : (option.value as number)
                )
              }
              defaultValue={selectedFile ? selectedFile.infill : ''}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
