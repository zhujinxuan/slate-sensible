import React, { Component } from "react";
import MentionMenu from "./MentionMenu.js";

// Adjust "fake scroll" to ensure the selected item is shown
// props:
// {mentions, name, selectMention, submitChange, changeHOF }

const numShowedMentions = 9;
function showedMentions(mentions, name, num, offsetIndex) {
  const index = mentions.findIndex(m => m.name === name);
  if (index === -1) {
    return mentions.slice(0, num);
  }

  if (mentions.length < num) {
    num = mentions.length;
  }
  if (offsetIndex < 0) {
    offsetIndex = 0;
  } else if (offsetIndex > num - 1) {
    offsetIndex = num - 1;
  }
  const startIndex = (index - offsetIndex + mentions.length) % mentions.length;
  const endIndex = startIndex + num;
  if (endIndex < mentions.length) {
    return mentions.slice(startIndex, endIndex);
  }
  const beforeMentions = mentions.slice(startIndex, mentions.length);
  const afterMentions = mentions.slice(0, endIndex - mentions.length);
  return [...beforeMentions, ...afterMentions];
}

class MentionMenuAtRange extends Component {
  constructor(props) {
    super();
    const { mentions, name } = props;
    this.state = {
      mentions: showedMentions(mentions, name, numShowedMentions, 0)
    };
  }
  componentWillReceiveProps(nextProps) {
    const { name, mentions } = nextProps;
    const offsetIndex = this.state.mentions.findIndex(m => m.name === name);
    this.setState({
      mentions: showedMentions(mentions, name, numShowedMentions, offsetIndex)
    });
  }
  render() {
    const { mentions } = this.state;
    const { value, name, selectMention, submitChange, changeHOF } = this.props;
    return (
      <MentionMenu
        {...{ value, mentions, name, selectMention, submitChange, changeHOF }}
      />
    );
  }
}

export default MentionMenuAtRange;
