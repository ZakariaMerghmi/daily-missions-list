// Selectors //
const listcontent = document.querySelector('.text-input');
const listbtn = document.querySelector('.add-button');
const bigdiv = document.querySelector('.list-items');
const select = document.querySelector('.select');

// Event Listeners //
listbtn.addEventListener('click', addmission);
bigdiv.addEventListener('click', deleteCheck);
select.addEventListener('change', filtering);  // Changed from 'click' to 'change'

// Functions //
function addmission(event) {
    event.preventDefault();
    if (listcontent.value === "") {
        return;
    }

    // Create a new div element
    const newDIVelement = document.createElement('div');
    newDIVelement.classList.add('list-div');

    // Create a new li element
    const newLIelement = document.createElement('li');
    newLIelement.classList.add('list-li');
    newLIelement.innerText = listcontent.value;
    newDIVelement.appendChild(newLIelement);

    // Create check button
    const checkbtn = document.createElement('button');
    checkbtn.innerHTML = '<i class="fa-solid fa-check" id="check"></i>';
    checkbtn.classList.add('check-btn');
    newDIVelement.appendChild(checkbtn);

    // Create delete button
    const deletebtn = document.createElement('button');
    deletebtn.innerHTML = '<i class="fa-solid fa-trash" id="delete"></i>';
    deletebtn.classList.add('delete-btn');
    newDIVelement.appendChild(deletebtn);

    // Append the new div to the big div
    bigdiv.appendChild(newDIVelement);

    // Clear the input field
    listcontent.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === 'delete-btn') {
        const parent = item.parentElement;
        parent.classList.toggle("delete");
        parent.addEventListener('transitionend', () => {
            parent.remove(); // To remove the item after the transition
        });
    }

    if (item.classList[0] === 'check-btn') {
        const parent = item.parentElement;
        parent.classList.toggle('done'); // Mark the task as done
    }
}

function filtering(e) {
    const elements = bigdiv.children;  // Use `children` instead of `childNodes`
    
    Array.from(elements).forEach(function(element) {
        switch (e.target.value) {
            case 'all':
                element.style.display = 'flex';
                break;

            case 'completed':
                if (element.classList.contains('done')) {
                    element.style.display = 'flex';
                } else {
                    element.style.display = 'none';
                }
                break;

            case 'uncompleted':
                if (!element.classList.contains('done')) {
                    element.style.display = 'flex';
                } else {
                    element.style.display = 'none';
                }
                break;
        }
    });
}
