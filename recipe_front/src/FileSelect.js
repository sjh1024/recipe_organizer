import React, { Component } from 'react';

class FileSelector extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
    }

    handleFileSelect = () => {
        this.fileInputRef.current.click();
    };

    handleFilesChosen = (event) => {
        const selectedFiles = event.target.files;
        // Handle the selected files here
        console.log('Selected files:', selectedFiles);
    };

    render() {
        return (
            <div>
                <input
                    type="file"
                    id="fileInput"
                    accept=".pdf"
                    onChange={this.handleFilesChosen}
                    ref={this.fileInputRef}
                    style={{ display: 'none' }}
                />
                <button onClick={this.handleFileSelect}>Select File</button>
            </div>
        );
    }
}

export default FileSelector;