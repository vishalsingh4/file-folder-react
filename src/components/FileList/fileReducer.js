import { getFolderNameFromFileName } from "../../utils";

const initialState = {
    currentFileItem: {},
    inputValue: ''
};

export const getDefaultInitialState = ({
    defaultCurrentFileItem = {}, 
    defaultInputValue = ''
}) => {
    return {
        ...initialState,
        currentFileItem: defaultCurrentFileItem,
        inputValue: defaultInputValue
    }
}

export const FILE_ACTIONS = {
    INPUT_CHANGE: 'INPUT_CHANGE',
    TOGGLE_ICON_CLICK: 'TOGGLE_ICON_CLICK',
    ADD_FILE: 'ADD_FILE',
    DBL_CLICK_FILE: 'DBL_CLICK_FILE'
};

export default function fileReducer(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch(type) {
        case FILE_ACTIONS.INPUT_CHANGE: {
            return {
                ...state,
                inputValue: payload
            }
        }
        case FILE_ACTIONS.TOGGLE_ICON_CLICK: {
            return {
                ...state,
                currentFileItem: {
                    ...state.currentFileItem,
                    isOpen: !state.currentFileItem.isOpen
                }
            }
        }
        case FILE_ACTIONS.ADD_FILE: {
            const hasFilesProperty = state.currentFileItem.hasOwnProperty('files');
            debugger;
                    if (hasFilesProperty) {
                        return {
                            ...state,
                            currentFileItem: {
                                ...state.currentFileItem,
                                files: [payload, ...state.currentFileItem.files]
                            }
                        }
          } else {
            return {
                ...state,
                currentFileItem: {
                    ...state.currentFileItem,
                    files: [payload]
                }
            }
          }
        }
        case FILE_ACTIONS.DBL_CLICK_FILE: {
            return {
                ...state,
                currentFileItem: {
                    ...state.currentFileItem,
                    name: getFolderNameFromFileName(payload),
                    isFolder: true
                }
            }
        }
        default:
            return state;
    }
};