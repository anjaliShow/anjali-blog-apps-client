import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { protectedroutes } from '../routes';
import ProtectedRoute from './ProtectedRoute';

const AppContent = () => {
  return (
    <>
      <Suspense fallback={<h2>Loading....</h2>}>
        <Routes>
          {protectedroutes.map((route, index) => {
            return (
              route.element && (
                <Route
                  key={index}
                  path={route?.path}
                  exact={route?.exact}
                  name={route?.name}
                  element={
                    route?.protectedRoute ? (
                      <ProtectedRoute>
                        <route.element />
                      </ProtectedRoute>
                    ) : (
                      <route.element />
                    )
                  }
                />
              )
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppContent;
