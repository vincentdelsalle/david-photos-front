import React, { Component } from "react";

import classes from "./Homepage.module.css";
import signature from "../../assets/images/signature.png";
import ColorGate from "../../components/HomepageFrame/ColorGate/ColorGate";

class Homepage extends Component {
  state = {};

  colorSelectedHandler = color => {
    this.props.history.push("/gallery/" + color);
  };

  adminAccessHandler = () => {
    this.props.history.push("/auth");
  }

  render() {
    return (
      <div className={classes.Frame}>
        <div className={classes.TopWhiteRecent}>
          <div className={classes.JapaneseGlyphs}>新鋭</div>
        </div>
        <ColorGate
          assignedClass="TopBlack"
          galleryReached={() => this.colorSelectedHandler("black")}
        />
        <ColorGate
          assignedClass="TopWhite"
          galleryReached={() => this.colorSelectedHandler("white")}
        />
        <ColorGate
          assignedClass="LeftBrown"
          galleryReached={() => this.colorSelectedHandler("brown")}
        />
        <ColorGate
          assignedClass="LeftWhite"
          galleryReached={() => this.colorSelectedHandler("white")}
        />
        <ColorGate
          assignedClass="LeftYellow"
          galleryReached={() => this.colorSelectedHandler("yellow")}
        />
        <ColorGate
          assignedClass="BigRed"
          galleryReached={() => this.colorSelectedHandler("red")}
        />
        <ColorGate
          assignedClass="BigYellow"
          galleryReached={() => this.colorSelectedHandler("yellow")}
        />
        <ColorGate
          assignedClass="LongWhite"
          galleryReached={() => this.colorSelectedHandler("white")}
        />
        <ColorGate
          assignedClass="LongPurple"
          galleryReached={() => this.colorSelectedHandler("purple")}
        />
        <ColorGate
          assignedClass="SquareBlackWhite"
          galleryReached={() => this.colorSelectedHandler("blackwhite")}
        />
        <ColorGate
          assignedClass="CenterWhite"
          galleryReached={() => this.colorSelectedHandler("white")}
        />
        <ColorGate
          assignedClass="CenterGreen"
          galleryReached={() => this.colorSelectedHandler("green")}
        />

        <div className={classes.Signature} onClick={this.adminAccessHandler}>
          <img src={signature} alt="signature" />
        </div>

        <ColorGate
          assignedClass="BigBlue"
          galleryReached={() => this.colorSelectedHandler("blue")}
        />
        <ColorGate
          assignedClass="BottomGrey"
          galleryReached={() => this.colorSelectedHandler("grey")}
        />
        <ColorGate
          assignedClass="BottomWhite"
          galleryReached={() => this.colorSelectedHandler("white")}
        />

        <div className={classes.BottomThinWhite}>
          <div>&copy; 2010 DAVID PREAT</div>
          <div>Tous droits réservés</div>
        </div>

        <ColorGate
          assignedClass="RightWhite"
          galleryReached={() => this.colorSelectedHandler("white")}
        />
        <ColorGate
          assignedClass="RightRed"
          galleryReached={() => this.colorSelectedHandler("red")}
        />
      </div>
    );
  }
}

export default Homepage;
