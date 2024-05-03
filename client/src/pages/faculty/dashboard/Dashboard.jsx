import React, { useState } from 'react';
import { useAuth } from '../../../store/auth';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>hiir {user.email}</h1>
    </div>
  )
}

export default Dashboard;