import React, {Component} from 'react';

class Notification extends Component {
    render() {
        const {notifComment} = this.props.notifications;
        if (!notifComment.notif) {
            return <span></span>
        }
        if (notifComment.notif) {
            const notification = notifComment.notif;
            return (
                <div>
                    <p>{notification.message}</p>
                    {notification.user_from.username_display} a laissé un commentaire sur {notification.story}
                </div>
            )
        }

    }
}

export default Notification;