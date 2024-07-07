# Salesforce OCR
The LWC OCR Component package is designed to provide seamless integration of Optical Character Recognition (OCR) functionality within Salesforce Lightning applications. By leveraging Tesseract.js, the package allows users to upload image or PDF files, process them to extract text, and display the recognized text in real-time. This functionality can be particularly useful in scenarios where automated text extraction from documents is required, such as processing invoices, receipts, or any form of printed or handwritten text.

## Overview
This project provides a set of Lightning Web Components (LWC) that perform Optical Character Recognition (OCR) on uploaded files. The components facilitate the upload of image or PDF files, process them using Tesseract.js via a Visualforce page, and display the extracted text.

## Features
- **File Upload**: Supports image and PDF file uploads.
- **OCR Processing**: Utilizes Tesseract.js for text extraction.
- **Real-time Text Display**: Displays the extracted text in real-time.

## Components
### ocrFileUpload
Handles file upload and initializes OCR processing.
- **HTML**: Provides the file input interface.
- **JavaScript**: Manages file selection, reads the file as a blob, and communicates with the Visualforce page to perform OCR.

### ocrTextListener
Listens for OCR results and displays the recognized text.
- **HTML**: Displays the extracted text within a Lightning card.
- **JavaScript**: Handles OCR results and updates the component state.

### ocrParentComponent
Acts as a container for `ocrFileUpload` and `ocrTextListener`.
- **HTML**: Arranges the upload and text display components side by side.
- **JavaScript**: Manages the event flow between the upload component and the text listener.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    ```
2. Deploy the components to your Salesforce org using a deployment tool like Salesforce CLI.

## Usage
1. **File Upload**: Navigate to the component in your Salesforce org, and use the file input to upload an image or PDF.
2. **OCR Processing**: The uploaded file is processed, and the extracted text is displayed in real-time.

## Configuration
- **TesseractVF.page**: Ensure the Visualforce page is correctly set up to load the Tesseract.js library and handle OCR processing.
- **Event Handling**: Customize event handling and logging as needed.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
