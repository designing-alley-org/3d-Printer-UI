// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/login.tsx';
import OrderSuccessful from '../pages/Order/OrderSuccessful.tsx';
import Layout from '../components/Layout';
import Customize from '../pages/CustomizeTab/index.tsx';
import ShippingDetails from '../pages/CheckOut/Shipping/index.tsx';
import DeliveryPlan from '../pages/CheckOut/DeliveryPlan/index.tsx';
import CheckOut from '../pages/CheckOut/index.tsx';
import { ROUTES } from './routes-constants.ts';
import Quote from '../pages/Quote/Card/index.tsx';
import PaymentDetails from '../pages/CheckOut/PaymentDetails/index.tsx';
import RegisterForm from '../pages/Auth/signup.tsx';
import Account from '../pages/YourAccount/index.tsx';
import GoogleAuthHandler from '../store/auth/GoogleAuthHandler.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Notifications from '../pages/NotificationOld/index.tsx';
import ForgetPassword from '../pages/Auth/forgetPassword.tsx';
import VerifyEmail from '../pages/Auth/VerifyEmail.tsx';
import ChangePassword from '../pages/Auth/ChangePassword.tsx';
import MyProfile from '../pages/YourAccount/MyProfile.tsx';
import MyDisputes from '../pages/YourAccount/myDispute/index.tsx';
import Password from '../pages/YourAccount/Password.tsx';
import { MyOrders } from '../pages/YourAccount/MyOrders.tsx';
import DashboardLayout from '../pages/Home/DashboardLayout.tsx';
import UploadStl from '../pages/UploadStlTab/index.tsx';
import Notification from '../pages/Notifications/index.tsx';
import STLWeightCalculator from '../pages/STLWeightCalculator';

const Routing: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={'test2'} element={<STLWeightCalculator />} />
      <Route path={ROUTES.SIGNUP} element={<RegisterForm />} />
      <Route path={ROUTES.GOOGLE_AUTH} element={<GoogleAuthHandler />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ChangePassword />} />
      <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />

      {/* Main Application Layout */}
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />

        {/* Dashboard Route - Shows Welcome or Dashboard based on first time login */}
        <Route
          path={ROUTES.DASHBOARD}
          element={<ProtectedRoute component={<DashboardLayout />} />}
        />

        {/* Quote Process Routes */}
        
        <Route path={`${ROUTES.GET_QUOTES}/:orderId`}>
          <Route
            path={ROUTES.UPLOAD_STL}
            element={<ProtectedRoute component={<UploadStl />} />}
          />
          <Route
            path={ROUTES.CUSTOMIZE}
            element={<ProtectedRoute component={<Customize />} />}
          />
          <Route
            path={ROUTES.QUOTE}
            element={<ProtectedRoute component={<Quote />} />}
          />
          
          {/* Checkout Routes */}
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

        {/* TODO: AFTER IMPLEMENTATION REMOVE OLD NOTIFICATION AND USE NEW ONE */}
        <Route
            path='/test'
            element={<ProtectedRoute component={<Notification />} />}
          />
        {/* Account Routes */}
        <Route
          path={ROUTES.ACCOUNT}
          element={<ProtectedRoute component={<Account />} />}
        >
          <Route
            index
            element={<Navigate to={ROUTES.MY_PROFILE} replace />}
          />
          <Route
            path={ROUTES.MY_PROFILE}
            element={<ProtectedRoute component={<MyProfile />} />}
          />
          <Route
            path={ROUTES.MY_ORDERS}
            element={<ProtectedRoute component={<MyOrders />} />}
          />
          <Route
            path={ROUTES.PASSWORD}
            element={<ProtectedRoute component={<Password />} />}
          />
          
          {/* Dispute Routes */}
          <Route path={ROUTES.MY_DISPUTE}>
            <Route
              index
              element={<ProtectedRoute component={<MyDisputes />} />}
            />
            <Route
              path=":_id/:orderId/:dispute_type"
              element={<ProtectedRoute component={<MyDisputes />} />}
            />
          </Route>
          
         
        </Route>

        {/* Notifications */}
        <Route
          path={ROUTES.Notification}
          element={<ProtectedRoute component={<Notifications />} />}
        />

        {/* Order Success */}
        <Route
          path={ROUTES.ORDER_SUCCESSFUL}
          element={<ProtectedRoute component={<OrderSuccessful />} />}
        />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};

export default Routing;