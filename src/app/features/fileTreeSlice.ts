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
}

const initialState: IInitialState = {
    openedFiles: [],
    clickedFile: {
        activeTabId: null,
        filename: "",
        fileContent: "",
    },
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
    }
})

export const { setOpenedFiles, setClikedFile } = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
