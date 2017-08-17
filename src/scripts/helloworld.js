document.getElementById('getData').addEventListener('click', (e) => {
    fetch('/goodslist', {method: 'POST'});
});