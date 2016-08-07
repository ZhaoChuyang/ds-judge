import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Message from './MessageComponent';
import moment from 'moment';
import 'jquery-scroll-lock';
import 'jquery.easing';

const mapStateToProps = (state) => ({
  activeId: state.activeId,
  item: state.activeId !== null
    ? state.dialogues[state.activeId]
    : null,
});

@connect(mapStateToProps, null)
export default class MessagePadDialogueContentContainer extends React.PureComponent {
  renderInner() {
    if (this.props.activeId === null) {
      return [];
    }
    return _.map(this.props.item.reply, (reply, idx) => (
      <Message
        key={idx}
        isSelf={reply.sender_uid === UserContext.uid}
        faceUrl="//gravatar.lug.ustc.edu.cn/avatar/3efe6856c336243c907e2852b0498fcf?d=mm&amp;s=200"
      >
        <div>{reply.content}</div>
        <time>{moment(reply.at).fromNow()}</time>
      </Message>
    ));
  }
  render() {
    return (
      <ol className="messagepad__content" ref="list">
        {this.renderInner()}
      </ol>
    );
  }
  componentDidMount() {
    $(this.refs.list).scrollLock({ strict: true });
  }
  componentWillUpdate(nextProps) {
    if (nextProps.activeId !== this.props.activeId) {
      this.scrollToBottom = true;
      this.scrollWithAnimation = false;
      return;
    }
    const node = this.refs.list;
    if (node.scrollTop + node.offsetHeight === node.scrollHeight) {
      this.scrollToBottom = true;
      this.scrollWithAnimation = true;
      return;
    }
    this.scrollToBottom = false;
  }
  componentDidUpdate() {
    if (this.scrollToBottom) {
      const node = this.refs.list;
      const targetScrollTop = node.scrollHeight - node.offsetHeight;
      if (this.scrollWithAnimation) {
        $(node).stop().animate({ scrollTop: targetScrollTop }, 200, 'easeOutCubic');
      } else {
        node.scrollTop = targetScrollTop;
      }
    }
  }
}