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
import { updateColor, updateMaterial, updatePrinter, updateTechnology, updateWeight } from '../../store/FilesDetails/reducer';
import api from '../../axiosConfig';
import { useParams } from 'react-router-dom';

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
  const [printerData, setPrinterData] = useState<PrinterData[]>([]);
  const [spec, setSpec] = useState<Specification | null>(null);
  const [colorBtnData, setColorBtnData] = useState<string[]>([]);
  const [technologyData, setTechnologyData] = useState<string[]>([]);
  const [materialData, setMaterialData] = useState<MaterialWithMass[]>([]);
  const { orderId } = useParams();

  const handleColorClick = (color: string) => setSelectedColor(color);
  const handleTechClick = (technology: string) => setSelectedTech(technology);
  const handleMatClick = (material: string) => setSelectedMat(material);
    const fileDetails = useSelector((state: any) => state.fileDetails.files);
    const selectedFile = fileDetails.find((file: any) => file._id === selectedId);
    const dimansions = selectedFile?.dimensions;
  const dispatch = useDispatch();


   // Fetch printer data based on selected material and technology
   useEffect(() => {
    const fetchPrinterData = async () => {
      try {
        const response = await api.get(
          `/filter?technology=${selectedTech}&materials=${selectedMat}`
        );
        setPrinterData(
          response.data.data.map((printer: any) => ({
            title: printer.name,
            subTitle: printer.model,
            desc: printer.technologyType,
            data: [
              { name: 'Build Volume', val: printer.buildVolume },
              { name: 'Layer Resolution', val: printer.layerResolution },
              { name: 'Material Compatibility', val: printer.materialCompatibility },
              { name: 'Technology Type', val: printer.technologyType },
              { name: 'Nozzle Size', val: printer.nozzleSize },
              { name: 'Print Speed', val: printer.printSpeed },
              { name: 'Extruders', val: printer.extruders },
              { name: 'color', val: printer.color },
            ],
          }))
        );
      } catch (error) {
        console.error('Error fetching printer data:', error);
      }
    };

    if (selectedMat && selectedTech) fetchPrinterData();
  }, [selectedMat, selectedTech]);


  // Get specifications
  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const response = await api.get(`/get-specification`);
        const data = response.data?.data?.[0]; // Access the first object in the array

        if (data) {
          setSpec(data);
          setColorBtnData(data.color || []);
          setTechnologyData(data.technologyType || []);
          setMaterialData(data.material_with_mass || []);
        }
      } catch (error) {
        console.error('Error fetching specification:', error);
      }
    };

    fetchSpec();
  }, []);
  

// Get weight for stl file 
useEffect(() => {
  const fetchWeight = async () => {
    try {
      const payload = {
        material_name: selectedMat,
        material_mass: materialData.find((mat) => mat.material_name === selectedMat)?.material_mass,
      };
      const response = await api.put(`/process-order/${orderId}/file/${selectedId}`, payload);
      console.log('weight:', response);
    } catch (error) {
      console.error('Error fetching weight:', error);
    }};
    if(selectedMat && selectedId) fetchWeight();
  },[selectedMat, selectedId, materialData]);

  // Take selected technology and material from selected file
  useEffect(() => {
    if (selectedFile) {
      setSelectedTech(selectedFile.technology);
      setSelectedMat(selectedFile.material);
      setSelectedColor(selectedFile.color);
      setSelectedPrinter(selectedFile.printer);

    }
  },[selectedFile]);


 
  // Send color corresponding to selectedId to store
  useEffect(() => {
    if (selectedColor && selectedId) {
      dispatch(updateColor({ id: selectedId, color: selectedColor }));
    }
  }, [selectedColor]);

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
              <Dropdown options={sizeOption} onSelect={() => {}} />
              {scaleFields.map((field) => (
                <TextField
                  key={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  className="fields"
                />
              ))}
            </div>
            <div className="revert">
              <Button className="btn">Revert to original</Button>
              {dimansions &&<p>{dimansions.height} mm x {dimansions.width} mm x {dimansions.length} mm</p>}
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
        {id === '3' &&(
        <>
          {materialData ? (
            materialData.map((item) => (
              <Button
                key={item.material_name}
                className={selectedMat === item.material_name ? 'active' : 'btn'}
                onClick={() => handleMatClick(item.material_name)}
              >
                {item.material_name}
              </Button>
            ))
          ) : (
            <p className="no-material">Loading...</p>
          
          )}</>
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
            {printerData.length <= 0 && selectedTech !== '' && selectedMat !== '' && (
              <p className="no-data">No Printer Data Found Please select Other Material and Technology</p>
            )}
            {printerData.length > 0 && (
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
            )}
          </>
        )}
        {id === '6' && <Dropdown options={dimensionsOption} onSelect={() => {}} />}
      </div>
    </div>
  );
};

export default Accordion;
