# Ответы на вопросы по лабораторной работе

## Система учёта инцидентов безопасности в промышленности и производстве

---

## 1. Описание проекта

Данное приложение представляет собой **SPA (Single Page Application)** — систему учёта инцидентов безопасности в промышленности и производстве. Система позволяет:

- Просматривать список всех зарегистрированных инцидентов с их статистикой
- Просматривать подробную информацию по каждому инциденту
- Добавлять новые инциденты безопасности
- Редактировать существующие инциденты
- Удалять инциденты из системы

Каждый инцидент имеет следующие поля:
| Поле | Описание |
|------|----------|
| `name` | Название инцидента |
| `description` | Подробное описание |
| `location` | Место происшествия |
| `severity` | Уровень опасности (низкий / средний / высокий / критический) |
| `date` | Дата инцидента |
| `measures` | Принятые меры (необязательное поле) |

---

## 2. Используемые технологии

| Технология | Версия | Назначение |
|-----------|--------|------------|
| **React** | 19.x | Основная библиотека для создания UI |
| **React Router DOM** | 7.x | Клиентская маршрутизация (навигация) |
| **Axios** | 1.x | HTTP-клиент для работы с REST API |
| **JSON Server** | 1.x (beta) | Фиктивный REST API сервер для разработки |
| **Create React App** | 5.x | Инструмент для создания и запуска React-приложения |

---

## 3. Структура проекта

```
timp_laba1/
├── public/               # Статические файлы (index.html, иконки)
├── src/
│   ├── components/       # Переиспользуемые компоненты
│   │   ├── Spinner.js    # Компонент индикатора загрузки
│   │   ├── Spinner.css
│   │   ├── ErrorMessage.js # Компонент отображения ошибок
│   │   └── ErrorMessage.css
│   ├── context/          # Управление состоянием (Context API)
│   │   └── IncidentsContext.js
│   ├── pages/            # Страницы приложения
│   │   ├── Home.js       # Главная страница со статистикой
│   │   ├── Detail.js     # Страница детализации инцидентов
│   │   ├── Form.js       # Форма добавления инцидента
│   │   ├── Edit.js       # Страница редактирования
│   │   └── Delete.js     # Страница удаления
│   ├── App.js            # Корневой компонент с маршрутизацией
│   ├── App.css           # Глобальные стили
│   └── index.js          # Точка входа в приложение
├── db.json               # База данных JSON Server
├── package.json          # Зависимости и скрипты
└── ANSWERS.md            # Данный файл с ответами
```

---

## 4. Как запустить проект

### Шаг 1: Установка зависимостей
```bash
npm install
```

### Шаг 2: Запуск сервера JSON Server (в первом терминале)
```bash
npm run server
```
Сервер запустится на `http://localhost:5000`. API доступен по адресу `http://localhost:5000/incidents`.

### Шаг 3: Запуск React-приложения (во втором терминале)
```bash
npm start
```
Приложение откроется по адресу `http://localhost:3000`.

---

## 5. Архитектура приложения

Приложение построено по **компонентной архитектуре** с использованием **паттерна Context + Hooks**:

```
App (корневой компонент)
├── IncidentsProvider (глобальное состояние)
│   └── Router (маршрутизация)
│       ├── Header (навигация)
│       ├── Main
│       │   ├── Home (/)
│       │   ├── Detail (/detail, /detail/:id)
│       │   ├── Form (/add)
│       │   ├── Edit (/edit, /edit/:id)
│       │   └── Delete (/delete, /delete/:id)
│       └── Footer
```

**Поток данных:**
1. Компонент вызывает функцию из контекста (например, `fetchIncidents`)
2. Контекст отправляет HTTP-запрос через axios к JSON Server
3. Ответ сохраняется в состоянии контекста (`incidents`, `loading`, `error`)
4. Все компоненты, подписанные на контекст, автоматически перерисовываются

---

## 6. React — основные понятия

### Что такое React?

**React** — это JavaScript-библиотека для создания пользовательских интерфейсов. Разработана компанией Meta (Facebook). Ключевые особенности:

- **Компонентный подход**: интерфейс делится на независимые переиспользуемые компоненты
- **Виртуальный DOM**: React создаёт виртуальное представление DOM в памяти, сравнивает его с реальным и обновляет только изменившиеся части (процесс называется **reconciliation**)
- **Однонаправленный поток данных**: данные передаются от родительских компонентов к дочерним через `props`
- **JSX**: синтаксическое расширение JavaScript, позволяющее писать HTML-подобный код внутри JavaScript

### Что такое JSX?

```jsx
// JSX код
const element = <h1>Привет, мир!</h1>;

// Компилируется в:
const element = React.createElement('h1', null, 'Привет, мир!');
```

### Функциональные компоненты

В данном проекте используются **функциональные компоненты** — функции JavaScript, которые возвращают JSX:

```jsx
// Пример из проекта (Spinner.js)
const Spinner = ({ text = 'Загрузка...' }) => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p className="spinner-text">{text}</p>
        </div>
    );
};
```

**Преимущества** функциональных компонентов перед классовыми:
- Более краткий и читаемый код
- Полный доступ ко всем возможностям через хуки
- Лучшая производительность (нет накладных расходов на `this`)

---

## 7. React Хуки (Hooks)

**Хуки** — это функции, которые позволяют использовать состояние и другие возможности React в функциональных компонентах. Правила использования хуков:
1. Вызывать только на верхнем уровне компонента (не внутри условий/циклов)
2. Вызывать только из функциональных компонентов React

### `useState` — управление локальным состоянием

```jsx
const [incidents, setIncidents] = useState([]);
```
- Возвращает массив из двух элементов: текущее значение и функцию обновления
- При вызове функции обновления React перерисовывает компонент

**Использование в проекте:**
```jsx
// IncidentsContext.js
const [incidents, setIncidents] = useState([]);      // список инцидентов
const [loading, setLoading] = useState(false);        // состояние загрузки
const [error, setError] = useState(null);             // сообщение об ошибке

// Form.js — данные формы
const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    severity: 'средний',
    date: new Date().toISOString().split('T')[0],
    measures: ''
});
```

### `useEffect` — побочные эффекты

```jsx
useEffect(() => {
    // Код выполняется после рендеринга
    fetchIncidents();
}, [fetchIncidents]); // Массив зависимостей
```

- Выполняется после того, как компонент отрисовался в DOM
- Второй аргумент — **массив зависимостей**: эффект выполняется при изменении любого из значений
- Пустой массив `[]` — эффект выполняется только один раз при монтировании компонента

**Использование в проекте:**
```jsx
// Home.js — загрузка данных при монтировании компонента
useEffect(() => {
    fetchIncidents();
}, [fetchIncidents]);

// Detail.js — загрузка конкретного инцидента при изменении id
useEffect(() => {
    if (id) {
        fetchIncidentById(id);
    } else {
        fetchIncidents();
    }
}, [id, fetchIncidents, fetchIncidentById]);
```

### `useCallback` — мемоизация функций

```jsx
const fetchIncidents = useCallback(async () => {
    // ...
}, []); // массив зависимостей
```

- Возвращает **мемоизированную** версию функции, которая изменяется только при изменении зависимостей
- Предотвращает лишние перерисовки дочерних компонентов
- Важен для функций, передаваемых в `useEffect` как зависимости

**Использование в проекте (IncidentsContext.js):**
- `fetchIncidents` — загрузка всех инцидентов
- `fetchIncidentById` — загрузка одного инцидента
- `addIncident` — добавление инцидента
- `updateIncident` — обновление инцидента
- `deleteIncident` — удаление инцидента

### `useContext` — подписка на контекст

```jsx
const { incidents, loading, error } = useContext(IncidentsContext);
```

Используется для чтения значения из контекста React (см. раздел 8).

### `useParams` — параметры URL

```jsx
const { id } = useParams(); // /detail/5 → id = "5"
```

Хук из react-router-dom для получения параметров из URL.

### `useNavigate` — программная навигация

```jsx
const navigate = useNavigate();
navigate('/edit'); // Перенаправление на страницу
```

Хук из react-router-dom для навигации из кода.

---

## 8. Context API — управление глобальным состоянием

**Context API** — механизм React для передачи данных через дерево компонентов без необходимости передавать props через каждый уровень (**prop drilling**).

### Создание контекста

```jsx
// IncidentsContext.js
const IncidentsContext = createContext();
```

### Провайдер (Provider)

Компонент `IncidentsProvider` хранит состояние и предоставляет его всем дочерним компонентам:

```jsx
export const IncidentsProvider = ({ children }) => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // ... функции для работы с API
    
    return (
        <IncidentsContext.Provider value={{ incidents, loading, error, ... }}>
            {children}
        </IncidentsContext.Provider>
    );
};
```

### Использование контекста (Consumer)

```jsx
// Любой компонент может получить данные из контекста
const Home = () => {
    const { incidents, loading, error, fetchIncidents } = useIncidents();
    // ...
};
```

### Кастомный хук `useIncidents`

```jsx
export const useIncidents = () => {
    const context = useContext(IncidentsContext);
    if (!context) {
        throw new Error('useIncidents должны быть использованы внутри IncidentsProvider');
    }
    return context;
};
```

Кастомный хук инкапсулирует логику доступа к контексту и добавляет проверку правильного использования.

### Глобальное состояние приложения

Через `IncidentsContext` доступны:
| Значение | Тип | Описание |
|---------|-----|----------|
| `incidents` | Array | Список всех инцидентов |
| `currentIncident` | Object/null | Текущий просматриваемый инцидент |
| `loading` | Boolean | Идёт ли загрузка данных |
| `error` | String/null | Текст ошибки |
| `fetchIncidents` | Function | Загрузить все инциденты (GET /incidents) |
| `fetchIncidentById` | Function | Загрузить один инцидент (GET /incidents/:id) |
| `addIncident` | Function | Добавить инцидент (POST /incidents) |
| `updateIncident` | Function | Обновить инцидент (PUT /incidents/:id) |
| `deleteIncident` | Function | Удалить инцидент (DELETE /incidents/:id) |
| `clearError` | Function | Очистить сообщение об ошибке |

---

## 9. Маршрутизация (React Router DOM)

**React Router** — библиотека для организации навигации в SPA. Обеспечивает синхронизацию URL браузера с отображаемым компонентом.

### Настройка маршрутизации (App.js)

```jsx
<Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/add" element={<Form />} />
    </Routes>
</Router>
```

### Таблица маршрутов

| URL | Компонент | Описание |
|-----|-----------|----------|
| `/` | `Home` | Главная страница со статистикой и списком |
| `/detail` | `Detail` | Список инцидентов для детального просмотра |
| `/detail/:id` | `Detail` | Подробная информация о конкретном инциденте |
| `/add` | `Form` | Форма добавления нового инцидента |
| `/edit` | `Edit` | Список инцидентов для редактирования |
| `/edit/:id` | `Edit` | Форма редактирования конкретного инцидента |
| `/delete` | `Delete` | Список инцидентов для удаления |
| `/delete/:id` | `Delete` | Подтверждение удаления инцидента |

### Навигация

```jsx
// Декларативная навигация (ссылка)
<Link to="/detail">Детализация</Link>
<Link to={`/detail/${item.id}`}>Подробнее</Link>

// Программная навигация
const navigate = useNavigate();
navigate('/edit'); // после успешного обновления
navigate(-1);      // назад в истории
```

### Динамические параметры

```jsx
// В маршруте: path="/detail/:id"
// В компоненте:
const { id } = useParams();
// При URL /detail/5 → id = "5"
```

---

## 10. HTTP-запросы с Axios

**Axios** — популярная библиотека для выполнения HTTP-запросов. Преимущества перед встроенным `fetch`:
- Автоматическая сериализация/десериализация JSON
- Перехватчики запросов и ответов (interceptors)
- Автоматическая обработка статусов ошибок
- Удобный интерфейс API

### REST API запросы в проекте

```jsx
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/incidents`;

// GET — получить все инциденты
const response = await axios.get(API_URL);

// GET — получить один инцидент
const response = await axios.get(`${API_URL}/${id}`);

// POST — создать инцидент
const response = await axios.post(API_URL, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
});

// PUT — обновить инцидент
const response = await axios.put(`${API_URL}/${id}`, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
});

// DELETE — удалить инцидент
await axios.delete(`${API_URL}/${id}`);
```

### Обработка ошибок

```jsx
try {
    const response = await axios.get(API_URL);
    setIncidents(response.data);
} catch (err) {
    if (err.response) {
        // Сервер ответил с кодом ошибки (4xx, 5xx)
        switch (err.response.status) {
            case 404: return 'Запрашиваемый ресурс не найден.';
            case 500: return 'Внутренняя ошибка сервера.';
            // ...
        }
    } else if (err.request) {
        // Запрос был сделан, но ответ не получен
        return 'Не удалось связаться с сервером.';
    } else {
        // Ошибка при создании запроса
        return 'Произошла ошибка при отправке запроса.';
    }
}
```

---

## 11. JSON Server — фиктивный REST API

**JSON Server** — инструмент для быстрого создания REST API на основе JSON-файла. Используется для разработки и тестирования фронтенда без необходимости создавать реальный бэкенд.

### Запуск
```bash
npm run server
# или
npx json-server db.json --port 5000
```

### Автоматически создаваемые эндпоинты

На основе файла `db.json` с ключом `incidents` JSON Server автоматически создаёт:

| Метод | URL | Действие |
|-------|-----|---------|
| GET | `/incidents` | Получить все инциденты |
| GET | `/incidents/:id` | Получить инцидент по ID |
| POST | `/incidents` | Создать новый инцидент |
| PUT | `/incidents/:id` | Полностью обновить инцидент |
| PATCH | `/incidents/:id` | Частично обновить инцидент |
| DELETE | `/incidents/:id` | Удалить инцидент |

### Структура db.json

```json
{
  "incidents": [
    {
      "id": "1",
      "name": "Превышение уровня шума",
      "description": "...",
      "location": "Компрессорная станция",
      "severity": "средний",
      "date": "2026-02-25",
      "measures": "..."
    }
  ]
}
```

---

## 12. CRUD-операции

**CRUD** — аббревиатура четырёх основных операций с данными: **C**reate (создание), **R**ead (чтение), **U**pdate (обновление), **D**elete (удаление).

### Create (Добавление инцидента) — `POST /incidents`

```jsx
// Form.js
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    await addIncident({
        name: formData.name.trim(),
        description: formData.description.trim(),
        // ...
    });
    navigate('/');
};
```

Маршрут: `/add` → компонент `Form.js`

### Read (Чтение инцидентов) — `GET /incidents` и `GET /incidents/:id`

```jsx
// Home.js — список всех инцидентов
useEffect(() => {
    fetchIncidents();
}, [fetchIncidents]);

// Detail.js — один инцидент
const data = await fetchIncidentById(id);
```

Маршруты: `/` (Home), `/detail` (список), `/detail/:id` (детали)

### Update (Редактирование) — `PUT /incidents/:id`

```jsx
// Edit.js
await updateIncident(id, {
    name: formData.name.trim(),
    // ...
});
navigate('/edit');
```

Маршруты: `/edit` (выбор), `/edit/:id` (форма редактирования)

### Delete (Удаление) — `DELETE /incidents/:id`

```jsx
// Delete.js
const handleDelete = async () => {
    await deleteIncident(parseInt(id));
    navigate('/delete');
};
```

Маршруты: `/delete` (выбор), `/delete/:id` (подтверждение)

---

## 13. Обработка состояний загрузки и ошибок

### Состояния компонента

Каждый компонент обрабатывает три состояния:

1. **Загрузка** (`loading === true`) — показывает компонент `Spinner`
2. **Ошибка** (`error !== null`) — показывает компонент `ErrorMessage`  
3. **Данные загружены** — показывает основной контент

```jsx
// Пример из Home.js
if (loading && incidents.length === 0) {
    return <Spinner text="Загрузка инцидентов..." />;
}

if (error && incidents.length === 0) {
    return <ErrorMessage message={error} onRetry={fetchIncidents} />;
}

return (/* основной контент */);
```

### Компонент Spinner

```jsx
const Spinner = ({ text = 'Загрузка...' }) => (
    <div className="spinner-container">
        <div className="spinner"></div>
        <p className="spinner-text">{text}</p>
    </div>
);
```

Отображает анимированный индикатор загрузки с текстом.

### Компонент ErrorMessage

```jsx
const ErrorMessage = ({ message, onClose, onRetry }) => (
    <div className="error-container">
        <h3>Произошла ошибка</h3>
        <p>{message}</p>
        {onRetry && <button onClick={onRetry}>🔄 Повторить</button>}
        {onClose && <button onClick={onClose}>✖️ Закрыть</button>}
    </div>
);
```

Отображает сообщение об ошибке с опциональными кнопками "Повторить" и "Закрыть".

---

## 14. Валидация форм

В проектах Form.js и Edit.js реализована **клиентская валидация** форм перед отправкой данных на сервер.

### Правила валидации

| Поле | Правило |
|------|---------|
| Название | Обязательное, минимум 3, максимум 100 символов |
| Описание | Обязательное, минимум 10 символов |
| Место | Обязательное, минимум 3 символа |
| Дата | Обязательная, не может быть в будущем |
| Уровень опасности | Должен быть одним из: низкий, средний, высокий, критический |

### Реализация

```jsx
const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
        errors.name = 'Название инцидента обязательно';
    } else if (formData.name.trim().length < 3) {
        errors.name = 'Название должно содержать минимум 3 символа';
    } else if (formData.name.trim().length > 100) {
        errors.name = 'Название не должно превышать 100 символов';
    }
    
    // Валидация даты (не в будущем)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (selectedDate > today) {
        errors.date = 'Дата не может быть в будущем';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // true если ошибок нет
};
```

### Отображение ошибок

```jsx
<div className={`form-group ${validationErrors.name ? 'has-error' : ''}`}>
    <label>Название: <span className="required">*</span></label>
    <input 
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={validationErrors.name ? 'input-error' : ''}
    />
    {validationErrors.name && (
        <span className="validation-error">{validationErrors.name}</span>
    )}
</div>
```

---

## 15. Описание компонентов

### `App.js` — корневой компонент

Обёртывает приложение в `IncidentsProvider` (контекст) и `Router` (маршрутизация). Содержит шапку с навигацией, основной контент (Routes) и подвал.

### `Home.js` — главная страница

- Загружает все инциденты при монтировании
- Отображает статистику (общее количество, по уровням опасности)
- Показывает таблицу инцидентов
- Функция `getSeverityColor` возвращает цвет для каждого уровня опасности

### `Detail.js` — детализация

- В режиме списка (`/detail`): показывает карточки всех инцидентов
- В режиме просмотра (`/detail/:id`): загружает и показывает полную информацию об инциденте

### `Form.js` — добавление инцидента

- Управляемая форма с состоянием `formData`
- Валидация перед отправкой
- Автоматически присваивает ID (максимальный существующий + 1)

### `Edit.js` — редактирование инцидента

- В режиме списка (`/edit`): показывает карточки для выбора
- В режиме редактирования (`/edit/:id`): загружает данные инцидента и предзаполняет форму

### `Delete.js` — удаление инцидента

- В режиме списка (`/delete`): показывает карточки для выбора
- В режиме удаления (`/delete/:id`): показывает данные инцидента и кнопку подтверждения удаления

### `Spinner.js` — индикатор загрузки

Переиспользуемый компонент для отображения анимации загрузки с настраиваемым текстом.

### `ErrorMessage.js` — отображение ошибок

Переиспользуемый компонент для отображения ошибок с кнопками "Повторить" и "Закрыть".

---

## 16. Переменные окружения

Для конфигурации URL API используется переменная окружения:

```
REACT_APP_API_URL=https://your-backend-url.com
```

Если переменная не задана, используется значение по умолчанию `http://localhost:5000`.

**Создайте файл `.env` в корне проекта для локальной разработки:**
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 17. Жизненный цикл React-компонента

В функциональных компонентах жизненный цикл реализуется через хук `useEffect`:

| Этап жизненного цикла | Реализация через хуки |
|----------------------|----------------------|
| **Монтирование** (componentDidMount) | `useEffect(() => { ... }, [])` |
| **Обновление** (componentDidUpdate) | `useEffect(() => { ... }, [dep])` |
| **Размонтирование** (componentWillUnmount) | `useEffect(() => { return () => cleanup(); }, [])` |

```jsx
useEffect(() => {
    fetchIncidents(); // Выполняется при монтировании
    
    return () => {
        // Функция очистки — выполняется при размонтировании
    };
}, []); // Пустой массив = только при монтировании
```

---

## 18. Условный рендеринг

В проекте активно используется условный рендеринг для управления отображением на основе состояния:

```jsx
// Тернарный оператор
{loading ? <Spinner /> : <Content />}

// Логический оператор &&
{error && <ErrorMessage message={error} />}

// Ранний возврат
if (loading) return <Spinner />;
if (error) return <ErrorMessage />;
return <MainContent />;
```
