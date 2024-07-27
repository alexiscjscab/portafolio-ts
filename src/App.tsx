import MyProvider from "./context/Provider";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <MyProvider>
      <Home />
    </MyProvider>
  );
}

export default App;