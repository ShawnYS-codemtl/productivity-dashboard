export function makeDraggable(el, handle) {
    let offsetX = 0, offsetY = 0;
    let isDown = false;

    handle.style.cursor = "grab";

    handle.addEventListener("mousedown", (e) => {
        isDown = true;

        // Remove centering transform on FIRST drag
        if (el.style.transform) {
            el.style.left = el.getBoundingClientRect().left + "px";
            el.style.top = el.getBoundingClientRect().top + "px";
            el.style.transform = "none";
        }

        handle.style.cursor = "grabbing";

        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;

        e.preventDefault(); // prevent selecting text
    });

    document.addEventListener("mouseup", () => {
        isDown = false;
        handle.style.cursor = "grab";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
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