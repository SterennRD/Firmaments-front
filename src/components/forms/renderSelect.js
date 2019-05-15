import React, { Component, PropTypes } from 'react';
import { change as changeFieldValue } from 'redux-form'
import {category} from "../stories/constants";
import Select from 'react-select'
const renderSelect = ({ input, label, type, meta: { touched, error, invalid, warning }, options, multiple, selected, value }) => {
    const renderSelectOptions = (option) => (
        <option key={option.id} value={option.id}>{option.label}</option>
    )
    let newValue = input.value.id;

    /*let category = [
        {value: 1, label: 'Action'},
        {value: 2, label: 'Autobiographie'},
        {value: 3, label: 'Aventure'},
        {value: 4, label: 'Chick lit'},
        {value: 5, label: 'Dystopie'},
        {value: 6, label: 'Erotique'},
        {value: 7, label: 'Fantastique'},
        {value: 8, label: 'Fantasy'},
        {value: 9, label: 'Horreur'},
        {value: 10, label: 'Humour'},
        {value: 11, label: 'Inclassable'},
        {value: 12, label: 'Jeunesse'},
        {value: 13, label: 'Mystère'},
        {value: 14, label: 'Poésie'},
        {value: 15, label: 'Polar'},
        {value: 16, label: 'Romance'},
        {value: 17, label: 'Science-fiction'},
        {value: 18, label: 'Supernaturel'},
        {value: 19, label: 'Thriller'},
        {value: 20, label: 'Tragédie'},
        {value: 21, label: 'Young adult'}
    ];*/
    let categories = options.map(e => ({
        label: e.label,
        value: e.value
    }));

    if (input.value.length >= 3) {
        categories = []
    }
    const noOptionsMessage = () => {
        return "Vous ne pouvez pas choisir plus de 3 catégories"
    }
    //const defaulte = input.value;
    /*let selectedCategory = [];
    if (selected) {
        selectedCategory = categories.filter( el => {
            return input.value.some( f => {
                return f.id === el.value
            });
        })
    }*/
    if (multiple) {
        return (
            <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
                <label htmlFor={input.name} className="storyForm__form_label">{label}</label>

                <Select
                    {...input}
                    isMulti
                    onChange={(value) => {
                        input.onChange(value)
                    }}
                    value={input.value}
                    onBlur={() => input.onBlur(input.value)}
                    noOptionsMessage={noOptionsMessage}
                    name={input.name}
                    options={categories}
                    className={`basic-multi-select form-control ${touched && invalid ? 'is-invalid' : ''}`}
                    classNamePrefix="select"
                    placeholder="Choisissez une catégorie..."
                />
                <div className="invalid-feedback">
                    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </div>
            </div>

        )
    }
    else {
        if (newValue) input.value = newValue;
        return (
                <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
                    <label htmlFor={input.name} className="storyForm__form_label">{label} </label>

                    <select className="form-control" id={input.name} {...input} onBlur={() => input.onBlur(input.value)}>
                        {options.map(renderSelectOptions)}
                    </select>
                    <div className="invalid-feedback">
                        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                    </div>
                </div>
            )
    }
}

export default renderSelect;