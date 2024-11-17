import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import {
  Customize,
  Files,
  Filescomponent,
  UploadedFile,
  Wrapper,
  Model,
  ModelName,
  CustomizeBox,
  Heading,
} from './styles';
import { customize, vector_black } from '../../../constants';
import Accordion from '../../Accordion';
import ViewModelStl from '../../ViewStlFile';
import { addFileDetails } from '../../../store/FilesDetails/reducer';
import api from '../../../axiosConfig';
import { saveFile } from '../../../utils/indexedDB';
// Define FileData type
interface FileData {
  _id: string;
  fileName: string;
  fileUrl: string;
  quantity: number;
  color: string;
  material: string;
  technology: string;
  printer: string;
  dimensions: {
    height: number;
    length: number;
    width: number;
  };
}

const CustomizeTab: React.FC = () => {
  const [fetchfiles, setFetchFiles] = useState<FileData[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [color, setColor] = useState<string>('');
 
  const dispatch = useDispatch();
  const { orderId } = useParams();

  // Fetch files from the server
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/order-show/${orderId}`);
        const fetchedFiles = response.data.message.files.map((file: any) => ({
          _id: file._id,
          fileName: file.fileName.slice(0, 6),
          fileUrl: file.fileUrl,
          quantity: file.quantity,
          color: file.color,
          material: file.material,
          technology: file.technology,
          printer: file.printer,
          dimensions: file.dimensions,
        }));
        setFetchFiles(fetchedFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);
  useEffect(() => {
    const storeFileInIndexedDB = async (fileUrl: string) => {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        await saveFile(fileUrl, blob);
        console.log('File saved to IndexedDB');
      } catch (error) {
        console.error('Error saving file to IndexedDB:', error);
      }
    };

    fetchfiles.forEach(file => {
      if (file.fileUrl) {
        storeFileInIndexedDB(file.fileUrl);
      }
    });
  }, [fetchfiles]);
  // Store fetched files in Redux
  useEffect(() => {
    dispatch(addFileDetails(fetchfiles));
  }, [dispatch, fetchfiles]);

  // Save the rendering in store
  useEffect(() => {
    dispatch({ type: 'SAVE_RENDERING', payload: fetchfiles });
  }, [dispatch, fetchfiles]);

  // extract file from store
  const fileDetails = useSelector((state: any) => state.fileDetails.files);
  console.log('fileDetails:', fileDetails);

  // Extract color of the active file
  useEffect(() => {
    const activeFile = fetchfiles.find((file) => file._id === activeFileId);
    if (activeFile) setColor(activeFile.color);
  }, [activeFileId, fetchfiles]);

  const handleOpenViewer = useCallback((fileId: string) => {
    setActiveFileId(fileId);
  }, []);

  const handleSetActiveFile = useCallback((fileId: string) => {
    setActiveFileId(fileId);
  }, []);

  return (
    <Wrapper>
      <Heading>
        <h3>Customize your Files</h3>
        <h4>Edit your files as much as you want</h4>
      </Heading>

      <Filescomponent>
        <Files>
          <span className="header">
            <span className="file">Files</span>
            <span className="count">{fetchfiles.length}</span>
          </span>
          <UploadedFile>
            {fetchfiles.map((file) => (
              <span
                key={file._id}
                className="upload-file"
                onClick={() => handleSetActiveFile(file._id)}
                style={{
                  boxShadow:
                    activeFileId === file._id
                      ? '0px 0px 4.8px 0px #66A3FF'
                      : 'none',
                }}
              >
                <Model>
                  <span className="model-preview">
                    <ViewModelStl
                      fileUrl={file.fileUrl}
                      modelColor={activeFileId === file._id ? color : ''}
                    />
                  </span>
                  <span
                    className="view-model"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenViewer(file._id);
                    }}
                  >
                    <img src={vector_black} alt="View model" />
                  </span>
                </Model>
                <ModelName>{file.fileName}</ModelName>
                {activeFileId === file._id && (
                  <CustomizeBox>
                    {customize.slice(2, 5).map((item, idx) => (
                      <img key={idx} src={item.icon} alt={item.name} />
                    ))}
                  </CustomizeBox>
                )}
              </span>
            ))}
          </UploadedFile>
        </Files>

        <Customize>
          <div className="customize-container">
            {customize.map((item) => (
              <Accordion
                selectedId={activeFileId as string | null}
                key={item.id}
                icon={item.icon}
                id={item.id}
                title={item.name}
              />
            ))}
          </div>
          <div className="weight-section">
            <p>Current Weight & Volume:</p>
            <p>100gm</p>
          </div>
          <Button className="apply-button">Apply Selection</Button>
        </Customize>
      </Filescomponent>
    </Wrapper>
  );
};

export default CustomizeTab;
