import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Home from '../features/page/home/Home';
import Login from '../features/page/login/Login';
import NotFound from '../features/page/notFound/NotFound';
import Project from '../features/page/project/Project';
import { IGeneralState } from '../interface/interface';
import { ERoute } from './routerLink';
import FormStep from '../features/page/formStep/FormStep';
import General from '../features/page/general/General';
import Team from '../features/page/team/Team';
import Task from '../features/page/task/Task';
import Notification from '../features/page/notification/Notification';

interface Props {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const isAuthenticated: boolean = useSelector((state: IGeneralState) => state.authReducer.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={ERoute.LOGIN} />;
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: ERoute.HOME,
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: ERoute.PROJECT,
        element: (
          <ProtectedRoute>
            <Project />
          </ProtectedRoute>
        )
      },
      {
        path: ERoute.CREATE_PROJECT,
        element: <ProtectedRoute>
          <FormStep />
        </ProtectedRoute>,
        children: [
          {
            index: true,
            element: <ProtectedRoute>
              <General />
            </ProtectedRoute>
          },
          {
            path: ERoute.PROJECT_TEAM,
            element: <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          },
          {
            path: ERoute.PROJECT_TASK,
            element: <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          },
          {
            path: ERoute.PROJECT_NOTIFICATION,
            element: <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        ]
      },
      {
        path: `${ERoute.EDIT_PROJECT}/:id`,
        element: <ProtectedRoute>
          <FormStep />
        </ProtectedRoute>,
        children: [
          {
            index: true,
            element: <ProtectedRoute>
              <General />
            </ProtectedRoute>
          },
          {
            path: ERoute.PROJECT_TEAM,
            element: <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          },
          {
            path: ERoute.PROJECT_TASK,
            element: <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          },
          {
            path: ERoute.PROJECT_NOTIFICATION,
            element: <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        ]
      }
    ]
  },
  {
    path: ERoute.VIEW_PROJECT,
    element: <Login />
  },
  {
    path: ERoute.LOGIN,
    element: <Login />
  },
  {
    path: ERoute.NOT_FOUND,
    element: <NotFound />
  }
]);
