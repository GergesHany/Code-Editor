export interface IFile {
  id: string;
  name: string;
  isFolder: boolean;
  children?: IFile[];
  content?: string;
}