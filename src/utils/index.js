import { v4 as uuidv4 } from 'uuid';

export const setUniqueIdInFileData = (fileData = []) => {
    fileData?.length > 0 && fileData?.map(item => {
        item['id'] = uuidv4();

        if(item.hasOwnProperty('files') && item.files?.length > 0) {
            setUniqueIdInFileData(item.files);
        }

        return item;
    })

    return fileData;
}

export const setIsFileOrFolder = (fileData = []) => {
    fileData?.length > 0 && fileData?.map(item => {
        const { name = ''} = item;
        const isFolder = !name.includes('.')

        item['isFolder'] = isFolder;

        if(item.hasOwnProperty('files') && item.files?.length > 0) {
            setIsFileOrFolder(item.files);
        }

        return item;
    })

    return fileData;
}

export const fileDataTransformer = (fileData = []) => {
    fileData?.length > 0 && fileData?.map(item => {
        const { name = ''} = item;
        const isFolder = !name.includes('.')
        
        item['isFolder'] = isFolder;
        item['id'] = uuidv4();

        if(item.hasOwnProperty('files') && item.files?.length > 0) {
            setIsFileOrFolder(item.files);
            setUniqueIdInFileData(item.files);
        }

        return item;
    })

    return fileData; 
}

export const getFolderNameFromFileName = (fileName = '') => {
    const isDotGitIgnoreFileType = !fileName.indexOf('.');
    let folderName = '';

    if(isDotGitIgnoreFileType) {
        const [_ext, name] = fileName.split('.');
        folderName = name;
    } else {
        const [name, _ext] = fileName.split('.');
        folderName = name;
    }

    return folderName;
};