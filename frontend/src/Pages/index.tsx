import { ProjectDetails } from './ProjectDetails';
import { ProjectList } from './ProjectList';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<ProjectList />} />
      <Route path="projects" element={<ProjectList />} />
      <Route path="projects/:projectId" element={<ProjectDetails />} />
    </Route>
  )
)