import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
});

class UploadButton extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    images: []
  };

  handleCapture = ({ target }) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      this.setState({ images: e.target.result });
    };

    console.log(this.state.images);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <input accept="image/*" className={classes.input} id="icon-button-file" onChange={this.handleCapture} type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UploadButton);
