import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {resetNotifRead} from "../../actions/NotifAction";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.handleRead = this.handleRead.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notifications.notifComment !== this.props.notifications.notifComment) {
            //etTimeout(this.props.resetMe, 10000);
        }
        if (prevProps.notifications.notifRead !== this.props.notifications.notifRead) {
            setTimeout(this.props.resetNotifRead, 10000);
        }
    }
    handleRead(id) {

    }
    render() {
        const {notifComment, notifRead} = this.props.notifications;
        let nC, nR;
        if (!notifComment.notif && !notifRead.notif) {
            return <span></span>
        }
        if (notifComment.notif) {
            const notification = notifComment.notif;
            nC = notification.map (notification => (
                <div key={notification._id} className="notification">
                    <p className="notification__message">{notification.message}</p>
                    {notification.user_from.username_display} a laissé un commentaire sur <Link to={'/stories/see/' + notification.story_id._id}>{notification.story_id.title}</Link>
                    <a id={notification._id} onClick={e => this.handleRead(e.target.id)}>Marquer comme lu</a>
                </div>
            ))
        }
        if (notifRead.notif) {
            const notification = notifRead.notif;
            nR = notification.map (notification => (
                <div key={notification._id} className="notification">
                    <p className="notification__message">{notification.message}</p>
                    <a id={notification._id} onClick={e => this.handleRead(e.target.id)}>Marquer comme lu</a>
                </div>
            ))
        }

        return (
            <div>
                {nC}
                {nR}
            </div>
        )

    }
}

export default Notification;