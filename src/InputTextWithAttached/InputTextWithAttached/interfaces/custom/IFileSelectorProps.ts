export interface IFileSelectorProps {
    selectedFile(name: string, type: string, content: string): void
}