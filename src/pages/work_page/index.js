import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../../components/Header';


const WorkPage = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [signatures, setSignatures] = useState([]);
    const [selectedSignature, setSelectedSignature] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [placedSignatures, setPlacedSignatures] = useState([]);
    const [draggedSignatureIndex, setDraggedSignatureIndex] = useState(null);
    const documentRef = useRef(null);

    const documentImage = '/document.png';
    const editIcon = '/edit-icon.png';

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/images")
            .then(response => {
                setSignatures(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the images!", error);
            });
    }, []);

    const handleMouseDown = (signature, e, index = null) => {
        e.preventDefault();
        setSelectedSignature(signature);
        setDragging(true);
        setDraggedSignatureIndex(index);
    };

    const handleMouseMove = (e) => {
        if (dragging && selectedSignature) {
            const documentRect = documentRef.current.getBoundingClientRect();
            const newPosition = {
                x: e.clientX - documentRect.left - 40,
                y: e.clientY - documentRect.top - 60
            };
            if (draggedSignatureIndex !== null) {
                const updatedSignatures = [...placedSignatures];
                updatedSignatures[draggedSignatureIndex].position = newPosition;
                setPlacedSignatures(updatedSignatures);
            } else {
                const newSignature = {
                    ...selectedSignature,
                    position: newPosition
                };
                setPlacedSignatures([...placedSignatures, newSignature]);
                setDraggedSignatureIndex(placedSignatures.length); // Set index for dragging
            }
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        setSelectedSignature(null);
        setDraggedSignatureIndex(null);
    };

    return (
        <WorkPageContainer onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <WorkPageContent>
                <Document ref={documentRef}>
                    <img src={documentImage} alt='Document' />
                    {placedSignatures.map((sig, index) => (
                        <img
                            key={index}
                            src={sig.url}
                            alt={sig.description}
                            style={{ position: 'absolute', left: sig.position.x, top: sig.position.y, cursor: 'pointer' }}
                            onMouseDown={(e) => handleMouseDown(sig, e, index)}
                        />
                    ))}
                </Document>
                {isExpanded && (
                    <SignBar>
                        <Button>파일 저장하기</Button>
                        <Signatures>
                            {signatures.map(signature => (
                                <img
                                    key={signature.id}
                                    src={signature.url}
                                    alt={signature.description}
                                    onMouseDown={(e) => handleMouseDown(signature, e)}
                                />
                            ))}
                        </Signatures>
                        <Button>확인</Button>
                    </SignBar>
                )}
            </WorkPageContent>
            <ExpandButton onClick={toggleExpand}>
                <img src={editIcon} alt="Edit" />
            </ExpandButton>
        </WorkPageContainer>
    );
};

const WorkPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    /* position: relative; */
`;

const WorkPageContent = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
`;

const Document = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    overflow: auto;
    background-color: #f5f5f5;
    img {
        max-width: 50%;
        height: auto;
    }
`;

const SignBar = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #4285f4;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px 0;
    &:hover {
        background-color: #357ae8;
    }
`;

const Signatures = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
    img {
        width: 80px;
        height: 80px;
        margin: 10px 0;
        cursor: pointer;
        object-fit: contain;
    }
`;

const ExpandButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #4285f4;
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 24px;
        height: 24px;
    }
`;

export default WorkPage;
