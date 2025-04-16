import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../interfaces';

interface IClickedFile {
    filename: string;
    fileContent: string | undefined;
}

interface IInitialState {
    openedFiles: IFile[];
    clickedFile: IClickedFile;
    activeTabId: string | null;
}

const initialState: IInitialState = {
    openedFiles: [],
    clickedFile: {
        filename: "",
        fileContent: "",
    },
    activeTabId: null,
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
       setActiveTabId: (state, action: PayloadAction<string>) => {
            state.activeTabId = action.payload;
       },
    }
})

export const { setOpenedFiles, setClikedFile, setActiveTabId } = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
