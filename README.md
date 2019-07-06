# Andersen JS Course

Репозиторий с задачами для курса Andersen JS. Вам необходимо сделать fork этого репозитория, чтобы начать работу над задачами в рамках курса.

## Перед запуском

1. Установите NodeJS (версию Current) - https://nodejs.org/en/
2. Установите Yarn - https://yarnpkg.com/ru/
3. Если вы еще не поставили себе редактор кода, то можете поставить VSCode - https://code.visualstudio.com/
4. Для удобства разработки вам понадобятся плагины для ESlint (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) и Prettier (https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Подготовка к запуску

- Находясь в папке с проектом выполните в консоле команду `yarn`. Эта команда установит все необходимые пакеты зависимостей.

## Запуск приложения

- Выполните команду `yarn start`. После этого у вас должен подняться локальный сервер, открыться новая вкладка в браузере, и вы можете приступать к работе.

==========================
Краткое описание.

Приложение "Сотрудники".
Представлено в виде одностраничного приложения. Серверная маршрутизация на несколько урлов не реализована. Имеется возможность только просматривать текущий список сотрудников и производить операции добавления, удаления и изменения.

Были установлены следующие пакеты:
npm install express --save
npm install mongoose --save
npm install nodemon --save-dev
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
npm install cors
npm install bootstrap --save

Для запуска использовать команды:
yarn start-server
yarn start-client

Для дебага серверной части использовать команду:
yarn start-server-debug
Конфигурация для дебага (файли launch.json):
{
"type": "node",
"request": "attach",
"name": "Node.js 6+",
"protocol": "inspector",
"address": "localhost",
"port": 9229,
"stopOnEntry": false
}
