// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/loginPage/login';
import OrderSuccessful from '../pages/Order/OrderSuccessful.tsx';
import Layout from '../components/Layout';
import CardLayout from '../components/CardLayout/index';
import UploadStlCard from '../pages/UploadStlTab/UploadStlTab.tsx';
import QuoteCard from '../pages/GetQuote/GetQuote.tsx';
import Customize from '../pages/CustomizeTab/index.tsx';
import ShippingDetails from '../pages/CheckOut/Shipping/index.tsx';
import DeliveryPlan from '../pages/CheckOut/DeliveryPlan/index.tsx';
import CheckOut from '../pages/CheckOut/index.tsx';
import { ROUTES } from './routes-constants.ts';
import Quote from '../pages/Quote/Card/index.tsx';
import PaymentDetails from '../pages/CheckOut/PaymentDetails/index.tsx';
import RegisterForm from '../pages/loginPage/signup.tsx';
import DashboardLayout from '../components/DashboardLayout/index.tsx';
import Account from '../pages/YourAccount/index.tsx';
import Services from '../pages/Services/index.tsx';
import GoogleAuthHandler from '../store/auth/GoogleAuthHandler.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Notifications from '../pages/Notification/index.tsx';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<RegisterForm />} />
      <Route path={ROUTES.GOOGLE_AUTH} element={<GoogleAuthHandler />} />
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
        <Route
          path={ROUTES.GET_QUOTES}
          element={<ProtectedRoute component={<CardLayout />} />}
        >
          <Route index element={<ProtectedRoute component={<QuoteCard />} />} />
          <Route path=":orderId/">
            <Route
              path={ROUTES.UPLOAD_STL}
              element={
                <ProtectedRoute
                  component={<UploadStlCard files={[]} setFiles={() => {}} />}
                />
              }
            />
            <Route
              path={ROUTES.CUSTOMIZE}
              element={<ProtectedRoute component={<Customize />} />}
            />
            <Route
              path={ROUTES.QUOTE}
              element={<ProtectedRoute component={<Quote />} />}
            />
            <Route
              path={ROUTES.CHECKOUT}
              element={<ProtectedRoute component={<CheckOut />} />}
            >
              <Route
                index
                element={<ProtectedRoute component={<ShippingDetails />} />}
              />
              <Route
                path={ROUTES.DELIVERY_PLAN}
                element={<ProtectedRoute component={<DeliveryPlan />} />}
              />
              <Route
                path={ROUTES.PAYMENT}
                element={<ProtectedRoute component={<PaymentDetails />} />}
              />
            </Route>
          </Route>
        </Route>
        <Route path={ROUTES.SERVICES} element={<Services />} />
        <Route path={ROUTES.ACCOUNT} element={<Account />} />
        <Route path={ROUTES.Notification} element={<Notifications/>} />
        <Route path={ROUTES.ORDER_SUCCESSFUL} element={<OrderSuccessful />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
    </Routes>
  );
};

export default Routing;
