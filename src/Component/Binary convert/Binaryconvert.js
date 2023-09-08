import React from "react";
// import { PDFDocument } from "pdf-lib";
export const convertTobinary = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
      const binaryData = new Uint8Array(fileReader.result);
      resolve(binaryData);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const convertfromBinary = (binaryData, format) => {
  //   const pdfDoc = await PDFDocument.create();
  //   // Add a new page to the PDF document
  //   const page = pdfDoc.addPage();
  //   // Embed the binary data into an image
  //   const image = await pdfDoc.embedPng(binaryData);
  //   // Draw the image onto the PDF document
  //   const { width, height } = image.scale(0.5);
  //   page.drawImage(image, {
  //     x: page.getWidth() / 2 - width / 2,
  //     y: page.getHeight() / 2 - height / 2,
  //     width,
  //     height,
  //   });
  //   // Serialize the PDF document to binary data
  //   const pdfBytes = await pdfDoc.save();
  //   console.log(binaryData);
  //   console.log(format);
  //   const blob = new Blob([binaryData], { type: format });
  //   const dataURL = URL.createObjectURL(blob);
  //   return dataURL;
  //   const base64Data = btoa(String.fromCharCode(...binaryData));
  //   console.log(base64Data);
};

export const downloadFile = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const imagetoBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}
    