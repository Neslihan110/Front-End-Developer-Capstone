import './App.css';
import{
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

const router=createBrowserRouter(createRoutesFromElements(
  <Route path="bookingpage" element={<bookingpage/>}></Route>
))


function App() {
  return (
       <RouterProvider router={router}/>
  );
}

export default App;
