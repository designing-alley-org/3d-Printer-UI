/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '../../stories/button/Button';
import { MainWrap, ProfileWrapper } from './styles';

interface IPRofile {
  profileData: any;
}
const MyProfile = (props: IPRofile) => {
  const { profileData } = props;
  return (
    <ProfileWrapper>
      <h1 className="prof">PROFILE INFORMATION</h1>
      <MainWrap>
        <span>
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Enter Name"
            value={profileData?.name}
          ></input>
        </span>
        <span>
          <p>User Name</p>
          <span className="btn">
            <input type="text" placeholder="Enter User Name"></input>
            <Button label="Change User Name" onClick={Function} />
          </span>
        </span>
        <span>
          <p>Email</p>
          <span className="btn">
            <input
              type="email"
              placeholder="Enter Email"
              value={profileData?.email}
            ></input>
            <Button label="Change Email" onClick={Function} />
          </span>
        </span>
        <span>
          <p>Phone Number</p>
          <span className="btn">
            <input type="text" placeholder="Enter Phone Number"></input>
            <Button label="Change Number" onClick={Function} />
          </span>
        </span>
      </MainWrap>
    </ProfileWrapper>
  );
};

export default MyProfile;
