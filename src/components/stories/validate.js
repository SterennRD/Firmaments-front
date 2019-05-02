const validate = values => {
    const errors = {}
    if (!values.title || values.title.trim() === '') {
        errors.title = 'Entrez un titre';
    }
    if (!values.description || values.description.trim() === '') {
        errors.description = 'Entrez une description';
    }
    if (values.description && values.description.length > 350) {
        errors.description = 'trop long !';
    }
    if (!values.category || !values.category.length > 0) {
        errors.category = 'Choisissez une catégorie';
    }
    if (!values.titleChapter || values.titleChapter.trim() === '') {
        errors.titleChapter = 'Entrez un titre';
    }
    if (!values.content || values.content.trim() === '') {
        errors.content = 'Entrez un contenu';
    }
    return errors
}

export default validate