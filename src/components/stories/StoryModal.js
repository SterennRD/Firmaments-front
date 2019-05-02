import React, {Component} from 'react';

class StoryModal extends Component {
    render() {
        const {story} = this.props;
        return (
            <div>
                Modal
                {story.title}
            </div>
        );
    }
}

export default StoryModal;