import React, { Fragment, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import FileList from '../FileList';

import { INITIAL_DATA } from '../../constants';
import { setIsFileOrFolder, setUniqueIdInFileData } from '../../utils';
import useFileDataTransformer from '../../hooks/useDataTransformer';

import './index.scss';

export default function File() {
    const [fileDataList, _transformFileDataList] = useFileDataTransformer();
    // const [fileDataList, setFileDataList] = useState([]);


    // useEffect(() => {
    //     const listWithIds = setUniqueIdInFileData(INITIAL_DATA);
    //     const listWithIsFileOrFolder = setIsFileOrFolder(listWithIds);

    //     setFileDataList(listWithIsFileOrFolder);
    // }, []);

    if (!fileDataList.length) {
        return null;
    }

    return (
        <div className='layout-row justify-content-between file-container'>
            <ul data-testid="files" className='file-container__list'>
                {
                    fileDataList.map((fileItem) => <Fragment key={uuidv4()}><FileList fileItem={fileItem} /></Fragment>)
                }
            </ul>
        </div>
    )
};