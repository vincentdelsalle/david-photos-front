import React, { Fragment, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { ALL_COLORS_LIST } from "../../shared/constants";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import ThumbnailsFrame from "../../components/ThumbnailsFrame/ThumbnailsFrame";
import * as actions from "../../store/actions";

const Collection = ({ onFetchCollection, colData, loading, error }) => {
  const { color: urlColorParam } = useParams();
  const validUrlColor = ALL_COLORS_LIST.find(
    (colorName) => colorName === urlColorParam
  );
  useEffect(() => {
    onFetchCollection(validUrlColor);
  }, [onFetchCollection, validUrlColor]);

  return (
    <Fragment>
      {!validUrlColor && <Redirect to="/" />}
      {validUrlColor && (
        <Fragment>
          <Toolbar
            toolbarType="collectionToolbar"
            currentColor={validUrlColor}
          />
          <ThumbnailsFrame
            currentColor={validUrlColor}
            colorCollectionData={colData[validUrlColor]}
            loading={loading}
            error={error}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    colData: state.collection,
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCollection: (color) => dispatch(actions.fetchCollection(color)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
