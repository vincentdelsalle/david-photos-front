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
      displayedPhotoID: null,
      redirect,
      loading: true,
      error: null,
      isSwitchButtonDisabled: { previous: false, next: false },
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
      () => this.props.history.push(`/gallery/${color}`)
    );
  };

  openPhotoHandler = (id) => {
    this.props.history.push(`/gallery/${this.state.currentColor}/${id}`);
  };

  switchButtonClickedHandler = (btnType) => {
    const { collectionData, displayedPhotoID, currentColor } = this.state;

    const displayedPhotoIndex = collectionData.findIndex(
      (photo) => photo.id === displayedPhotoID
    );

    const newPhotoData = collectionData.find((_, i) => {
      return btnType === "next"
        ? i === displayedPhotoIndex + 1
        : btnType === "previous"
        ? i === displayedPhotoIndex - 1
        : null;
    });

    this.props.history.push(`/gallery/${currentColor}/${newPhotoData.id}`);
  };

  onPhotoLoadedHandler = (status, photoID) => {
    if (status === "isLoaded" && photoID) {
      return this.setState({ displayedPhotoID: photoID }, () => {
        const {
          collectionData,
          displayedPhotoID,
          isSwitchButtonDisabled,
        } = this.state;

        const lastCollectionIndex = collectionData.length - 1;
        const displayedPhotoIndex = collectionData.findIndex(
          (photo) => photo.id === displayedPhotoID
        );
        const isSwitchButtonDisabledCopied = { ...isSwitchButtonDisabled };

        if (displayedPhotoIndex === lastCollectionIndex) {
          isSwitchButtonDisabledCopied.previous = false;
          this.setState({
            isSwitchButtonDisabled: isSwitchButtonDisabledCopied,
          });
        } else if (displayedPhotoIndex === 0) {
          isSwitchButtonDisabledCopied.next = false;
          this.setState({
            isSwitchButtonDisabled: isSwitchButtonDisabledCopied,
          });
        } else {
          this.setState({
            isSwitchButtonDisabled: { previous: false, next: false },
          });
        }
      });
    } else {
      this.setState({ isSwitchButtonDisabled: { previous: true, next: true } });
    }
  };

  render() {
    const {
      currentColor,
      toolbarColorsList,
      collectionData,
      redirect,
      loading,
      error,
      isSwitchButtonDisabled,
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
            switchButtonClicked={this.switchButtonClickedHandler}
            isSwitchButtonDisabled={isSwitchButtonDisabled}
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
