import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  COLOR_HEXACODES,
  ENGLISH_TO_FRENCH_COLOR_NAME
} from "../../utils/constants";
import axios from "../../axios-photos";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Collection from "../../components/Collection/Collection";
import Photo from "../../components/Photo/Photo";

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
    let thumbnailsData = [...this.state.thumbnailsData];

    axios
      .get(
        `/pictures/gallery?color=${ENGLISH_TO_FRENCH_COLOR_NAME[currentColor]}&page=1`
      )
      .then(response => {
        thumbnailsData = response.data.rows;
        this.setState({
          thumbnailsData,
          loading: false
        });
      })
      .catch(error => console.log(error));
  }

  logoClickedHandler = () => {
    this.props.history.push("/");
  };

  navColorSelectedHandler = color => {
    this.props.history.push(`/gallery/${color}`);
  };

  openPhotoHandler = id => {
    this.props.history.push(`/gallery/${this.state.currentColor}/${id}`);
  };

  render() {
    const {
      currentColor,
      toolbarColorsList,
      thumbnailsData,
      loading,
      redirect
    } = this.state;
    const currentHexacode = COLOR_HEXACODES[currentColor];

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Switch>
        <Route path={this.props.match.url + "/:id"}>
          <Toolbar
            logoClicked={this.logoClickedHandler}
            currentColor={currentColor}
            navColorSelected={this.navColorSelectedHandler}
          />
          <Photo></Photo>
        </Route>
        <Route path={this.props.match.url}>
          <Toolbar
            logoClicked={this.logoClickedHandler}
            toolbarColors={toolbarColorsList}
            navColorSelected={this.navColorSelectedHandler}
          />
          <Collection
            currentHexacode={currentHexacode}
            currentColor={currentColor}
            thumbnailsData={thumbnailsData}
            loading={loading}
            openPhoto={this.openPhotoHandler}
          />
        </Route>
      </Switch>
    );
  }
}

export default Gallery;
