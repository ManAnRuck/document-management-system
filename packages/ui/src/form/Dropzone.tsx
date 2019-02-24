import React from 'react';
import ReactDropzone from 'react-dropzone';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({ suppressClassNameWarning: true })`
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: dashed;
  border-width: 1px;
  border-color: lightgray;
  padding: 15px;
`;

interface Props {
  onDrop: (acceptedFiles: File[], rejectedFiles: File[]) => void;
}

class Dropzone extends React.Component<Props> {
  public render() {
    return (
      <ReactDropzone onDrop={this.props.onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <Wrapper {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop files here...</p>
              ) : (
                <p>
                  Try dropping some files here, or click to select files to
                  upload.
                </p>
              )}
            </Wrapper>
          );
        }}
      </ReactDropzone>
    );
  }
}

export { Dropzone };
