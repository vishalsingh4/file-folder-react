import React, { Fragment } from 'react'
import { v4 as uuidv4 } from 'uuid';

import FileList from '../FileList';

import useFileDataTransformer from '../../hooks/useDataTransformer';

import './index.scss';

export default function File() {
    const [fileDataList, _] = useFileDataTransformer();

    if (!fileDataList.length) {
        return null;
    }

    return (
        <div className='layout-row justify-content-between file-container'>
            <ul data-testid="files" className='file-container__list'>
                {
                    fileDataList.map((fileItem) => (
                        <Fragment key={uuidv4()}>
                            <FileList fileItem={fileItem} />
                        </Fragment>
                    ))
                }
            </ul>
        </div>
    )
};