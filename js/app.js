(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('#todo-form');
        const input = document.querySelector('#todo-input');
        const list = document.querySelector('#todo-list');
        const errorMsg = document.querySelector('#error-msg');
        const counter = document.querySelector('#counter');

        const filterAll = document.querySelector('#filter-all');
        const filterActive = document.querySelector('#filter-active');
        const filterDone = document.querySelector('#filter-done');

        let currentFilter = 'all';

        function updateCounter() {
            const items = list.querySelectorAll('li');
            let remaining = 0;

            items.forEach(function (item) {
                if (!item.classList.contains('completed')) {
                    remaining++;
                }
            });

            counter.textContent =
                remaining + (remaining === 1 ? ' item left' : ' items left');
        }

        function showError(message) {
            errorMsg.textContent = message;
            errorMsg.classList.remove('hidden');
            errorMsg.style.display = '';
            errorMsg.hidden = false;
        }

        function hideError() {
            errorMsg.classList.add('hidden');
            errorMsg.style.display = 'none';
            errorMsg.hidden = true;
        }

        function applyFilter() {
            const items = list.querySelectorAll('li');

            items.forEach(function (item) {
                const isCompleted = item.classList.contains('completed');
                let shouldHide = false;

                if (currentFilter === 'active' && isCompleted) {
                    shouldHide = true;
                } else if (currentFilter === 'done' && !isCompleted) {
                    shouldHide = true;
                }

                item.classList.toggle('hidden', shouldHide);
                item.style.display = shouldHide ? 'none' : '';
            });
        }

        function addItem() {
            const text = input.value.trim();

            if (text === '') {
                showError('Please enter a task.');
                return;
            }

            hideError();

            const li = document.createElement('li');

            const itemText = document.createElement('span');
            itemText.classList.add('item-text');
            itemText.textContent = text;

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'Delete';
            deleteButton.setAttribute('aria-label', 'Delete ' + text);

            li.appendChild(itemText);
            li.appendChild(deleteButton);
            list.appendChild(li);

            input.value = '';

            applyFilter();
            updateCounter();
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            addItem();
        });

        list.addEventListener('click', function (event) {
            const deleteButton = event.target.closest('.delete-btn');

            if (deleteButton && list.contains(deleteButton)) {
                deleteButton.closest('li').remove();
                applyFilter();
                updateCounter();
                return;
            }

            const itemText = event.target.closest('.item-text');

            if (itemText && list.contains(itemText)) {
                const item = itemText.closest('li');
                item.classList.toggle('completed');

                applyFilter();
                updateCounter();
            }
        });

        filterAll.addEventListener('click', function () {
            currentFilter = 'all';
            applyFilter();
        });

        filterActive.addEventListener('click', function () {
            currentFilter = 'active';
            applyFilter();
        });
filterDone.addEventListener('click', function () {
            currentFilter = 'done';
            applyFilter();
        });

        hideError();
        updateCounter();
        applyFilter();
    });
})();