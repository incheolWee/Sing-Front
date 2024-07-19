import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import styled from 'styled-components';
import Background from "../../components/Background";
import { useNavigate } from 'react-router-dom';
import { FaSave, FaEraser } from 'react-icons/fa'; // 아이콘 추가

const StyledContainer = styled.div`
  text-align: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; // 버튼 사이 간격 조절
`; 


const StyledButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #46aae0;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #0d7ec0;
  }
  svg {
    margin-right: 8px;
  }
`;
const StyledSignatureCanvas = styled(SignatureCanvas)`
  border: 2px dashed #4CAF50; // 테두리 색상 설정
  background-color: #f0f0f0;
`;

const MainArea = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FileList = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const FileName = styled.div`
  font-weight: bold;
  color: #333;
`;

const FileDetails = styled.div`
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #666;
`;

const FileOwner = styled.div``;

const FileDate = styled.div``;

const FileSize = styled.div``;

const SignPage = () => {
  const sigCanvas = useRef({});
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);

  const createPdf = async () => {
    const signatureDataUrl = trimmedDataURL;

    if (!signatureDataUrl) {
      alert('Please provide a signature first.');
      return;
    }

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Add a blank page
    const page = pdfDoc.addPage([600, 400]);

    // Draw some text on the page
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText('This is a signed document.', {
      x: 50,
      y: 350,
      size: 24,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Add the signature image
    const pngImageBytes = await fetch(signatureDataUrl).then(res => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    const pngDims = pngImage.scale(0.5);

    page.drawImage(pngImage, {
      x: 50,
      y: 50,
      width: pngDims.width,
      height: pngDims.height,
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Convert the bytes to a Blob and create a URL
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Create an anchor element and trigger a download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signed_document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setTrimmedDataURL(null);
  };

  const trimSignature = () => {
    const canvas = sigCanvas.current.getTrimmedCanvas();
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Iterate over all pixels and make white pixels transparent
    for (let i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 255 && imgData.data[i + 1] === 255 && imgData.data[i + 2] === 255) {
        imgData.data[i + 3] = 0;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    setTrimmedDataURL(canvas.toDataURL('image/png'));
  };

  return (
    <Background>
      <MainArea>
        <StyledSignatureCanvas
          ref={sigCanvas}
          penColor='black'
          canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        />
         <StyledButtonContainer>
          <StyledButton onClick={trimSignature}>
            <FaSave />
            저장
          </StyledButton>
          <StyledButton onClick={clearSignature}>
            <FaEraser />
            지우개
          </StyledButton>
          <StyledButton onClick={createPdf}>
            <FaSave />
            PDF 생성
          </StyledButton>
        </StyledButtonContainer>
        {trimmedDataURL ? (
          <img src={trimmedDataURL} alt='Trimmed signature' style={{ border: '1px solid black', marginTop: '10px' }} />
        ) : null}
        <FileList>
          <FileItem>
            <FileName>Document 1</FileName>
            <FileDetails>
              <FileOwner>Owner</FileOwner>
              <FileDate>Date</FileDate>
              <FileSize>Size</FileSize>
            </FileDetails>
          </FileItem>
          <FileItem>
            <FileName>Document 2</FileName>
            <FileDetails>
              <FileOwner>Owner</FileOwner>
              <FileDate>Date</FileDate>
              <FileSize>Size</FileSize>
            </FileDetails>
          </FileItem>
        </FileList>
      </MainArea>
    </Background>
  );
};

export default SignPage;
