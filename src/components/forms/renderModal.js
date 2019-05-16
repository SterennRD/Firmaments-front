import React, { Component } from 'react';
import PropTypes from 'prop-types';

const renderModal = ({ title, explanation, yesButton, noButton, yesCallback, noCallback, id }) => (

    <div className="modal__overlay">
        <div className="modal__overlay_close modal__overlay--close" onClick={() => noCallback()}/>
        <div className="modal__window">
            <div className="modal__close" onClick={() => noCallback()}><i className="fas fa-times"></i></div>
            <h2 className="modal__title">{title}</h2>
            <p className="modal__text">{explanation}</p>
            <div className="modal__buttons">
                <button className="modal__buttons_btn modal__buttons_btn--confirm" onClick={() => yesCallback(id)}>{yesButton}</button>
                <button className="modal__buttons_btn" onClick={() => noCallback()}>{noButton}</button>
            </div>
        </div>
    </div>
);
renderModal.propTypes = {
    yesCallback: PropTypes.func,
    noCallback: PropTypes.func
};
export default renderModal;