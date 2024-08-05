import './App.css';
import {Component} from "react";

function App() {
  return (
    <div className="App">
      My Todo Application Updated
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
        <FourthComponent />
    </div>
  );
}

function FirstComponent() {
    return (
        <div className="FirstComponent">
        My First Component
        </div>
    );
}

function SecondComponent() {
    return (
        <div className="SecondComponent">
            My Second Component
        </div>
    );
}

class ThirdComponent extends Component {
    render() {
        return (
        <div className="ThirdComponent">
            My Third Component
        </div>
        )
    }
}

class FourthComponent extends Component {
    render() {
        return (
            <div className="FourthComponent">
                My Fourth Component
            </div>
        )
    }
}

export default App;
