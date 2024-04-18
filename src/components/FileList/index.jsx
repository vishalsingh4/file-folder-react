import React, { Fragment, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '../Button';
import Input from '../Input';

import { isValidFileName, validateFileInput } from '../../utils';
import fileReducer, { getDefaultInitialState, FILE_ACTIONS } from './fileReducer';

import './index.scss';

function FileList({
  fileItem = {},
}) {
  const [state, dispatch] = useReducer(fileReducer, getDefaultInitialState({
    defaultCurrentFileItem: fileItem
  }));

  const {
    currentFileItem,
    inputValue
  } = state;

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

    dispatch({
      type: FILE_ACTIONS.TOGGLE_ICON_CLICK
    })
  };

  const handleAddFile = (e) => {
    const enterBtnPressed = (e.key === 'Enter' || e.keyCode === 13);

    if (enterBtnPressed) {
      const userInput = e.target.value;
      const isValid = validateFileInput(currentFileItem, userInput);

      if (!isValid) {
        return false;
      }

      const newItem = {
        name: userInput,
        id: uuidv4(),
        isFolder: false
      }

      dispatch({
        type: FILE_ACTIONS.ADD_FILE,
        payload: newItem
      })

      dispatch({
        type: FILE_ACTIONS.INPUT_CHANGE,
        payload: ''
      })
    }
  };

  const handleDblClick = (e) => {
    const selectedTextName = e.target.dataset.fileName;
    const isFileName = isValidFileName(selectedTextName);

    if (!isFileName) {
      return false;
    }

    dispatch({
      type: FILE_ACTIONS.DBL_CLICK_FILE,
      payload: selectedTextName
    })
  };

  return (
    <>
      <li key={id} className='file-item'>
        <Button
          name={name}
          onDblClick={handleDblClick}
          showIcon={isFolder && !isNodeModulesFolder}
          onToggleIconClick={handleToggle}
          showOpenIcon={isOpen}
        />
      </li>
      {isOpen && (
        <>
          <Input
            value={inputValue}
            onChange={e => {
              dispatch({
                type: FILE_ACTIONS.INPUT_CHANGE,
                payload: e.target.value
              })
            }
            }
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