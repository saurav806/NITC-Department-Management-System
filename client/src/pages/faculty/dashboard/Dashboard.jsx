import React, { useState } from 'react';
import { useAuth } from '../../../store/auth';

function Dashboard() {
  const {user}  = useAuth();
  React.useEffect(()=>{
    if (!user) {
      console.log("user ",JSON.stringify(user));
    }
  },[user])

  console.log("Rendering Dashboard, user:", user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>hiir {user.email} </h1>
    </div>
  )
}

export default Dashboard;