import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import Background from '../../components/Background';
import Header from "../../components/Header";
import Sidebar from '../../components/SideBar';


const PDFSignatureApp = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const canvasRef = useRef(null);
    const pdfCanvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'black';
            setContext(ctx);
        }
    }, []);

    const onFileChange = (event) => {
        const file = event.target.files[0];
        setPdfFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const typedarray = new Uint8Array(event.target.result);
                loadPDF(typedarray);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const loadPDF = (data) => {
        window.pdfjsLib.getDocument(data).promise.then(function (pdf) {
            setNumPages(pdf.numPages);
            renderPage(pdf, pageNumber);
        });
    };

    const renderPage = (pdf, pageNum) => {
        pdf.getPage(pageNum).then(function (page) {
            const scale = 1.5;
            const viewport = page.getViewport({ scale: scale });
            const canvas = pdfCanvasRef.current;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    };

    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        context.beginPath();
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const addSignatureToPDF = async () => {
        if (!pdfFile || !canvasRef.current) return;

        const existingPdfBytes = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const pngImage = canvasRef.current.toDataURL();
        const pngImageBytes = await fetch(pngImage).then((res) => res.arrayBuffer());
        const embeddedImage = await pdfDoc.embedPng(pngImageBytes);

        const { width, height } = firstPage.getSize();
        firstPage.drawImage(embeddedImage, {
            x: 50,
            y: height / 2,
            width: 200,
            height: 100,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'signed_document.pdf';
        link.click();
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} accept="application/pdf" />
            <canvas ref={pdfCanvasRef} />
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <canvas
                ref={canvasRef}
                width={500}
                height={200}
                style={{ border: '1px solid black' }}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseOut={stopDrawing}
            />
            <br />
            <button onClick={clearSignature}>Clear Signature</button>
            <button onClick={addSignatureToPDF}>Add Signature to PDF</button>
        </div>

    );
};

export default PDFSignatureApp;