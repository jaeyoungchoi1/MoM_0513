import React, { Component } from "react";
import "./styles.css";
import BottomDrawer from "./components/BottomDrawer";
import Maps from "./components/Maps";
import places from "./Places";

class App extends Component {
  state = {
    selectedItem: { lat: 0, lng: 0 }
  };

  showInfo(e, selectedItem) {
    this.setState({ selectedItem: selectedItem });
    console.log(selectedItem);
  }

  render() {
    return (
      <div className="App">
        <BottomDrawer places={places} onClick={this.showInfo.bind(this)} />
        <Maps
          places={places}
          selectedItem={this.state.selectedItem}
          onClick={this.showInfo.bind(this)}
        />
      </div>
    );
  }
}

export default App;
