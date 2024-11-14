import Button from '../../stories/button/Button';
import { MainWrap, ProfileWrapper } from './styles';

const Settings = () => {
  return (
    <ProfileWrapper>
      <h1 className="prof">SETTINGS</h1>
      <MainWrap>
        <span>
          <p>Language</p>
          <span className="btn">
            <input type="text" placeholder="Enter Language"></input>
            <Button label="Change Language" onClick={Function} />
          </span>
        </span>
        <span>
          <p>Measurement Preference</p>
          <span className="btn">
            <input type="text" placeholder="Enter Measurement"></input>
            <Button label="Change Measurement Preference" onClick={Function} />
          </span>
        </span>
        <span>
          <p>TimeZone</p>
          <span className="btn">
            <input type="email" placeholder="Enter timeZone"></input>
            <Button label="Change TimeZone" onClick={Function} />
          </span>
        </span>
      </MainWrap>
    </ProfileWrapper>
  );
};

export default Settings;
