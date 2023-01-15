import "./App.css";
import PaginationApi from "./PaginationApi";
import data from "./data.json";

function App() {
  return (
    <PaginationApi
      elements={data}
      noOfelementsInAPage={10}
      elementToRender={data.map((item) => (
        <div>{item.title}</div>
      ))}
      size="md"
      // activeColor="red"
    />
  );
}

export default App;
