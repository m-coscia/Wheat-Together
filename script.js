document.addEventListener('DOMContentLoaded', (event) => {
    const triggerWidths = {
        'Violence': 10, // 10vw
        'Coarse Language': 20, // 20vw
        'Substance Abuse': 30, // 30vw
        'Sexual Content': 40, // 40vw
        'Flashing Lights': 10 // 50vw
    };

    document.querySelectorAll('.trigger-warning').forEach((element) => {
        const triggerType = element.getAttribute('data-trigger');
        const width = triggerWidths[triggerType];
        element.querySelector('.filler').style.width = `${width}vw`;
    });
});
