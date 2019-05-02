import React, {Component} from 'react';

class StoryModal extends Component {
    render() {
        const {story} = this.props;
        return (
            <div>
                Modal
                {story.title}
                <button onClick={this.props.hideModal}>Cacher</button>
            </div>
        );
    }
}

export default StoryModal;