import React, { Component, PropTypes } from 'react';
// ES module
import Editor from 'react-medium-editor';
// load theme styles with webpack


const renderWysiwyg = ({ input, label, placeholder, type, meta: { touched, error, invalid, warning } }) => {

    const handleChange = (e) => {
        console.log(input);
        console.log(e.target);
    };
    return ( <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <label className="control-label">{label}</label>

            <Editor
                {...input} placeholder={placeholder}
                onBlur={console.log("blur")}
            />
            <div className="help-block">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>

    </div>
    )
}

export default renderWysiwyg;