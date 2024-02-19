

function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect(); // Get canvas position
    const scaleX = canvas.width / rect.width;    // Get scaling factor
    const scaleY = canvas.height / rect.height;

    // Calculate mouse position relative to canvas
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    return { x: x, y: y };
}
