import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/modal.scss';

const renderModal = ({ title, explanation, yesButton, noButton, yesCallback, noCallback, id }) => (

    <div className="modal__overlay" onClick={() => noCallback()}>
        <div className="modal__window">
            <h2>{title}</h2>
            <p>{explanation}</p>
            <button onClick={() => yesCallback(id)}>{yesButton}</button>
            <button onClick={() => noCallback()}>{noButton}</button>
        </div>
    </div>
);
renderModal.propTypes = {
    yesCallback: PropTypes.func,
    noCallback: PropTypes.func
};
export default renderModal;