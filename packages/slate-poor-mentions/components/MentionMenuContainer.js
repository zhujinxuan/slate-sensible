import React, { Component } from "react";
import MentionMenuAtRange from "./MentionMenuAtRange.js";

// state: {name:, mentions}
class MentionMenuContainer extends Component {
  constructor(props) {
    super(props);
    const { updater } = props;

    updater.next = () => this.offsetMention(1);
    updater.previous = () => this.offsetMention(-1);
    updater.changeHOF = this.changeHOF;
    updater.isActive = this.isActive;

    this.state = {
      name: undefined,
      mentions: [],
      rangeJSON: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value, getMentions } = nextProps;
    const { mentions, rangeJSON } = getMentions(value);
    this.setState({ mentions, rangeJSON });
  }

  compomnentDidMount() {
    const { value, getMentions } = this.props;
    const { mentions, rangeJSON } = getMentions(value);
    if (mentions.length > 0) {
      this.setState({ mentions, rangeJSON });
    }
  }

  changeHOF = () => {
    if (!this.isActive()) {
      return null;
    }
    const { name, mentions } = this.state;
    const mention = mentions.find(m => m.name === name);
    if (!mention) {
      return null;
    }
    const { anchorOffset, focusOffset } = this.state.rangeJSON;
    return change =>
      change.moveOffsetsTo(anchorOffset, focusOffset).insertText(mention.name);
  };

  selectMention = mention => {
    const { mentions } = this.state;
    let index = mentions.indexOf(mention);
    if (index > -1) {
      this.setState({ name: mention.name });
    }
  };

  offsetMention = offset => {
    if (offset === 0) {
      return;
    }
    const { name, mentions } = this.state;
    if (mentions.length === 0) {
      return;
    }
    const lastIndex = mentions.findIndex(m => m.name === name);
    let index;
    if (offset > 0) {
      index = (lastIndex + offset) % mentions.length;
    } else {
      index =
        ((lastIndex === -1 ? 0 : lastIndex) + offset + mentions.length) %
        mentions.length;
    }

    if (index > -1) {
      this.setState({ name: mentions[index].name });
    }
  };

  isActive = () => {
    const { mentions } = this.state;
    return mentions && mentions.length > 0;
  };

  render() {
    const { mentions, name } = this.state;
    const { selectMention, changeHOF } = this;
    const { submitChange, value } = this.props;
    return (
      <MentionMenuAtRange
        {...{ value, mentions, name, selectMention, submitChange, changeHOF }}
      />
    );
  }
}

export default MentionMenuContainer;
