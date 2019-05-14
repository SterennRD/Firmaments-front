import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.handleRead = this.handleRead.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notifications.notifComment !== this.props.notifications.notifComment) {
            //etTimeout(this.props.resetMe, 10000);
        }
    }
    handleRead(id) {

    }
    render() {
        const {notifComment} = this.props.notifications;
        if (!notifComment.notif) {
            return <span></span>
        }
        if (notifComment.notif) {
            const notification = notifComment.notif;
            return (
                <div className="notification">
                    <p className="notification__message">{notification.message}</p>
                    {notification.user_from.username_display} a laissé un commentaire sur <Link to={'/stories/see/' + notification.story_id._id}>{notification.story_id.title}</Link>
                    <a id={notification._id} onClick={e => this.handleRead(e.target.id)}>Marquer comme lu</a>
                </div>
            )
        }

    }
}

export default Notification;