import * as React from "react";
import {ReactComponent as Arrow} from "../../images/icons/arrow.svg";
import styles from "./styles.module.scss";
import {classNameSeparator} from "../../util";

interface DrawBoxProps {
    usingPen: boolean;
}

export default class DrawBox extends React.Component<DrawBoxProps, {}> {
    boundingBox;
    context;
    saves;
    savesPointer;
    ref;
    isDrawing;
    eraserSize;
    penSize;
    color;

    constructor(props) {
        super(props);
        this.saves = [];
        this.savesPointer = 0;
        this.ref = React.createRef();
        this.isDrawing = false;
        this.eraserSize = 5;
        this.penSize = 5;
        this.color = "white";

        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.newSave = this.newSave.bind(this);
        this.remove = this.remove.bind(this);

        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("touchend", this.onMouseUp);
        window.addEventListener("resize", this.onResize.bind(this));
    }

    componentDidMount(): void {
        this.boundingBox = this.ref.current.getBoundingClientRect();
        this.context = this.ref.current.getContext("2d");
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.penSize;
    }

    getPosition(event: MouseEvent & TouchEvent) {
        if (event.type === 'mousedown'
            || event.type === 'mousemove'
            || event.type === 'mouseup'
            || event.type === 'mouseout') {
            return {
                x: event.clientX - this.boundingBox.left,
                y: event.clientY - this.boundingBox.top
            }
        }
        // else is a touch event
        return {
            x: event.touches[0].clientX - this.boundingBox.left,
            y: event.touches[0].clientY - this.boundingBox.top
        };
    }

    onMouseDown(event) {
        if (this.props.usingPen) {
            this.isDrawing = true;
            const {x, y} = this.getPosition(event);
            this.context.moveTo(x, y);
            this.context.arc(x, y, this.penSize / 4, 0, 2 * Math.PI);
            this.context.stroke();
        } else {

        }
    }

    onMouseMove(event) {
        if (this.isDrawing) {
            if (this.props.usingPen) {
                let {x, y} = this.getPosition(event);
                this.context.lineTo(x, y);
                this.context.stroke();
            } else {

            }
        }
    }

    onMouseUp() {
        if (this.props.usingPen) {
            this.isDrawing = false;
            this.context.beginPath();
        } else {

        }
    }

    onMouseOut() {
        if (this.props.usingPen) {
            this.context.beginPath();
        } else {

        }
    }

    save() {
        this.saves[this.savesPointer] = this.getFullImage();
    }

    load() {
        this.clearCanvas();
        this.context.putImageData(this.saves[this.savesPointer], 0, 0);
    }

    newSave() {
        this.save();
        this.clearCanvas();
        this.saves.push(this.getFullImage());
        this.savesPointer = this.saves.length - 1;
    }

    remove() {
        if (this.saves.length <= 1) {
            this.clearCanvas();
            return;
        }
        this.saves.splice(this.savesPointer, 1);
        // go left, but no need to loop around if already at index 0
        this.savesPointer = Math.max(this.savesPointer - 1, 0);
        this.load();
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.ref.current.width, this.ref.current.height);
    }

    getFullImage() {
        return this.context.getImageData(0, 0, this.ref.current.width, this.ref.current.height)
    }

    // i is either -1 or +1
    goDirection(i) {
        this.save();
        this.savesPointer += i;
        if (this.savesPointer < 0) {
            this.savesPointer = this.saves.length - 1;
        }
        if (this.savesPointer === this.saves.length) {
            this.savesPointer = 0;
        }
        this.load();
    }

    onResize() {
        const {width, height} = this.calcCanvasSize();
        this.ref.current.height = height;
        this.ref.current.width = width;
        this.boundingBox = this.ref.current.getBoundingClientRect();
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.penSize;
    }

    calcCanvasSize() {
        // forgive me for I have sinned
        // I don't know how else to make the canvas fit the screen on
        // both desktop and mobile.
        let height, width;
        if (window.innerWidth <= 700) {
            height = (window.innerHeight - 43.2 - 67.4) / 3;
            width = height * 2;
            const maxWidth = window.innerWidth - (6 * 16); // full width minus arrow buttons
            if (height * 2 > maxWidth) {
                width = maxWidth;
                height = width / 2;
            }
        } else {
            height = (window.innerHeight - 80 - 32) / 3;
            width = height * 2;
            const maxWidth = window.innerWidth - (6 * 16) - 53.33; // full width minus arrow buttons and create/remove
            if (height * 2 > maxWidth) {
                width = maxWidth;
                height = width / 2;
            }
        }
        return {width, height};
    }

    render() {
        const {width, height} = this.calcCanvasSize();
        return (
            <div className={classNameSeparator(styles.drawBox, "row")}>
                <div className={classNameSeparator("col", styles.createDeleteContainer)}>
                    <button
                        className={styles.createDelete}
                        onClick={this.newSave}
                    >+</button>
                    <button
                        className={styles.createDelete}
                        onClick={this.remove}
                    >-</button>
                </div>
                <button
                    className={styles.arrow}
                    onClick={() => this.goDirection(-1)}>{"<"}</button>
                <canvas
                    ref={this.ref}
                    onMouseDown={this.onMouseDown}
                    onTouchStart={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onTouchMove={this.onMouseMove}
                    onTouchEnd={this.onMouseUp}
                    onMouseOut={this.onMouseOut}
                    height={height}
                    width={width}/>
                <button
                    className={styles.arrow}
                    onClick={() => this.goDirection(1)}>{">"}</button>
            </div>
        );
    }
}

/**
 * http://www.java2s.com/example/javascript/canvas/scale-an-imagedata-in-html-canvas.html
 * const data = this.context.getImageData(0, 0, this.ref.current.width, this.ref.current.height);
 console.log(data);
 // const newCanvas: HTMLCanvasElement = (document.createElement("canvas") as HTMLCanvasElement);
 // newCanvas.width = data.width;
 // newCanvas.height = data.height;
 // // @ts-ignore
 // newCanvas.getContext("2d").putImageData(data, 0, 0);
 // // this.ref2.current.getContext("2d").scale(0.5, 0.5);
 //
 // // this.context.putImageData(data, 0, 0);
 // this.ref2.current.getContext("2d")
 //     .drawImage(newCanvas, 0, 0, this.ref2.current.width, this.ref2.current.height);
 */