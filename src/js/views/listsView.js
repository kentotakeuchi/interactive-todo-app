import $ from 'jquery';
import { elements } from './base';

export const renderLocalStorageData = () => {

    // show update list on UI
    const MemosOfLocalStorage = JSON.parse(localStorage.getItem('lists'));

    // Render "ul" element.
    renderMyListsPage();

    // Render memos from local storage.
    if (MemosOfLocalStorage) {
        MemosOfLocalStorage.forEach(el => {
            renderList(el);
        });
    }
};

export const renderMyListsPage = () => {

    const markup = `
        <ul id="lists-list">
            <audio class="audio0">
                <source src="./audio/hover_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio1">
                <source src="./audio/click_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio2">
                <source src="./audio/click_2.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio3">
                <source src="./audio/click_3.mp3"type="audio/mpeg">
            </audio>
        </ul>
        <li class="hover"></li>
    `;
    elements.mainContainer.append(markup);

    // For setting + cursor on the blank area.
    $(`#main-container`).addClass('plus');
};

export const renderList = memo => {

    const markup = `
        <li id="${memo.id}" class="memo ${memo.complete}">${memo.input}</li>
    `;

    // Check if or not there is class="complete".
    if ($('#lists-list').has('.complete').length > 0) {
        // Insert markup before the first memo with complete class.
        $('.complete').first().before(markup);
    } else {
        $('#lists-list').append(markup);
    }

    // Style memo to original color when new input is gone.
    $(`.memo`).removeClass(`darker`);
};

export const renderNewInput = (e) => {

    console.log('render2');

    $(`.hidden`).css('opacity', '0');

    if (e.target === $('#main-container')[0]) {
        const theme = localStorage.getItem('theme');

        const markup = `
            <div class="inputContainer ${theme}">
                <input class="listInput" type="text">
            </div>
        `;
        $('#lists-list').after(markup);

        // Style memo to darker when new input is displayed.
        $(`#lists-list > li, .memo`).addClass(`darker`);

        // Change cursor + into default when there is new input.
        $(`#main-container`).removeClass('plus');

        // Turn off render input & on remove input.
        $('#main-container').off('click', renderNewInput);
        $('#main-container').off('click', renderNewInput3);
        $('#main-container').on('click', removeNewInput);

        // Focus input field automatically when input shows.
        $('.listInput').focus();
    }
};

export const removeNewInput = (e) => {

    if (e.target === $('#main-container')[0]) {
        $(`.inputContainer`).addClass('removed-item');

        setTimeout(() => {
            $('.inputContainer').remove();
        }, 200);

        // Style memo to original color when new input is gone.
        $(`.memo`).removeClass(`darker`);

        // Change cursor default into + when new input is removed.
        $(`#main-container`).addClass('plus');

        // Turn off remove input & on render input.
        $('#main-container').off('click', removeNewInput);
        $('#main-container').on('click', renderNewInput);
    }
};

export const renderNewInputForEdit = (target) => {

    const id = target.id;
    const markup = `
        <input class="listEditInput" type="text" value="${target.innerText}">
    `;
    $(`#${id}`).after(markup);

    // Style memo to darker when edit input is displayed.
    $(`#lists-list > li, .memo`).addClass(`darker`);

    // Focus input field automatically when input shows.
    // Move cursor to end of input.
    $('.listEditInput').focus().val(``).val(`${target.innerText}`);

    // Turn off render input & on remove input.
    $('#main-container').off('click', renderNewInput);
    $('#main-container').off('click', renderNewInput3);
    $('#main-container').on('click', removeNewInputForEdit);
};

export const removeNewInputForEdit = (e) => {
    if (e.target === $('#main-container')[0]) {
        $('#main-container').find('input').remove();

        // Style memo to original color when edit input is gone.
        $(`.memo`).removeClass(`darker`);

        // Detect element which display is none & show it again.
        $('#main-container').find('li').each((index, el) => {
            if (el.style.display === 'none') {
                el.style.display = 'block';
            }
        });

        // Turn off remove input & on render input.
        $('#main-container').off('click', removeNewInputForEdit);
        $('#main-container').off('click', renderNewInput);
        $('#main-container').on('click', renderNewInput);
    }
};

export const getInput = () => {
    elements.listInput.val();
};

export const deleteMemo = id => {

    const memo = $(`#${id}`);

    $(`#${id}`).addClass('removed-item');

    setTimeout(() => {
        if (memo) memo.remove();
    }, 300);
};


/*******************
 * Layer 3
 **********/

export const renderLocalStorageData3 = (e) => {

    let id;
    if (e.target.parentElement.id === 'memo-list') {
        // If the event comes from 'updateMemoHandler3(e)' or 'completeMemoHandler3(e)'.
        id = e.target.parentElement.className;
    } else {
        // If the event comes from 'changeToMemoHandler(e)'.
        id = e.target.id;
    }

    // show update list on UI
    const MemosOfLocalStorage = JSON.parse(localStorage.getItem('lists'));

    // Render "ul" element.
    renderMemosPage3(id);

    const index = MemosOfLocalStorage.findIndex(el => el.id === id);

    // Render memos from local storage.
    if (MemosOfLocalStorage[index].memos) {
        MemosOfLocalStorage[index].memos.forEach(el => {
            renderMemo3(el);
        });
    }
};

export const renderMemosPage3 = (id) => {

    const markup = `
        <ul id="memo-list" class="${id}">
            <audio class="audio0">
                <source src="./audio/hover_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio1">
                <source src="./audio/click_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio2">
                <source src="./audio/click_2.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio3">
                <source src="./audio/click_3.mp3"type="audio/mpeg">
            </audio>
        </ul>
        <li class="hover"></li>
    `;
    elements.mainContainer.append(markup);

    // For setting + cursor on the blank area.
    $(`#main-container`).addClass('plus');
};

export const renderMemo3 = memo => {

    const markup = `
        <li id="${memo.id}" class="memo ${memo.complete}">${memo.input}</li>
    `;

    // Check if or not there is class="complete".
    if ($('#memo-list').has('.complete').length > 0) {
        // Insert markup before the first memo with complete class.
        $('.complete').first().before(markup);
    } else {
        $('#memo-list').append(markup);
    }

    // Style memo to original color when new input is gone.
    $(`.memo`).removeClass(`darker`);
};

export const hoverNewInput3 = (e) => {

    if (e.target.tagName === 'UI' ||
        e.target.tagName === 'LI'
        ) {
        return;
    }

    // If there is no input, show trapezoid.
    const theme = localStorage.getItem('theme');
    if (!$('#main-container').has('input').length > 0) {
        $(`.hover`).addClass(`hidden ${theme}`);
        $(`.hover`).removeClass('hidden2');
        $(`.hidden`).css('opacity', '1');
    }

    elements.mainContainer.off('mouseleave', removeHoverEvent);
    elements.mainContainer.on('mouseleave', removeHoverEvent);
};

function removeHoverEvent() {
    $(`.hover`).removeClass(`hidden`);
    $(`.hover`).addClass('hidden2');
};


export const renderNewInput3 = (e) => {

    console.log('render3');

    $(`.hidden`).css('opacity', '0');

    if (e.target === $('#main-container')[0]) {
        const theme = localStorage.getItem('theme');

        const markup = `
            <div class="inputContainer ${theme}">
                <input class="memoInput" type="text">
            </div>
        `;
        $('#memo-list').after(markup);

        // Style memo to darker when new input is displayed.
        $(`#memo-list > li, .memo`).addClass(`darker`);

        // Change cursor + into default when there is new input.
        $(`#main-container`).removeClass('plus');

        // Turn off render input & on remove input.
        $('#main-container').off('click', renderNewInput);
        $('#main-container').off('click', renderNewInput3);
        $('#main-container').on('click', removeNewInput3);

        // Focus input field automatically when input shows.
        $('.memoInput').focus();
    }
};

export const removeNewInput3 = (e) => {

    if (e.target === $('#main-container')[0]) {
        $(`.inputContainer`).addClass('removed-item');

        setTimeout(() => {
            $('.inputContainer').remove();
        }, 200);

        // Style memo to original color when new input is gone.
        $(`.memo`).removeClass(`darker`);

        // Change cursor default into + when new input is removed.
        $(`#main-container`).addClass('plus');

        // Turn off remove input & on render input.
        $('#main-container').off('click', removeNewInput3);
        $('#main-container').on('click', renderNewInput3);
    }
};

export const renderNewInputForEdit3 = (target) => {

    const id = target.id;
    const markup = `
        <input class="memoEditInput" type="text" value="${target.innerText}">
    `;
    $(`#${id}`).after(markup);

    // Style memo to darker when edit input is displayed.
    $(`#memo-list > li, .memo`).addClass(`darker`);

    // Focus input field automatically when input shows.
    // Move cursor to end of input.
    $('.memoEditInput').focus().val(``).val(`${target.innerText}`);

    // Turn off render input & on remove input.
    $('#main-container').off('click', renderNewInput);
    $('#main-container').off('click', renderNewInput3);
    $('#main-container').on('click', removeNewInputForEdit3);
};

export const removeNewInputForEdit3 = (e) => {
    if (e.target === $('#main-container')[0]) {
        $('#main-container').find('.memoEditInput').remove();

        // Style memo to original color when edit input is gone.
        $(`.memo`).removeClass(`darker`);

        // Detect element which display is none & show it again.
        $('#main-container').find('li').each((index, el) => {
            if (el.style.display === 'none') {
                el.style.display = 'block';
            }
        });

        // Turn off remove input & on render input.
        $('#main-container').off('click', removeNewInputForEdit3);
        $('#main-container').off('click', renderNewInput3);
        $('#main-container').on('click', renderNewInput3);
    }
};

