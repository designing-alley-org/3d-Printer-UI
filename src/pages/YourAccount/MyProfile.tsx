/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '../../stories/button/Button';
import { MainWrap, ProfileWrapper } from './styles';
import { useState } from 'react';
interface IPRofile {
  profileData: any;
}
const MyProfile = (props: IPRofile) => {
  const { profileData } = props;
  const [inputDisabled, setInputDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>({
    name: profileData?.name,
    email: profileData?.email,
  });

  const handleEdit = () => {
    setInputDisabled(prev => !prev);
  };
  return (
    <ProfileWrapper>
      <h1 className="prof">PROFILE INFORMATION</h1>
      <MainWrap>
        <span>
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            disabled={inputDisabled}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className={inputDisabled ? 'input-disabled' : ''}
          ></input>
        </span>
        <span>
          <p>User Name</p>
          <span className="btn">
            <input type="text" placeholder="Enter User Name" disabled={inputDisabled} className={inputDisabled ? 'input-disabled' : ''}></input>
          </span>
        </span>
        <span>
          <p>Email</p>
          <span className="btn">
            <input
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              disabled={inputDisabled}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={inputDisabled ? 'input-disabled' : ''}
            ></input>
          </span>
        </span>
        <span>
          <p>Phone Number</p>
          <span className="btn">
            <input type="text" placeholder="Enter Phone Number" disabled={inputDisabled} className={inputDisabled ? 'input-disabled' : ''}></input>
            <Button label={inputDisabled ? 'Edit Details' : 'Save Details'} onClick={handleEdit} />
          </span>
        </span>
      </MainWrap>
    </ProfileWrapper>
  );
};

export default MyProfile;
