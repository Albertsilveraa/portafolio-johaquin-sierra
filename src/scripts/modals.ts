document.querySelectorAll<HTMLButtonElement>('[data-open-modal]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const id = trigger.getAttribute('data-open-modal');
    if (!id) return;
    const dialog = document.getElementById(id);
    if (dialog instanceof HTMLDialogElement) dialog.showModal();
  });
});

document.querySelectorAll<HTMLDialogElement>('dialog[data-project-modal]').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (clickedOutside) dialog.close();
  });

  dialog.querySelector('[data-close-modal]')?.addEventListener('click', () => dialog.close());
});
