  import styled, { css } from 'styled-components';

  export const Wrapper = styled.section`
    height: 55rem;
    header {
      position: absolute;
      top: 34rem;
      left: 76px;
      font-size: 64px;
      color: white;
    }
    @media (max-width: 971px) and (min-width: 400px) {
      header {
        position: absolute;
        left: 3rem;
        bottom: 35rem;
        font-size: 38px;
        color: white;
      }
    }
      @media (max-width: 399px)  {
      header {
        font-size: 38px;
        left: 2rem;
        padding: 0rem;
        color: white;
      }
    }
  `;

  export const Bottom = styled.section`
    display: flex;
    height: 59rem;
    align-items: end;
    justify-content: space-between;
    .btn {
      padding: 40px;
      button {
        background-color: #1e6fff;
        border-radius: 40px;
        width: 268px;
        font-size: 24px;
      }
    }
    .curve {
      font-size: 32px;
      padding: 2rem 12rem 0px 45px;
      border-top-right-radius: 4rem;
      background: white;
      &::after {
        content: '';
        position: absolute;
        margin-left: 11.6rem;
        margin-top: -0.1rem;
        background-color: transparent;
        width: 3.25rem;
        height: 2.1rem;
        border-bottom-left-radius: 8.25rem;
        box-shadow: -1rem 1rem 0 0 rgb(255, 255, 255);
      }
      &::before {
        content: '';
        position: absolute;
        margin-left: -3.1rem;
        margin-top: -4.3rem;
        background-color: transparent;
        width: 4.25rem;
        height: 2.3rem;
        border-bottom-left-radius: 8.25rem;
        box-shadow: -2rem 1rem 0 0rgb (255, 255, 255);
        transform: skew(155deg);
      }
    }

    .btnMobile{
        button{
        background-color: #1e6fff;
        border-radius: 40px;
        }
      }
       @media (max-width:600px) and (min-width: 400px) {
        .btnMobile{
         position: absolute;
         bottom:2.7rem;
         right:1.3rem;
      }
    }
    @media (max-width: 399px)  {
    .textMobile{
      font-size: 20px;
      }
      .btnMobile{
        position: absolute;
        bottom:-3rem;
        right:1.3rem;
      }
    }
  `;
