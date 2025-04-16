import { IFile } from "../interfaces";

export const doesFileObjExist = (files: IFile[], id: string) => {
    return files.some(file => file.id === id)
}