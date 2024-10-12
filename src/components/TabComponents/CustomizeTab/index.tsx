import { customize } from '../../../constants';
import {
  Customize,
  Files,
  Filescomponent,
  UploadedFile,
  Wrapper,
} from './styles';
import React from 'react';
import Accordion from '../../Accordion';

const customizeTab: React.FC = () => {
  const elementsArray = Array(5).fill(null);
  return (
    <Wrapper>
      <h3>Customize your Files</h3>
      <Filescomponent>
        <Files>
          <span className="header">
            <span className="file">Files</span>
            <span className="count">5</span>
          </span>
          <UploadedFile>
            {elementsArray.map((_, index) => (
              <span key={index}>Name of file</span>
            ))}
          </UploadedFile>
        </Files>
        <Customize>
          {customize.map((item, index) => (
            <Accordion
              key={index}
              id={item.id}
              icon={item.icon}
              title={item.name}
              content={'hi'}
            />
          ))}
        </Customize>
      </Filescomponent>
    </Wrapper>
  );
};

export default customizeTab;
