import {
  Customize,
  Files,
  Filescomponent,
  UploadedFile,
  Wrapper,
} from './styles';

const customizeTab = () => {
  const elementsArray = Array(5).fill(null);
  return (
    <Wrapper>
      <h3>
        Set the required quantities for each file and if their sizes appear too
        small, change the unit of measurement to inches. Click on 3D Viewer for
        a 360° preview of your files.
      </h3>
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
        <Customize>scale</Customize>
      </Filescomponent>
    </Wrapper>
  );
};

export default customizeTab;
