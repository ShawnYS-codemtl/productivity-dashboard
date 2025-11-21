export function makeDraggable(el) {
    let offsetX = 0, offsetY = 0, isDown = false;

    el.addEventListener("mousedown", e => {
        isDown = true;
        el.style.cursor = "grabbing";
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
    });

    document.addEventListener("mouseup", () => {
        isDown = false;
        el.style.cursor = "grab";
    });

    document.addEventListener("mousemove", e => {
        if (!isDown) return;

        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
        el.style.transform = "none"; // disable centering transform when dragged
    });
}

export function makeDraggable2(element, dragHandle) {
    let offsetX = 0, offsetY = 0, isDragging = false;

    dragHandle.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        dragHandle.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
        element.style.transform = "none"; // stop centering once dragged
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        dragHandle.style.cursor = "grab";
    });
}