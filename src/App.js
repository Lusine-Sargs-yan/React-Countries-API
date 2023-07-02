import { Route, Routes, BrowserRouter} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import CountryPage from "./pages/CountryPage";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <>
        <Nav/>
        <Routes>
          <Route index path="/" element={<Home/>}></Route>
          <Route  path="/countries" element={<Countries/>}></Route>
          <Route  path="/countries/:countryId" element={<CountryPage/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </>
    </BrowserRouter>
  )
}
