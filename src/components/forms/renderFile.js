import React, {Component} from 'react';

class renderFile extends Component {
    render() {
        const { input,dataAllowedFileExtensions } = this.props
        const onInputChange = (e) => {
            e.preventDefault();
            const files = [...e.target.files];
            input.onChange(files);
        };
        return (
            <div>
                <input type="file"
                       onChange={onInputChange}
                       data-allowed-file-extensions={dataAllowedFileExtensions}               />
            </div>
        )
    }
}

export default renderFile;

{/*import React, {Component} from 'react';

const handleChange = (handler) => ({target: {files}}) =>
    handler(files.length ? {file: files[0], name: files[0].name} : {});

export default ({
                    input: {onChange, onBlur, value: omitValue, ...inputProps},
                    meta: omitMeta,
                    ...props
                }) => (
    <input type="file"
           onChange={handleChange(onChange)} onBlur={handleChange(onBlur)}
           {...inputProps} {...props} />
);
*/}