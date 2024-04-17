import { v4 as uuidv4 } from 'uuid';

export const isValidFileName = (fileName = '') => fileName?.includes('.');

export const fileDataTransformer = (fileData = []) => {
    fileData?.length > 0 && fileData?.map(item => {
        const { name = ''} = item;
        const isFolder = !isValidFileName(name);
        
        item['isFolder'] = isFolder;
        item['id'] = uuidv4();

        if(item.hasOwnProperty('files') && item.files?.length > 0) {
            fileDataTransformer(item.files);
        }

        return item;
    })

    return fileData; 
}

export const getFolderNameFromFileName = (fileName = '') => {
    const isDotGitIgnoreFileType = !fileName.indexOf('.');
    let folderName = '';

    if(isDotGitIgnoreFileType) {
        const [_, name] = fileName.split('.');
        folderName = name;
    } else {
        const [name, _] = fileName.split('.');
        folderName = name;
    }

    return folderName || fileName;
};

export const validateFileInput = (currentFileItem = {}, userInput = '') => {
    let isValid = true;

          const currentFileItemCpy = Object.assign({}, currentFileItem);
          const hasEmptyFileName = !userInput;
    
          const hasExistingFileName = currentFileItemCpy['files']?.some(item => item.name === userInput);
    
          if (hasExistingFileName) {
            window?.alert('File name already exists.');
          }
    
          if (hasEmptyFileName) {
            window?.alert('Please enter a file name in the input box');
          }
    
          if (hasExistingFileName || hasEmptyFileName) {
            isValid = false;
          }

          return isValid;
};