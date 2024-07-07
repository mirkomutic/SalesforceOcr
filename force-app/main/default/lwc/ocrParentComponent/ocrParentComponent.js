import { LightningElement } from 'lwc';

export default class OcrParentComponent extends LightningElement {
    handleOcrResult(event) {
        const ocrText = event.detail.ocrText;
        console.log('Parent component received OCR text:', ocrText);
        this.template.querySelector('c-ocr-text-listener').handleOcrResult(ocrText);
    }
}