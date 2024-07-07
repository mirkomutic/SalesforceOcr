import { LightningElement, api } from 'lwc';

export default class OcrTextListener extends LightningElement {
    recognizedText = '';
    hasText = false;

    @api
    handleOcrResult(ocrText) {
        console.log('OCR Text Listener received text:', ocrText);
        this.recognizedText = ocrText;
        this.hasText = true;
        console.log('OCR Text Listener received text:', ocrText);
    }
}