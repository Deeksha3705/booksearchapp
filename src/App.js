import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import mainreducer from "./reducers";

import './App.css';
import BookApp from "./components/index";

const store = createStore(mainreducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
    <div className="mainpage_div">
    <BookApp />
    </div>
    </Provider>
  );
}

export default App;
