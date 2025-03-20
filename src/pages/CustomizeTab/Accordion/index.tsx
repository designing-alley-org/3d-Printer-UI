import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import Dropdown from '../../../stories/Dropdown/Dropdown';
import { sizeOption, info, group } from '../../../constants';
import { Button, TextField, useMediaQuery } from '@mui/material';
import PrinterCard from '../../../components/PrinterCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateColor,
  updateInfill,
  updateMaterial,
  updatePrinter,
  updateTechnology,
} from '../../../store/customizeFilesDetails/reducer';
import { getPrintersByTechnologyAndMaterial } from '../../../store/actions/getPrintersByTechnologyAndMaterial';

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
  selectedInfill: number;
  setSelectInfill: (infill: number) => void;
  actualUnit: string;
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
  selectedInfill,
  setSelectedMat,
  setSelectedColor,
  setSelectedPrinter,
  setSelectUnit,
  setSelectInfill,
  actualUnit,
}) => {
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [printerData, setPrinterData] = useState([]);
  const [printerMessage, setPrinterMessage] = useState('');
  const [colorBtnData, setColorBtnData] = useState<string[]>([]);
  const [technologyData, setTechnologyData] = useState<string[]>([]);
  const [materialData, setMaterialData] = useState<MaterialWithMass[]>([]);
  const [selectSize, setSelectSize] = useState<string>('');
  const [unit, setUnit] = useState<'mm' | 'inch'>('mm');
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const handleColorClick = (color: string) => setSelectedColor(color);
  const handleTechClick = (technology: string) => setSelectedTech(technology);
  const handleMatClick = (material: string) => setSelectedMat(material);
  const handleInfill = (infill: number) => setSelectInfill(infill);
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

  // Update useEffect to set dimensions from selectedFile
  useEffect(() => {
    if (selectedFile?.dimensions) {
      setSelectSize(selectedFile.unit || 'mm');
      const initialDimensions = {
        height: Number(selectedFile.dimensions.height.toFixed(2)) || 0,
        width: Number(selectedFile.dimensions.width.toFixed(2)) || 0,
        length: Number(selectedFile.dimensions.length.toFixed(2)) || 0,
      };
      setDimensions(initialDimensions);
      setOriginalDimensions(initialDimensions);
    }
  }, [selectedFile?.dimensions]);

  const dispatch = useDispatch();

  // Fetch printer data based on selected material and technology
  const fetchPrinterData = useCallback(async () => {
    if (selectedMat && selectedTech) {
      await getPrintersByTechnologyAndMaterial({
        selectedMat,
        selectedTech,
        setPrinterData,
        setPrinterMessage,
      });
    }
  }, [selectedMat, selectedTech]);

  useEffect(() => {
    fetchPrinterData();
  }, [fetchPrinterData]);

  // Take selected technology and material from selected file
  useEffect(() => {
    if (selectedFile) {
      setSelectedTech(selectedFile.technology);
      setSelectedMat(selectedFile.material);
      setSelectedColor(selectedFile.color);
      setSelectedPrinter(selectedFile.printer);
      setSelectUnit(selectedFile?.unit);
      setSelectInfill(selectedFile?.infill);
    }
  }, [selectedFile]);

  // Clear printer data when selectedId changes
  useEffect(() => {
    if (selectedId) {
      setPrinterData([]);
    }
  }, [selectedId]);

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
    if (selectedInfill && selectedId) {
      dispatch(updateInfill({ id: selectedId, infill: selectedInfill }));
    }
  }, [selectedInfill]);

  useEffect(() => {
    setUpdateHeight(dimensions.height);
    setUpdateWidth(dimensions.width);
    setUpdateLength(dimensions.length);
  }, [dimensions, setUpdateHeight, setUpdateWidth, setUpdateLength]);

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

  const handleUnitChange = (option: Option) => {
    const newUnit = option.value as 'mm' | 'inch';

    // Ensure conversion happens only when units actually change
    if (newUnit !== unit) {
      // Convert current dimensions when unit changes
      const convertedDimensions = {
        height: convertDimensions(dimensions.height.toFixed(3), unit, newUnit),
        width: convertDimensions(dimensions.width.toFixed(2), unit, newUnit),
        length: convertDimensions(dimensions.length.toFixed(2), unit, newUnit),
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
      const value = event.target.value;
      setDimensions((prev) => ({
        ...prev,
        [field]: value === '' ? null : parseFloat(value),
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
  console.log(selectedInfill);

  if (!selectedFile) {
    return (
      <div className="accordion">
        <div className="accordion-header">
          <span className="title">
            <h2>Please select a file then proceed</h2>
          </span>
        </div>
      </div>
    );
  }

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
            <div className="scale-input">
              <Dropdown
                options={sizeOption}
                onSelect={handleUnitChange}
                defaultValue={selectedFile ? selectedFile.unit : 'mm'}
                className="dropdown_unit"
              />
              
                    {['height', 'width', 'length'].map((field) => (
                      <TextField
                        key={field}
                        type="number"
                        variant="outlined"
                        className="fields"
                        value={dimensions[field]}
                  onChange={handleChange(
                    field as 'height' | 'width' | 'length'
                  )}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          style: {
                            textAlign: 'left',
                            width: '100%',
                            paddingRight: '8px',
                            height: isSmallScreen ? '.5rem' : '.7rem',
                            fontSize: isSmallScreen ? '.5rem' : '.8rem',
                          },
                  }}
                />
              ))}
            </div>
            <div className="revert">
              <Button className="btn" onClick={handleRevert}>
                Revert to original
              </Button>
              {dimansions && (
                <p>
                  {originalDimensions.height} {actualUnit} x{' '}
                  {originalDimensions.width} {actualUnit}x{' '}
                  {originalDimensions.length} {actualUnit}
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
            {printerData.length <= 0 && selectedMat && selectedTech && (
              <p className="no-data">
                {printerMessage ? printerMessage : 'Loading...'}
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
                handleInfill(
                  typeof option.value === 'string'
                    ? Number(option.value)
                    : (option.value as number)
                )
              }
              defaultValue={
                selectedFile?.infill !== undefined
                  ? String(selectedFile?.infill)
                  : undefined
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
