import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getFolderNameFromFileName } from '../../utils';

import './index.scss';
import Button from '../Button';
import Input from '../Input';

function FileList({
  fileItem = {},
}) {

  const [currentFileItem, setCurrentFileItem] = useState({});
  const [inputValue, setInputValue] = useState('');

  const {
    id,
    name,
    isOpen,
    files,
    isFolder
  } = currentFileItem;
  const isNodeModulesFolder = name === 'node_modules';


  const handleToggle = (e) => {
    e.preventDefault();
    const currentFileItemCpy = Object.assign({}, currentFileItem);

    if (currentFileItemCpy.id === id) {
      currentFileItemCpy['isOpen'] = !currentFileItemCpy['isOpen'];
    }

    setCurrentFileItem(currentFileItemCpy);
  };

  const handleAddFile = (e) => {
    if (e.key === 'Enter') {
      /** validations */

      const currentFileItemCpy = Object.assign({}, currentFileItem);
      const userInput = e.target.value;
      const hasEmptyFileName = !userInput;

      const hasExistingFileName = currentFileItemCpy['files']?.some(item => item.name === userInput);

      if (hasExistingFileName) {
        window?.alert('File name already exists.');
      }

      if (hasEmptyFileName) {
        window?.alert('Please enter a file name in the input box');
      }

      if (hasExistingFileName || hasEmptyFileName) {
        return false;
      }

      try {
        if (!currentFileItemCpy.id === id) {
          throw new Error('Id not found!');
        }

        if (currentFileItemCpy.id === id) {
          const newItem = {
            name: userInput,
            id: uuidv4(),
            isFolder: false
          }

          if (currentFileItemCpy.hasOwnProperty('files')) {
            currentFileItemCpy['files'].unshift(newItem);
          } else {
            currentFileItemCpy['files'] = [newItem];
          }
          setCurrentFileItem(currentFileItemCpy);
          setInputValue('');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDblClick = (e) => {
    const selectedTextName = e.target.dataset.fileName;
    const isFileName = selectedTextName?.includes('.');

    if (!isFileName) {
      return false;
    }

    const currentFileItemCpy = Object.assign({}, currentFileItem);

    try {
      if (!currentFileItemCpy.id === id) {
        throw new Error('Id not found!');
      }

      if (currentFileItemCpy.name === selectedTextName) {
        currentFileItemCpy.name = getFolderNameFromFileName(currentFileItemCpy.name) || currentFileItemCpy.name;
        currentFileItemCpy.isFolder = true;

        setCurrentFileItem(currentFileItemCpy);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setCurrentFileItem(fileItem);
  }, [fileItem]);

  return (
    <>
      <li key={id} className='file-item'>
        <Button
          name={name}
          onDoubleClick={handleDblClick}
          showIcon={isFolder && !isNodeModulesFolder}
          onToggleIconClick={handleToggle}
          showOpenIcon={isOpen}
        />
      </li>
      {isOpen && (
        <>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleAddFile}
            data-testid="input-box"
            className='file-input'
            placeholder='Please enter file name'
            autoFocus
            required
          />
          {
            files?.length > 0 && (
              <div className='nested-files'>
                {
                  files?.map(item => (
                    <Fragment key={uuidv4()}> <FileList fileItem={item} /></Fragment>
                  ))
                }
              </div>
            )
          }
        </>
      )}
    </>
  )
}

export default FileList;