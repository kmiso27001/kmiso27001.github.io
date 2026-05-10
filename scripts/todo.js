// Todo App Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 取得 DOM 元素
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const itemsLeftElement = document.getElementById('items-left');
    const clearCompletedBtn = document.getElementById('clear-completed');
    
    // Calendar DOM 元素
    const calendarDays = document.getElementById('calendar-days');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const todoDateTitle = document.getElementById('todo-date-title');

    // 日曆範圍限制 (115/5 ~ 116/6，即 2026/05 ~ 2027/06)
    const MIN_YEAR = 2026;
    const MIN_MONTH = 4; // 5月 (0-indexed)
    const MAX_YEAR = 2027;
    const MAX_MONTH = 5; // 6月 (0-indexed)

    // 格式化日期字串 YYYY-MM-DD
    function formatDate(year, month, day) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    // 取得今日字串，如果今日不在範圍內，回傳 2026-05-01
    function getInitialDate() {
        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        
        if (y > MAX_YEAR || (y === MAX_YEAR && m > MAX_MONTH) ||
            y < MIN_YEAR || (y === MIN_YEAR && m < MIN_MONTH)) {
            return { year: MIN_YEAR, month: MIN_MONTH, dateString: formatDate(MIN_YEAR, MIN_MONTH, 1) };
        }
        return { year: y, month: m, dateString: formatDate(y, m, today.getDate()) };
    }

    const initData = getInitialDate();

    // 狀態管理
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all'; // 當前篩選狀態
    let currentYear = initData.year;
    let currentMonth = initData.month;
    let selectedDate = initData.dateString;

    // 處理舊資料 (相容性：如果以前沒有 date，補上 selectedDate)
    let dataChanged = false;
    todos = todos.map(t => {
        if (!t.date) {
            dataChanged = true;
            return { ...t, date: selectedDate };
        }
        return t;
    });
    if (dataChanged) saveTodos();

    // 初始化渲染
    renderCalendar();
    renderTodos();

    // 事件監聽器：日曆切換
    prevMonthBtn.addEventListener('click', () => {
        if (currentYear === MIN_YEAR && currentMonth === MIN_MONTH) return;
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        if (currentYear === MAX_YEAR && currentMonth === MAX_MONTH) return;
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // 事件監聽器：新增事項
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addTodo();
        }
    });

    // 事件監聽器：篩選按鈕
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTodos();
        });
    });

    // 事件監聽器：清除已完成事項
    clearCompletedBtn.addEventListener('click', () => {
        // 只清除當天已完成的
        todos = todos.filter(todo => !(todo.date === selectedDate && todo.completed));
        saveAndRender();
        renderCalendar(); // 可能更新紅點狀態
    });

    // 函數：渲染日曆
    function renderCalendar() {
        calendarDays.innerHTML = '';
        calendarMonthYear.textContent = `${currentYear}年 ${currentMonth + 1}月`;

        // 檢查按鈕狀態
        prevMonthBtn.disabled = (currentYear === MIN_YEAR && currentMonth === MIN_MONTH);
        prevMonthBtn.style.opacity = prevMonthBtn.disabled ? '0.3' : '1';
        nextMonthBtn.disabled = (currentYear === MAX_YEAR && currentMonth === MAX_MONTH);
        nextMonthBtn.style.opacity = nextMonthBtn.disabled ? '0.3' : '1';

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // 填補前面的空白
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDiv);
        }

        // 填入天數
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.textContent = i;
            
            const dateString = formatDate(currentYear, currentMonth, i);
            
            if (dateString === selectedDate) {
                dayDiv.classList.add('selected');
            }

            // 檢查是否有未完成的待辦事項
            const hasActiveTodos = todos.some(t => t.date === dateString && !t.completed);
            if (hasActiveTodos) {
                dayDiv.classList.add('has-todos');
            }

            dayDiv.addEventListener('click', () => {
                selectedDate = dateString;
                renderCalendar();
                renderTodos();
            });

            calendarDays.appendChild(dayDiv);
        }
    }

    // 函數：新增事項
    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            const newTodo = {
                id: Date.now().toString(),
                text: text,
                completed: false,
                date: selectedDate
            };
            todos.unshift(newTodo);
            todoInput.value = '';
            saveAndRender();
            renderCalendar(); // 更新紅點
        }
    }

    // 函數：切換完成狀態
    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveAndRender();
        renderCalendar(); // 更新紅點
    }

    // 函數：刪除事項
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveAndRender();
        renderCalendar(); // 更新紅點
    }

    // 只儲存
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 儲存並重新渲染 UI
    function saveAndRender() {
        saveTodos();
        renderTodos();
    }

    // 函數：渲染當天事項列表
    function renderTodos() {
        todoList.innerHTML = '';
        
        // 更新標題顯示日期
        const [y, m, d] = selectedDate.split('-');
        todoDateTitle.textContent = `${parseInt(m)}/${parseInt(d)} 待辦事項`;

        // 取得當天的代辦事項
        let dailyTodos = todos.filter(todo => todo.date === selectedDate);
        
        // 根據 filter 篩選
        let filteredTodos = dailyTodos;
        if (currentFilter === 'active') {
            filteredTodos = dailyTodos.filter(todo => !todo.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = dailyTodos.filter(todo => todo.completed);
        }

        // 渲染列表
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <label class="checkbox-container">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} class="todo-checkbox">
                    <span class="checkmark"></span>
                </label>
                <span class="todo-text">${escapeHTML(todo.text)}</span>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            `;

            const checkbox = li.querySelector('.todo-checkbox');
            checkbox.addEventListener('change', () => toggleTodo(todo.id));

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

            todoList.appendChild(li);
        });

        // 顯示當天未完成的數量
        const activeCount = dailyTodos.filter(t => !t.completed).length;
        itemsLeftElement.textContent = `${activeCount} 個未完成項目`;
        
        const hasCompleted = dailyTodos.some(t => t.completed);
        clearCompletedBtn.style.display = hasCompleted ? 'block' : 'none';
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
