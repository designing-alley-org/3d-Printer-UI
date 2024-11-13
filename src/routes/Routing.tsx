// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/loginPage/login';
import OrderSuccessful from '../components/Order/OrderSuccessful';
import Layout from '../components/Layout';
import CardLayout from '../components/CardLayout/index';
import UploadStlCard from '../components/TabComponents/UploadStlTab/UploadStlTab';
import QuoteCard from '../components/TabComponents/QuoteTab/QuoteTab';
import Customize from '../components/TabComponents/CustomizeTab/index.tsx';
import ShippingDetails from '../components/TabComponents/CheckOut/Shipping';
import DeliveryPlan from '../components/TabComponents/CheckOut/DeliveryPlan/index.tsx';
import CheckOut from '../components/TabComponents/CheckOut/index.tsx';
import { ROUTES } from './routes-constants.ts';
import Quote from '../components/Quote/Card/index.tsx';
import PaymentDetails from '../components/TabComponents/CheckOut/PaymentDetails/index.tsx';
import RegisterForm from '../pages/loginPage/signup.tsx';
import DashboardLayout from '../components/DashboardLayout/index.tsx';
import Account from '../components/accountComponent/index.tsx';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<RegisterForm />} />
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<Navigate to={ROUTES.DASHBOARD} />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
          {/* <Route index element={<QuoteCard />} />
          <Route path={ROUTES.UPLOAD_STL} element={<UploadStlCard />} />
          <Route path={ROUTES.CUSTOMIZE} element={<Customize />} />
          <Route path={ROUTES.QUOTE} element={<Quote />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckOut />}>
            <Route index element={<ShippingDetails />} />
            <Route path={ROUTES.DELIVERY_PLAN} element={<DeliveryPlan />} />
            <Route path={ROUTES.PAYMENT} element={<PaymentDetails />} />
          </Route> */}
        </Route>
        <Route path={ROUTES.GET_QUOTES} element={<CardLayout />}>
          <Route index element={<QuoteCard />} />
          <Route path={ROUTES.UPLOAD_STL} element={<UploadStlCard />} />
          <Route path={ROUTES.CUSTOMIZE} element={<Customize />} />
          <Route path={ROUTES.QUOTE} element={<Quote />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckOut />}>
            <Route index element={<ShippingDetails />} />
            <Route path={ROUTES.DELIVERY_PLAN} element={<DeliveryPlan />} />
            <Route path={ROUTES.PAYMENT} element={<PaymentDetails />} />
          </Route>
        </Route>
        <Route path={ROUTES.SERVICES} element={<h1>Services</h1>} />
        <Route path={ROUTES.ACCOUNT} element={<Account />} />
        <Route path={ROUTES.ORDER_SUCCESSFUL} element={<OrderSuccessful />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
    </Routes>
  );
};

export default Routing;
