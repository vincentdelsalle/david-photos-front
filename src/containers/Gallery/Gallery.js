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
  state = {
    allColors: Object.keys(COLOR_HEXACODES),
    currentColor: "",
    toolbarColorsList: [],
    thumbnailsData: [],
    redirect: false,
    loading: true
  };

  static getDerivedStateFromProps(props, state) {
    const allColors = state.allColors;
    const urlParamColor = props.match.params.color;

    const isUrlColorValid = allColors.find(
      colorName => colorName === urlParamColor
    );

    if (!isUrlColorValid) {
      return { redirect: true };
    }

    if (state.currentColor !== urlParamColor) {
      return { currentColor: urlParamColor };
    }

    return null;
  }

  componentDidMount() {
    const { allColors, currentColor } = this.state;

    this.loadToolbarColorsList(allColors, currentColor);
    this.loadThumbnailsData(currentColor);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.color !== prevProps.match.params.color) {
      this.setState({ loading: true });
      const allColors = Object.keys(COLOR_HEXACODES);
      const urlParamColor = this.props.match.params.color;
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
