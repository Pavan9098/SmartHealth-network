import React from 'react';
import Navbar from './Navbar';
// import NearbyHospitals from './NearbyHospitals';
import Dashboard from './Users_dashboard';
import Float from './FloatButton';

const UserView = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px' }}>
        {/* <NearbyHospitals /> */}
        <Dashboard />
      </main>
      <Float />
    </div>
  );
};

export default UserView;
