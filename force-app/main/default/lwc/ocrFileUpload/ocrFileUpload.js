import { LightningElement } from 'lwc';

export default class OcrFileUpload extends LightningElement {
    loaded = false;
    iframe = null;

    connectedCallback() {
        console.log('LWC connectedCallback invoked.');
        window.addEventListener('message', this.handleVFResponse.bind(this));
        this.loaded = true;
        console.log('LWC initialized, loaded set to true.');
    }

    disconnectedCallback() {
        console.log('LWC disconnectedCallback invoked.');
        window.removeEventListener('message', this.handleVFResponse.bind(this));
    }

    renderedCallback() {
        if (!this.iframe) {
            this.iframe = this.template.querySelector('iframe');
            console.log('Iframe set in renderedCallback.');
            console.log('Iframe src:', this.iframe.src);
        }
    }

    handleFilesChange(event) {
        console.log('File input changed.');
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', file);
            this.readFileAsBlob(file);
        } else {
            console.log('No file selected.');
        }
    }

    readFileAsBlob(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const blob = new Blob([reader.result], { type: file.type });
            console.log('File read complete, blob obtained.');
            this.performOCR(blob);
        };
        reader.readAsArrayBuffer(file);
        console.log('File reading started.');
    }

    convertPdfToPng(file){
        
    }

    performOCR(blob) {
        const vfCallback = 'vfCallback' + Date.now();
        console.log('Performing OCR, sending message to VF page with callback:', vfCallback);

        // Hardcoded VF origin
        const vfOrigin = this.getVFOrigin();

        this.iframe.contentWindow.postMessage({ type: 'PERFORM_OCR', blob, callbackName: vfCallback }, vfOrigin);
        console.log('Message sent to VF page with target origin:', vfOrigin);
    }

    handleVFResponse(event) {
        const vfOrigin = this.getVFOrigin();
        const allowedOrigins = [vfOrigin, window.location.origin];

        if (!allowedOrigins.includes(event.origin)) {
            return;
        }

        if (event.source !== this.iframe.contentWindow) {
            return;
        }

        console.log('Message received:', event.data);

        if (event.data && event.data.type === 'OCR_RESULT' && event.data.callbackName && event.data.text) {
            console.log('Message received from VF page:', event.data);
            const { callbackName, text } = event.data;
            console.log('OCR Result received:', text);
            this.handleOcrResult(text);
        } else {
            console.log('Message from VF page missing expected data or type.', event.data);
        }
    }

    handleOcrResult(ocrText) {
        console.log('Handling OCR result, extracted text:', ocrText);
        // Dispatch custom event with the OCR result
        const ocrEvent = new CustomEvent('ocrresult', {
            detail: { ocrText }
        });
        this.dispatchEvent(ocrEvent);
        console.log('Custom event dispatched with OCR result.');
    }

    getVFOrigin() {
        const { protocol, hostname } = window.location;
        let instanceName = hostname.split('.')[0];
    
        // Check for sandbox or developer org
        if (hostname.includes('develop')) {
            instanceName += '--c.develop';
        } else {
            instanceName += '--c';
        }
    
        return `${protocol}//${instanceName}.vf.force.com`;
    }    
}