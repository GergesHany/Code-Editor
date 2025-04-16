import { createSlice } from '@reduxjs/toolkit';
import { IFile } from '../../interfaces';

interface IClickedFile {
    filename: string;
    fileContent: string;
}

interface IInitialState {
    openedFiles: IFile[];
    clickedFile: IClickedFile;
}

const initialState: IInitialState = {
    openedFiles: [],
    clickedFile: {
        filename: "",
        fileContent: "",
    }
}

export const fileTreeSlice = createSlice({
    name: "fileTree",
    initialState,
    reducers: {

    }
})

export default fileTreeSlice.reducer;
