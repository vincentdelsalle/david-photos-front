import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  COLOR_HEXACODES,
  ENGLISH_TO_FRENCH_COLOR_NAME,
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
      (colorName) => colorName === urlParamColor
    );

    let currentColor = null;
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
      collectionData: [],
      redirect,
      loading: true,
      error: null,
      isDisabled: false,
    };
  }

  componentDidMount() {
    const { allColors, currentColor } = this.state;

    if (currentColor) {
      this.loadToolbarColorsList(allColors, currentColor);
      this.loadCollectionData(currentColor);
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
      this.loadCollectionData(urlParamColor);
    }
  }

  loadToolbarColorsList(allColors, currentColor) {
    const toolbarColorsList = allColors.filter(
      (colorName) => colorName !== currentColor
    );

    this.setState({ currentColor, toolbarColorsList });
  }

  loadCollectionData(currentColor) {
    let collectionData = [...this.state.collectionData];

    axios
      .get(
        `/pictures/gallery?color=${ENGLISH_TO_FRENCH_COLOR_NAME[currentColor]}&page=1`
      )
      .then((response) => {
        collectionData = response.data.rows;
        this.setState({
          collectionData,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  }

  logoClickedHandler = () => {
    this.props.history.push("/");
  };

  navColorSelectedHandler = (color, type) => {
    this.setState(
      type === "collectionNav"
        ? {
            collectionData: [],
            loading: false,
          }
        : {
            loading: false,
          },
      this.props.history.push(`/gallery/${color}`)
    );
  };

  openPhotoHandler = (id) => {
    this.setState(
      { isDisabled: false },
      this.props.history.push(`/gallery/${this.state.currentColor}/${id}`)
    );
  };

  buttonClickedHandler = (btnType) => {
    //TODO logic to handle previous and next photo buttons
  };

  onPhotoLoadedHandler = (id) => {
    if (id) {
      return;
    }
    this.setState({ isDisabled: true });
  };

  render() {
    const {
      currentColor,
      toolbarColorsList,
      collectionData,
      redirect,
      loading,
      error,
      isDisabled,
    } = this.state;

    const currentHexacode = COLOR_HEXACODES[currentColor];

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Switch>
        <Route path={this.props.match.url + "/:id"}>
          <Toolbar
            toolbarType="photoToolbar"
            logoClicked={this.logoClickedHandler}
            currentColor={currentColor}
            navColorSelected={this.navColorSelectedHandler}
            buttonClicked={this.buttonClickedHandler}
            isButtonDisabled={isDisabled}
          />
          <Photo
            colorCollectionData={collectionData}
            onPhotoLoaded={this.onPhotoLoadedHandler}
          ></Photo>
        </Route>
        <Route path={this.props.match.url}>
          <Toolbar
            toolbarType="collectionToolbar"
            logoClicked={this.logoClickedHandler}
            toolbarColors={toolbarColorsList}
            navColorSelected={this.navColorSelectedHandler}
          />
          <Collection
            currentHexacode={currentHexacode}
            currentColor={currentColor}
            colorCollectionData={collectionData}
            loading={loading}
            error={error}
            openPhoto={this.openPhotoHandler}
          />
        </Route>
      </Switch>
    );
  }
}

export default Gallery;
