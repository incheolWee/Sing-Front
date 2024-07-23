import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import Background from '../../components/Background';

const PDFSignatureApp = () => {
    // PDF 파일 상태를 저장하기 위한 state
    const [pdfFile, setPdfFile] = useState(null);
    // PDF 페이지 수 상태를 저장하기 위한 state
    const [numPages, setNumPages] = useState(null);
    // 현재 페이지 번호 상태를 저장하기 위한 state
    const [pageNumber, setPageNumber] = useState(1);
    // 서명 캔버스와 PDF 캔버스에 대한 참조
    const canvasRef = useRef(null);
    const pdfCanvasRef = useRef(null);
    // 그리기 상태를 저장하기 위한 state
    const [isDrawing, setIsDrawing] = useState(false);
    // 캔버스의 2D 컨텍스트를 저장하기 위한 state
    const [context, setContext] = useState(null);
    // 클릭한 좌표를 저장하기 위한 state
    const [clickCoordinates, setClickCoordinates] = useState(null);
    // PDF의 좌표를 저장하기 위한 state
    const [pdfCoordinates, setPdfCoordinates] = useState({ x: 0, y: 0 });
    // PDF의 크기를 저장하기 위한 state
    const [pdfSize, setPdfSize] = useState({ width: 0, height: 0 });

    // pdf.js 스크립트를 동적으로 로드
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

    // 캔버스 컨텍스트 초기화
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

    // 파일 변경 핸들러
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

    // PDF를 로드하는 함수
    const loadPDF = (data) => {
        window.pdfjsLib.getDocument(data).promise.then(function (pdf) {
            setNumPages(pdf.numPages);
            renderPage(pdf, pageNumber);
        });
    };

    // 특정 페이지를 렌더링하는 함수
    const renderPage = (pdf, pageNum) => {
        pdf.getPage(pageNum).then(function (page) {
            const viewport = page.getViewport({ scale: 1 });
            const canvas = pdfCanvasRef.current;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            setPdfSize({ width: viewport.width, height: viewport.height });
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    };

    // 그리기 시작하는 함수
    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    // 그리기를 멈추는 함수
    const stopDrawing = () => {
        setIsDrawing(false);
        context.beginPath();
    };

    // 그리기 함수
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

    // 서명 지우기 함수
    const clearSignature = () => {
        const canvas = canvasRef.current;
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    // PDF에 서명 추가 함수
    const addSignatureToPDF = async (coordinates) => {
        if (!pdfFile || !canvasRef.current) return;

        const existingPdfBytes = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[pageNumber - 1];

        const pngImage = canvasRef.current.toDataURL();
        const pngImageBytes = await fetch(pngImage).then((res) => res.arrayBuffer());
        const embeddedImage = await pdfDoc.embedPng(pngImageBytes);

        const { x, y } = coordinates;
        const signatureWidth = 200;
        const signatureHeight = 100;
        firstPage.drawImage(embeddedImage, {
            x: x - signatureWidth / 2,
            y: y - signatureHeight / 2,
            width: signatureWidth,
            height: signatureHeight,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'signed_document.pdf';
        link.click();
    };

    // PDF 클릭 이벤트 핸들러
    const handlePDFClick = (event) => {
        const canvas = pdfCanvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) * (pdfSize.width / rect.width)).toFixed(1);
        const y = ((pdfSize.height - (event.clientY - rect.top) * (pdfSize.height / rect.height)).toFixed(1));

        setPdfCoordinates({ x, y });
        setClickCoordinates({ x: parseFloat(x), y: parseFloat(y) });
    };

    // 서명 추가 버튼 클릭 핸들러
    const handleAddSignatureClick = () => {
        if (clickCoordinates) {
            addSignatureToPDF(clickCoordinates);
        }
    };

    return (
        <Background>
            <div>
                <input type="file" onChange={onFileChange} accept="application/pdf" />
                <div style={{ position: 'relative', border: '1px solid black', display: 'inline-block', overflow: 'auto' }}>
                    <canvas
                        ref={pdfCanvasRef}
                        onClick={handlePDFClick}
                        style={{ border: '1px solid red', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, padding: '5px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '5px' }}>
                        PDF 좌표: (X: {pdfCoordinates.x}, Y: {pdfCoordinates.y})<br />
                        PDF 크기: (Width: {pdfSize.width}, Height: {pdfSize.height})
                    </div>
                </div>

                <p>
                    페이지 {pageNumber} / {numPages}
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
                <button onClick={clearSignature}>서명 지우기</button>
                <button onClick={handleAddSignatureClick}>PDF에 서명 추가</button>
            </div>
        </Background>
    );
};

export default PDFSignatureApp;
