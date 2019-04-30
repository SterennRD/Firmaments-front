import React, { Component, PropTypes } from 'react';
// ES module
import Editor from 'react-medium-editor';
// load theme styles with webpack


const renderWysiwyg = ({ input, label, placeholder, type, meta: { touched, error, invalid, warning } }) => {

    const placeHolder = input.value !== "" ? false : { text: placeholder };

    return ( <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <label className="control-label">{label}</label>

            <Editor
                {...input}
                onBlur={null}
                text={input.value}
                options={{ placeholder: placeHolder,
                    toolbar: {
                    buttons: [
                        'bold',
                        'italic',
                        'underline',
                        {
                            name: 'h2',
                            action: 'append-h3',
                            aria: 'header type 2',
                            tagNames: ['h3'],
                            contentDefault: '<b>H2</b>',
                            classList: ['custom-class-h2'],
                            attrs: {
                                'data-custom-attr': 'attr-value-h2'
                            }
                        },
                        {
                            name: 'justifyCenter',
                            action: 'justifyCenter',
                            aria: 'justifyCenter',
                            contentDefault: 'dspfd'
                        },
                    ] } }}
            />
            <div className="help-block">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>

    </div>
    )
}

export default renderWysiwyg;