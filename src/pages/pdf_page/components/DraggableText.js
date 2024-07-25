// DraggableText.js
import Draggable from "react-draggable";
import { FaCheck, FaTimes } from "react-icons/fa";
import { cleanBorder, errorColor, goodColor, primary45 } from "../utils/colors";
import { useState, useEffect, useRef } from "react";

export default function DraggableText({ onEnd, onSet, onCancel, initialText }) {
    const [text, setText] = useState("Text");
    const inputRef = useRef(null);

    useEffect(() => {
        if (initialText) {
            setText(initialText);
        } else {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [initialText]);

    const styles = {
        container: {
            position: "absolute",
            zIndex: 100000,
            border: `2px solid ${primary45}`,
        },
        controls: {
            position: "absolute",
            right: 0,
            display: "inline-block",
            backgroundColor: primary45,
        },
        smallButton: {
            display: "inline-block",
            cursor: "pointer",
            padding: 4,
        },
        input: {
            border: 0,
            fontSize: 20,
            padding: 3,
            backgroundColor: 'rgba(0,0,0,0)',
            cursor: 'move',
        }
    };

    return (
        <Draggable onStop={onEnd}>
            <div style={styles.container}>
                <div style={styles.controls}>
                    {/* 텍스트를 설정하는 버튼 */}
                    <div style={styles.smallButton} onClick={() => onSet(text)}>
                        <FaCheck color={goodColor} />
                    </div>
                    {/* 텍스트 입력을 취소하는 버튼 */}
                    <div style={styles.smallButton} onClick={onCancel}>
                        <FaTimes color={errorColor} />
                    </div>
                </div>
                {/* 드래그할 수 있는 텍스트 입력 필드 */}
                <input
                    ref={inputRef}
                    style={styles.input}
                    value={text}
                    placeholder={'Text'}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
        </Draggable>
    );
}