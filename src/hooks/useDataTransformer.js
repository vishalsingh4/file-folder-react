import { useEffect, useState } from 'react';

import { fileDataTransformer } from '../utils';
import { INITIAL_DATA } from '../constants';

export default function useFileDataTransformer(fileData = []) {
    const [fileDataList, setFileDataList] = useState(fileData);

    const transformFileDataList = (fileDataList = []) => {
        const transformedFileDataList = fileDataTransformer(fileDataList);
        setFileDataList(transformedFileDataList);
    }

    useEffect(() => {
        transformFileDataList(INITIAL_DATA);
    }, []);

    return [fileDataList, transformFileDataList];
};
