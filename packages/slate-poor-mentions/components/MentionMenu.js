import React, { Component } from "react";
import MentionItem from "./MentionItem.js";
import { findDOMRange } from "slate-react";
import Portal from "react-portal";

function getRect(selectionDOMRange) {
  const rect = selectionDOMRange.getBoundingClientRect();
  return rect;
}

function hideWithRect(dom) {
  dom.style.position = "absolute";
  dom.style.visibility = "hidden";
  dom.style.display = "block";
  dom.style.left = "-1000px";
  dom.style.top = "-1000px";
}

class MentionMenu extends Component {
  componentDidMount() {
    this.adjustPosition();
  }

  componentDidUpdate() {
    this.adjustPosition();
  }

  adjustPosition = () => {
    let menu = this.menu;
    if (!menu) {
      return;
    }
    const { mentions, value } = this.props;
    if (mentions.length === 0) {
      return;
    }
    const domRange = findDOMRange(value.selection, window);
    if (!domRange) {
      return;
    }
    const { left, top, bottom } = getRect(domRange);
    hideWithRect(menu);
    const { width, height } = getRect(menu);

    if (left + width < window.innerWidth) {
      menu.style.left = `${left + window.scrollX}px`; // eslint-disable-line no-mixed-operators
    } else {
      menu.style.left = `${left - width + window.scrollX} px`;
    }

    if (bottom + height < window.innerHeight) {
      menu.style.top = `${bottom + window.scrollY}px`;
    } else {
      menu.style.top = `${top - height - 34 + window.scrollY}px`;
    }

    menu.style.visibility = "visible";
  };

  onOpen = ref => {
    this.menu = ref.firstChild;
    if (this.menu) {
      this.menu.style.position = "absolute";
      this.menu.style.visibility = "hidden";
      this.menu.style.display = "block";
    }
  };

  onClose = () => {
    this.menu.removeAttribute("style");
    this.menu = null;
  };

  confirmMention = () => {
    const { changeHOF, submitChange } = this.props;
    const toChange = changeHOF();
    if (!toChange) {
      return;
    }
    submitChange(toChange);
  };

  render() {
    const { mentions, name, selectMention } = this.props;
    const isOpened = mentions && mentions.length > 0;

    return (
      <Portal isOpened={isOpened} onOpen={this.onOpen}>
        <ul className={"RichEditor-mention-menu"} onKeyDown={this.onKeyDown}>
          {mentions.map(mention => (
            <MentionItem
              selected={mention.name === name}
              mention={mention}
              key={mention.name}
              confirmMention={this.confirmMention}
              selectMention={selectMention}
            />
          ))}
        </ul>
      </Portal>
    );
  }
}

export default MentionMenu;
