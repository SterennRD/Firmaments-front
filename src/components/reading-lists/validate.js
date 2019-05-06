const validate = values => {
    const errors = {}
    if (!values.title || values.title.trim() === '') {
        errors.title = 'Entrez un titre';
    }
    return errors
}

export default validate