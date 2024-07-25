// DraggableSignature.js
import Draggable from "react-draggable";
import { BigButton } from "./BigButton";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { cleanBorder, errorColor, goodColor, primary45 } from "../utils/colors";

export default function DraggableSignature({ url, onEnd, onSet, onCancel }) {
    const styles = {
        container: {
            position: 'absolute',
            zIndex: 100000,
            border: `2px solid ${primary45}`,
        },
        controls: {
            position: 'absolute',
            right: 0,
            display: 'inline-block',
            backgroundColor: primary45,
        },
        smallButton: {
            display: 'inline-block',
            cursor: 'pointer',
            padding: 4,
        }
    };

    return (
        <Draggable onStop={onEnd}>
            <div style={styles.container}>
                <div style={styles.controls}>
                    {/* 서명 설정 하는 버튼 */}
                    <div style={styles.smallButton} onClick={onSet}><FaCheck color={goodColor} /></div>
                    {/* 서명 취소하는 버튼 */}
                    <div style={styles.smallButton} onClick={onCancel}><FaTimes color={errorColor} /></div>
                </div>
                {/* 드래그 할수 있는 서명 이미지 */}
                <img src={url} width={200} style={styles.img} draggable={false} />
            </div>
        </Draggable>
    );
}
