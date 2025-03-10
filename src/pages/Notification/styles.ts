import styled from 'styled-components';
export const NotWrapper = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 2rem;
  display: flex;
`;
export const SideTab = styled.section`
  display: flex;
  flex-direction: column;
  width: 20%;
  span {
    padding: 1.5rem;
    font-size: .9rem;
    cursor: pointer;
  }
  .selected {
    color: #0066ff;
  }
`;
export const MainComp = styled.section`
  border: 1px solid #dde9fc;
  width: 80%;
  padding:2rem;
  border-radius: 2rem;
  min-height: 30rem;

  .pagination{
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
`;
export const MainWrapper = styled.main`
  margin: 4rem;
  padding-bottom: 2rem;
  h1 {
    color: white;
    font-size: 1.9rem;
  }`;

export const NotificationWarper = styled.main`
  width: 100%;
  height: 7.0625rem; 
  display: flex;
  align-items: center; 
  padding: .8rem;
  border-radius: 1.25rem; 
  border: 1px solid #bbd6ff; 
  background: #f6faff;
  position: relative;
  margin-top: 1rem;
  transition: all 0.2s ease;
  &:hover {
   transform: scale(1.01);
  }

  .btn{
  background-color: #A1C3FF;
  border-radius: 44px;
  height: 2rem;
  width: content;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 1rem;
  top: 1rem;
  transition: all 0.2s ease;
  &:hover{
    background-color: #85B3FF;
  }

  .btn-icon{
  background: transparent;
  color: #002E72;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .6rem;
  img{
  width: .9rem;
  margin-left:0.4rem;
  }
  }
  .btn-status{
  font-size: .6rem;
  border-radius: 44px;
  position: absolute;
  top: 3.9rem;
  right: 0rem;}
  }

  .model {
    background: #F0F6FF;
    box-shadow: 0px 4px 4px rgba(205, 225, 255, 1);
    height: 95%; 
    width: 6rem;
    border-radius: 0.5rem; 
  }
  .modelView{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      }
`;

export const Data = styled.main`
    color: #002E72;
    margin-top: 1rem;
    margin-left: 3rem;
    font-family: Montserrat;


    .title{
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: 500;
    }
    .description{
    font-size: .6rem;
    font-weight: 400;

    span{
    font-size: .6rem;
    font-weight: 500;
    color: #002E72;
    margin-left: 0.5rem;
}
    }

    `;


export const ViewDetailsWrapper = styled.main`
margin-top: 1rem;
width: 100%;
padding: .5rem;
background: #F6FAFF;
border: 1px solid #BBD6FF;
border-radius: 1.25rem;
position: relative;



.createDispute-btn{
  background: #DDE9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0066FF;
  border-radius: 44px;
  height: 2.3rem;
  width: content;
  padding: 1rem;
  border: 1px solid #0066FF;
  transition: all 0.2s ease;
  position: absolute;
  bottom: .5rem;
  right: .5rem;
  &:hover{
    background-color: #85B3FF;
  }
}
`;

export const CreateDisputeWrapper = styled.div`
  padding: 2rem;
  background: #FFFFFF;
  max-width: 800px;
  margin: 1rem auto;
  border-radius: 1.3rem;
  border: 1px solid #336DFF;

  .header {
    margin-bottom: 2rem;
    
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #666;
    }
  }

  .dispute-form {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
        input[type="text"]{
          background: #E6F0FF;
          width: 100%;
          color: #2359B0;
          }

      textarea {
        width: 100%;
        padding: 0.75rem;
        background: #E6F0FF;
        width: 100%;
        color: #2359B0;
        border: 1px solid #ddd;
        border-radius: 4px;
        resize: vertical;
        font-family: inherit;

        &.error {
          border-color: #dc3545;
        }

        &:focus {
          outline: none;
          border-color: #0066cc;
        }
      }

      .btn-dispute{
        background: #0066FF;
        }
      

      .error-message {
        color: #dc3545;
        font-size: 0.875rem;
      }
    }
  }
`;

export const OngoingOrderWrapper = styled.div`

.header{
display: flex;
align-items: center;
justify-content: space-between;
margin:0  .5rem;

 .dropdown {
      background: #dde9fc;
      border-radius: 2rem;
      button {
        border-radius: 2rem;
        width: -webkit-fill-available;
        padding: 0.5rem 1rem;
      }
      .dropdown-header {
        background: #dde9fc;
      }
        .dropdown-list {
          max-height: unset;
          min-width: 9rem;
          border-radius: 1rem;
        }
        .dropdown-item {
          display: flex;
          justify-content: center;
        }
        .dropdown-item:hover {
          border-radius: 0rem;
        }
          .dropdown-item.selected {
            border-radius: 0rem;
          }
    }

}`;