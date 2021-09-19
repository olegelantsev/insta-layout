import React, { useState, useCallback} from "react";
import './App.css';
import './devices.min.css';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from './Photo';
import Gallery from 'react-photo-gallery';
import {arrayMoveImmutable} from 'array-move';
import {useDropzone} from 'react-dropzone'

const photos = [
  {
    src: '',
    width: 1,
    height: 1
  }
];

const SortablePhoto = SortableElement(item => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
<Gallery photos={items} columns={3} direction="column" renderImage={props => <SortablePhoto {...props} />} />
));

function App() {

  const [items, setItems] = useState(photos);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      items.push({
        src: url,
        width: 1,
        height: 1
      })
      setItems(items);
    });
    
    console.log(acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="App" {...getRootProps()}>
      <header>
					
      <div class="marvel-device iphone-x">
          <div class="notch">
              <div class="camera"></div>
              <div class="speaker"></div>
          </div>
          <div class="top-bar"></div>
          <div class="sleep"></div>
          <div class="bottom-bar"></div>
          <div class="volume"></div>
          <div class="overflow">
              <div class="shadow shadow--tr"></div>
              <div class="shadow shadow--tl"></div>
              <div class="shadow shadow--br"></div>
              <div class="shadow shadow--bl"></div>
          </div>
          <div class="inner-shadow"></div>
          <div class="screen" >
            {isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>}
            <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
          </div>
      </div>
      </header>
    </div>
  );
}

export default App;
