import MyProvider from "./context/Provider";
import Home from "./Pages/Home/Home";

function App() {
  // provider donde se usa el cambio de idioma
  return (
    <MyProvider> 
      <Home />
    </MyProvider>
  );
}

export default App;