import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Parent() {
  return (
    <div>
      <h2>Parent Page</h2>
      {/* Link to child route */}
      <Link to="child">Go to Child Page</Link>

      {/* This is where nested route will render */}
      <Outlet />
    </div>
  );
}

export default Parent;
