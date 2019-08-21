import IAnnotationAccessData from './../../interfaces/IAnnotationDataAccess'

export default class AnnotationAccessDataFake implements IAnnotationAccessData {

    _hasEntityAnnotations: boolean;
    _existsAnnotation: boolean;
    _lastGuid: string;
    _lastName: string;
    _lastContent: string;
    _lastType: string;

    constructor(hasEntityAnnotations: boolean) {
        this._hasEntityAnnotations = hasEntityAnnotations
    }


    async getAnnotationContent(id: string): Promise<string> {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(() => { return this._lastContent })
    }

    async deleteAnnotation(): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, 1000))
    }

    async entityHasAnnotations(): Promise<boolean> {
        return new Promise(resolve => setTimeout(resolve, 1000))
            .then(() => { return this._hasEntityAnnotations })
    }


    async existsAnnotation(guid: string): Promise<boolean> {
        return new Promise(resolve => setTimeout(resolve, 1000))
            .then(() => { return this._lastGuid == guid })
    }


    async uploadFile(name: string, type: string, content: string): Promise<string> {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(() => {
                const newGuid = this.uuidv4();
                this._lastGuid = newGuid
                this._lastContent = content
                this._lastName = name
                this._lastType = type
                return newGuid
            })
    };

    async getAnnotationInfo(): Promise<{ name: string, type: string }> {
        return new Promise(resolve => setTimeout(resolve, 1000))
            .then(() => {
                return { name: this._lastName, type: this._lastType }
            })
    };

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}