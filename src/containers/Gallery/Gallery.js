import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import {
  COLOR_HEXACODES,
  ENGLISH_TO_FRENCH_COLOR_NAME
} from "../../utils/constants";
import axios from "../../axios-photos";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import GalleryFrame from "../../components/GalleryFrame/GalleryFrame";

class Gallery extends Component {
  constructor(props) {
    super(props);

    const allColors = Object.keys(COLOR_HEXACODES);
    const urlParamColor = props.match.params.color;

    const isUrlColorValid = allColors.find(
      colorName => colorName === urlParamColor
    );

    let currentColor = "";
    let redirect = false;

    if (!isUrlColorValid) {
      redirect = true;
    } else {
      currentColor = urlParamColor;
    }

    this.state = {
      allColors,
      currentColor,
      toolbarColorsList: [],
      thumbnailsData: [],
      redirect,
      loading: true
    };
  }

  componentDidMount() {
    const { allColors, currentColor } = this.state;

    if (currentColor) {
      this.loadToolbarColorsList(allColors, currentColor);
      this.loadThumbnailsData(currentColor);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const paramColor = this.props.match.params.color;
    const prevParamColor = prevProps.match.params.color;

    if (paramColor !== prevParamColor) {
      this.setState({ loading: true });

      const allColors = this.state.allColors;
      const urlParamColor = paramColor;

      this.loadToolbarColorsList(allColors, urlParamColor);
      this.loadThumbnailsData(urlParamColor);
    }
  }

  loadToolbarColorsList(allColors, currentColor) {
    const toolbarColorsList = allColors.filter(
      colorName => colorName !== currentColor
    );

    this.setState({ currentColor, toolbarColorsList });
  }

  loadThumbnailsData(currentColor) {
    let updatedState = { ...this.state };

    axios
      .get(
        `/pictures/gallery?color=${ENGLISH_TO_FRENCH_COLOR_NAME[currentColor]}&page=1`
      )
      .then(response => {
        updatedState.thumbnailsData = response.data.rows;
        this.setState({
          thumbnailsData: updatedState.thumbnailsData,
          loading: false
        });
      })
      .catch(error => console.log(error));
  }

  navColorSelectedHandler = color => {
    this.props.history.push("/gallery/" + color);
  };

  render() {
    const {
      redirect,
      toolbarColorsList,
      currentColor,
      thumbnailsData,
      loading
    } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    const currentHexacode = COLOR_HEXACODES[currentColor];

    return (
      <React.Fragment>
        <Toolbar
          toolbarColors={toolbarColorsList}
          navColorSelected={this.navColorSelectedHandler}
        />
        <GalleryFrame
          currentHexacode={currentHexacode}
          currentColor={currentColor}
          thumbnailsData={thumbnailsData}
          loading={loading}
        />
      </React.Fragment>
    );
  }
}

export default Gallery;
