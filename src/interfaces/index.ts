export interface IFile {
  name: string;
  isFolder: boolean;
  children?: IFile[];
  content?: string;
}