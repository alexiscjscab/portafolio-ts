import MyProvider from './Context/Provider';
import Home from "./Pages/Home/Home";

function App() {
  return (
    <MyProvider> 
      <Home />
    </MyProvider>
  );
}

export default App;