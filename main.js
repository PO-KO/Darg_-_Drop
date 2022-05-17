const containers = document.querySelectorAll(".container");
const draggables = document.querySelectorAll(".draggable");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (ev) => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", (ev) => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    let draggable = document.querySelector(".dragging");
    let afterElement = getDragAfterElement(container, ev.clientY);

    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(conatiner, y) {
  let draggablesElement = Array.from(
    conatiner.querySelectorAll(".draggable:not(.dragging)")
  );

  return draggablesElement.reduce(
    (closest, child) => {
      let box = child.getBoundingClientRect();
      offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
      //   console.log(offset);
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
