// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/login.tsx';
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
import RegisterForm from '../pages/Auth/signup.tsx';
import DashboardLayout from '../components/DashboardLayout/index.tsx';
import Account from '../pages/YourAccount/index.tsx';
import Services from '../pages/Services/index.tsx';
import GoogleAuthHandler from '../store/auth/GoogleAuthHandler.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Notifications from '../pages/Notification/index.tsx';
import ForgetPassword from '../pages/Auth/forgetPassword.tsx';
import VerifyEmail from '../pages/Auth/VerifyEmail.tsx';
import ChangePassword from '../pages/Auth/ChangePassword.tsx';
import MyProfile from '../pages/YourAccount/MyProfile.tsx';
import MyDisputes from '../pages/YourAccount/myDispute/index.tsx';
import PlaceOrder from '../pages/YourAccount/placeOrder/PlaceOrder.tsx';
import Password from '../pages/YourAccount/Password.tsx';
import Settings from '../pages/YourAccount/Settings.tsx';
import MyOrders from '../pages/YourAccount/MyOrders.tsx';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<RegisterForm />} />
      <Route path={ROUTES.GOOGLE_AUTH} element={<GoogleAuthHandler />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgetPassword />} />
      <Route path='/reset-password' element={<ChangePassword/>}/>
      <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<Navigate to={ROUTES.DASHBOARD} />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
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
                  component={<UploadStlCard files={[]} setFiles={() => { }} />}
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
        <Route
          path={ROUTES.ACCOUNT}
          element={<ProtectedRoute component={<Account />} />}
        >
          <Route
            index
            element={<ProtectedRoute component={<Navigate to={ROUTES.MY_PROFILE} />} />}
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
            path={ROUTES.MY_DISPUTE}
            element={<ProtectedRoute component={<MyDisputes />} />}
          >
            <Route
              path=":_id/:orderId/:dispute_type/"
              element={<ProtectedRoute component={<MyDisputes />} />}
            />
            </Route>
          <Route
            path={ROUTES.PLACE_ORDER}
            element={<ProtectedRoute component={<PlaceOrder />} />}
          >
            <Route
              path=":orderId/"
              element={<ProtectedRoute component={<PlaceOrder />} />}
            >
            </Route>
            </Route>
          <Route
            path={ROUTES.PASSWORD}
            element={<ProtectedRoute component={<Password />} />}
          />
          <Route
            path={ROUTES.ACCOUNT_SETTINGS}
            element={<ProtectedRoute component={<Settings />} />}
          />
        </Route>
        <Route
          path={ROUTES.Notification}
          element={<ProtectedRoute component={<Notifications />} />}
        />
        <Route
          path={ROUTES.ORDER_SUCCESSFUL}
          element={<ProtectedRoute component={<OrderSuccessful />} />}
        />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
    </Routes>
  );
};

export default Routing;
