import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './styles.css';
import Dropdown, { Option } from '../../../stories/Dropdown/Dropdown';
import { sizeOption, info, group } from '../../../constants';
import { Button, TextField, useMediaQuery } from '@mui/material';
import PrinterCard from '../../../components/PrinterCard';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, FileDetail, UpdateValueById } from '../../../store/customizeFilesDetails/reducer';

interface AccordionProps {
  icon: string;
  id: string;
  title: string;
  printerData: PrinterData[];
  printerMessage: string;
  fileData: FileDetail;
  oldDimensions: { unit: string | null; dimensions: Dimensions; } | null
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
  printerData,
  printerMessage,
  fileData,
  oldDimensions,
}) => {

  const dispatch = useDispatch();

  const [selectedTech, setSelectedTech] = useState<string>('');
  const [formData, setFormData] = useState<FileDetail>();

  const dataspec = useSelector((state: any) => state.specification);

  const isSmallScreen = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    setFormData(fileData);
  }, [fileData]);
  

  const convertDimensions = (
    value: number,
    fromUnit: string,
    toUnit: string
  ) => {
    if (fromUnit === toUnit) return value;
    return fromUnit === 'mm'
      ? Math.abs(value * MM_TO_INCH)
      : Math.abs(value * INCH_TO_MM);
  };

  const handelChangeValue = (filed:string, value:string) => {
    setFormData(prev => ({ ...prev, [filed]: value }));
  }

  const handleUnitChange = (option: Option) => {
    const newUnit = option.value as 'mm' | 'inch';
    if( newUnit === formData?.unit) return

    const unit = formData?.unit || 'mm';

      // Convert current dimensions when unit changes
      const convertedHeight = convertDimensions(formData?.dimensions?.height, unit, newUnit);
      const convertedWidth = convertDimensions(formData?.dimensions?.width, unit, newUnit);
      const convertedLength = convertDimensions(formData?.dimensions?.length, unit, newUnit);


      handelChangeValue('unit', newUnit);
      handelChangeValue('dimensions', {
        height: convertedHeight,
        width: convertedWidth,
        length: convertedLength,
      });

  };

  // Handle input changes
  const handleChange =
    (field: 'height' | 'width' | 'length') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value.replace(/[^\d.]/g, ''));

      if (value) {
        setFormData({
          ...formData,
          dimensions: {
            ...formData?.dimensions,
            [field]: value,
          },
        });
      }
    };

  useEffect(() => {
    if (formData) {
      dispatch(UpdateValueById({ id: fileData._id, data: formData }));
    }
  }, [formData]);

  // Revert to original dimensions
  const handleRevert = () => {
    setFormData({
      ...formData,
      unit: oldDimensions?.unit || 'mm',
      dimensions: {
        ...formData?.dimensions,
        height: oldDimensions?.dimensions?.height || 0,
        width: oldDimensions?.dimensions?.width || 0,
        length: oldDimensions?.dimensions?.length || 0,
      },
    });
  };




  const options = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        value: `${(i + 1) * 5}`,
        label: `${(i + 1) * 5}`,
      })),
    []
  );

  if (!fileData) {
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
                defaultValue={formData?.unit ? formData?.unit : 'mm'}
                className="dropdown_unit"
              />
              
                    {['height', 'width', 'length'].map((field) => (
                      <TextField
                        key={field}
                        type="number"
                        variant="outlined"
                        className="fields"
                        value={formData?.dimensions[field as 'height' | 'width' | 'length']}
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
              {oldDimensions && (
                <p>
                  {oldDimensions?.dimensions?.height.toFixed(2)} {oldDimensions?.unit}  x{' '}
                  {oldDimensions?.dimensions?.width.toFixed(2)} {oldDimensions?.unit}x{' '}
                  {oldDimensions?.dimensions?.length.toFixed(2)} {oldDimensions?.unit}
                </p>
              )}
            </div>
          </div>
        )}
        {id === '2' && (
          <>
            {dataspec &&
              dataspec?.technologyType.map((item : string) => (
                <Button
                  key={item}
                  className={formData?.technology === item ? 'active' : 'btn'}
                  onClick={() => handelChangeValue('technology', item)}
                >
                  {item}
                </Button>
              ))}
            <div className="check-box">
              {formData?.technology ? (
                <img src={group} alt="group" />
              ) : (
                <img src={info} alt="info" />
              )}
            </div>
          </>
        )}
        {id === '3' && (
          <>
            {dataspec &&
              dataspec?.material_with_mass?.map((item:{material_name: string, material_mass: number},index: number) => (
                <Button
                  key={index}
                  className={
                    formData?.material === item?.material_name ? 'active' : 'btn'
                  }
                  onClick={() => handelChangeValue('material', item?.material_name)}
                >
                  {item.material_name}
                </Button>
              ))}
            <div className="check-box">
              {formData?.material ? (
                <img src={group} alt="group" />
              ) : (
                <img src={info} alt="info" />
              )}
            </div>
          </>
        )}
        {id === '4' && (
          <>
            {dataspec?.color.map((item:string) => (
              <Button
                key={item}
                className={ formData?.color === item ? 'active' : 'btn'}
                onClick={() => handelChangeValue('color', item)}
              >
                <span
                  className="btn-color"
                  style={{ backgroundColor: item }}
                ></span>
                {item}
              </Button>
            ))}
            <div className="check-box">
              {formData?.color ? (
                <img src={group} alt="group" />
              ) : (
                <img src={info} alt="info" />
              )}
            </div>
          </>
        )}
        {id === '5' && (
          <>
            {(formData?.technology === '' || formData?.material === '') && (
              <p className="no-data">Please select Material and Technology</p>
            )}
            {printerData.length <= 0 && formData?.material && formData?.technology && (
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
                  isSelected={formData?.printer === item._id}
                  onSelect={() => handelChangeValue('printer', item._id)}
                />
              ))}
          </>
        )}
        {id === '6' && (
          <div className="infill">
            <Dropdown
              options={options}
              onSelect={(option) => handelChangeValue('infill', option?.value as string)}
              defaultValue={
                formData?.infill == null
                  ? 5
                  : String(formData?.infill)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const AccordionMemo = React.memo(Accordion);
