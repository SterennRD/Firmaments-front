import React, {Component} from 'react';
import moment from "moment/min/moment-with-locales.min";
import Modal from "../forms/renderModal";
class NotificationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSeen = this.handleSeen.bind(this)
    }

    fetchData(id) {
        const token = localStorage.getItem('jwtToken');
        this.props.getAllNotifs(id, token)
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchData(id)
    }

    handleSeen(id) {
        const token = localStorage.getItem('jwtToken');
        this.props.markAsRead(id, token)
    }
    handleDelete(id) {
        this.props.deleteChapter(id)
        this.setState({showModal: false, idModal: null})
    }

    handleDeleteConfirm(id) {
        this.setState({showModal: true, idModal: id})
    }
    handleCancel() {
        this.setState({showModal: false, idModal: null})
    }
    render() {
        moment.locale('fr');
        const modal = (
            <Modal
                title="Confirmer ?"
                id={this.state.idModal}
                explanation="Supprimer la notification ?"
                yesButton="Oui"
                noButton="Non"
                yesCallback={id => {
                    this.handleDelete(id);
                }}
                noCallback={() => {
                    this.handleCancel();
                }}
            />
        );
        const {notifs, loading, error} = this.props.notifications.allNotifs;
        let notifList;
        if (notifs) {
            notifList = notifs.map(n => (
                <div key={n._id} className={`notifications__item col-xs-12 col-md-6 col-lg-6 ${!n.seen ? 'notifications__item--unseen' : ''}`}>
                    <p className="notifications__item_message">{n.message}</p>
                    <div className="notifications__item_date">{moment(n.created_at).format('LLL')}</div>
                    <div className="notifications__item_links">
                        <div id={n._id} onClick={e => this.handleSeen(e.target.id)} className="notifications__item_btn">Marquer comme lu</div>
                        <div id={n._id} onClick={e => this.handleDeleteConfirm(e.target.id)} className="notifications__item_btn notifications__item_btn--delete">Supprimer</div>
                    </div>
                </div>
            ))
        }
        if (loading) {
            return <div className="container">Loading...</div>;
        } else if(error) {
            return  <div className="alert alert-danger">{error.message}</div>
        } else if(!notifs) {
            return <span />
        }
        return (
            <div className="notifications">
                <div className="notifications__header">
                    <h1 className="notifications__header_title">
                        Notifications
                    </h1>
                </div>
                <div className="container">
                    <div className="row notifications__content">
                        {this.state.showModal ? modal : null}
                        {notifList}
                    </div>
                </div>
            </div>
        );
    }
}

export default NotificationList;