import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TourDetails from '../pages/TourDetails';
import ThankYou from '../pages/ThankYou';
import DashboardLayout from '../adminPanel/DashboardLayout';
import AllBookings from '../adminPanel/pages/AllBookings';
import CreateTour from '../adminPanel/pages/CreateTour';
import ProtectedRoute from '../adminPanel/ProtectedRoute';
import Tours from '../pages/Tours';
import Dashboard from '../adminPanel/Dashboard';
import AllTours from '../adminPanel/pages/AllTours';
import SearchResultList from '../pages/SearchResultList';
import Themes from '../adminPanel/pages/Themes'
import TourSlider from '../pages/TourSlider';

const Routers = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/login" element={<Tours />} /> */}
      <Route path="/register" element={<Register />} />
      <Route path="/tourSlider" element={<TourSlider />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/thank-you" element={<ThankYou />} />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute adminOnly>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="create-tour" element={<CreateTour />} />
        <Route path="/dashboard/create-tour/:id" element={<CreateTour />} />
        <Route path="bookings" element={<AllBookings />} />
        <Route path="tours" element={<AllTours />} />
        <Route path="themes" element={<Themes />} />
      </Route>
    </Routes>
  );
};

export default Routers;
