import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../interfaces';

interface IClickedFile {
    activeTabId: string | null;
    filename: string;
    fileContent: string | undefined;
}

interface IInitialState {
    openedFiles: IFile[];
    clickedFile: IClickedFile;
    tapIdToRemove: string | null;
}

const initialState: IInitialState = {
    openedFiles: [],
    clickedFile: {
        activeTabId: null,
        filename: "",
        fileContent: "",
    },
    tapIdToRemove: null,
}

export const fileTreeSlice = createSlice({
    name: "fileTree",
    initialState,
    reducers: {
       setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
             state.openedFiles = action.payload;
       },
       setClikedFile: (state, action: PayloadAction<IClickedFile>) => {
            state.clickedFile = action.payload;
       },
       setTapIdToRemove: (state, action: PayloadAction<string | null>) => {
           state.tapIdToRemove = action.payload;
       },
    }
})

export const { setOpenedFiles, setClikedFile, setTapIdToRemove } = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
