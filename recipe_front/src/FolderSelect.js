import React, { Component } from 'react';

class FolderSelector extends Component {
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
                    id="folderInput"
                    accept=".pdf"
                    multiple // Allow selecting multiple files
                    directory=""
                    webkitdirectory="" // Enable directory selection
                    onChange={this.handleFilesChosen}
                    ref={this.fileInputRef}
                    style={{ display: 'none' }}
                />
                <button onClick={this.handleFileSelect}>Select File or Directory</button>
            </div>
        );
    }
}

export default FolderSelector;