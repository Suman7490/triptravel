import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register'
import TourDetails from '../pages/TourDetails'
import ThankYou from '../pages/ThankYou'
import DashboardLayout from '../adminPanel/DashboardLayout';
import AllBookings from '../adminPanel/pages/AllBookings';
import CreateTour from '../adminPanel/pages/CreateTour';
import ProtectedRoute from '../adminPanel/ProtectedRoute';
import Tours from '../pages/Tours'
import Dashboard from '../adminPanel/Dashboard';
import AllTours from '../adminPanel/pages/AllTours';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />


      {/* Admin Dashboard with Layout */}
      {/* <Route path="/dashboard/*" element={
        <ProtectedRoute adminOnly>
          <DashboardLayout>
            <Routes>
              <Route path="bookings" element={<AllBookings />} />
              <Route path="create-tour" element={<CreateTour />} />
            </Routes>
          </DashboardLayout>
        </ProtectedRoute> */}
      <Route path="/dashboard/*" element={
        <ProtectedRoute adminOnly>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="bookings" element={<AllBookings />} />
            <Route path="create-tour" element={<CreateTour />} />
            <Route path="/tours" element={<AllTours />} />
          </Routes>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default Routers;
