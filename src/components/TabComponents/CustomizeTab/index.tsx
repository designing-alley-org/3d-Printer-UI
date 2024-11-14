import { useOutletContext } from 'react-router-dom';
import { customize, vector_black } from '../../../constants';
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
import React, { useState, useCallback } from 'react';
import Accordion from '../../Accordion';
import ViewerStlModel from '../UploadStlTab/ViewerStlModel';
import ViewModelStl from '../../ViewStlFile';

interface OutletContextType {
  files: FileData[];
  setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
}

interface FileData {
  id: string;
  name: string;
  file: File;
  quantity: number;
  dimensions: {
    height: number;
    width: number;
    length: number;
  };
}

const CustomizeTab: React.FC = () => {
  const { files, setFiles } = useOutletContext<OutletContextType>();
  const [activeFileIndex, setActiveFileIndex] = useState<number | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  function getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  const handleOpenViewer = useCallback((fileId: string) => {
    setActiveFileId(fileId);
    setIsViewerOpen(true);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setIsViewerOpen(false);
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
            <span className="count">{files.length}</span>
          </span>
          <UploadedFile>
            {files.map((file, index) => (
              <span
                key={file.id}
                className="upload-file"
                onClick={() => setActiveFileIndex(index)}
                style={{
                  boxShadow:
                    activeFileIndex === index
                      ? '0px 0px 4.8px 0px #66A3FF'
                      : 'none',
                }}
              >
                <Model>
                  <span className="model-preview">
                    <ViewModelStl fileUrl={getFileUrl(file.file)} modelColor=''/>
                  </span>
                  <span 
                    className="view-model"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenViewer(file.id);
                    }}
                  >
                    <img src={vector_black} alt="vector_black" />
                  </span>
                </Model>
                <ModelName>{file.name}</ModelName>
                {activeFileIndex === index && (
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
          <div className='customize-container'>
            {customize.map((item) => (
              <Accordion
                key={item.id}
                icon={item.icon}
                id={item.id}
                title={item.name}
                content={'hi'}
              />
            ))}
          </div>
          <div className="weight-section">
            <p>Current Weight & Volume:</p>
            <p>100gm</p>
          </div>
          <Button className='apply-button'>Apply Selection</Button>
        </Customize>
      </Filescomponent>

      <ViewerStlModel
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        files={files}
        activeFileId={activeFileId}
        onSetActiveFile={handleSetActiveFile}
      />
    </Wrapper>
  );
};

export default CustomizeTab;
