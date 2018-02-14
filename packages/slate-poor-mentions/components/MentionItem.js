import React, { Component } from "react";
import PropTypes from "prop-types";

class MentionItem extends Component {
  onMouseDown = event => {
    event.preventDefault();
    this.props.confirmMention();
  };
  onMouseEnter = event => {
    event.preventDefault();
    const { selectMention, mention } = this.props;
    selectMention(mention);
  };

  render() {
    const { mention, selected } = this.props;
    const { onMouseDown, onMouseEnter } = this;
    const className = selected ? "selected" : "";
    return (
      <li
        className={className}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
      >
        {mention.name}
      </li>
    );
  }
}

MentionItem.propsType = {
  mention: PropTypes.object,
  selected: PropTypes.bool
};

export default MentionItem;
