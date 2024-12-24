/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _modules_todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/todo.js */ \"./src/js/modules/todo.js\");\n/* harmony import */ var _modules_typing_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/typing.js */ \"./src/js/modules/typing.js\");\n/* harmony import */ var _modules_typing_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_typing_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _modules_slide_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slide.js */ \"./src/js/modules/slide.js\");\n/* harmony import */ var _modules_slide_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_slide_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _modules_memory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/memory.js */ \"./src/js/modules/memory.js\");\n/* harmony import */ var _modules_memory_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_memory_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _modules_life_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/life.js */ \"./src/js/modules/life.js\");\n\n\n\n\n\n\nconst nav = document.querySelector('#nav');\nconst cover = document.querySelector('#cover');\nconst appNames = ['todo', 'typing', 'slide-puzzle', 'memory-card', 'life'];\nappNames.forEach(appName => {\n  const menu = document.createElement('a');\n  menu.classList.add('nav-menu');\n  menu.textContent = appName.toUpperCase();\n  menu.addEventListener('click', e => {\n    cover.classList.remove('active');\n    const appEls = document.querySelectorAll('.app');\n    appEls.forEach(appEl => {\n      appEl.classList.remove('active');\n    });\n    const appEl = document.getElementById(appName);\n    appEl.classList.add('active');\n    const navMenus = document.querySelectorAll('.nav-menu');\n    navMenus.forEach(navMenu => {\n      navMenu.classList.remove('active');\n    });\n    e.target.classList.add('active');\n  });\n  nav.appendChild(menu);\n});\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/js/index.js?");

/***/ }),

/***/ "./src/js/modules/life.js":
/*!********************************!*\
  !*** ./src/js/modules/life.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _patterns_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patterns.js */ \"./src/js/modules/patterns.js\");\n\nconst menu = document.querySelector('#gl-menu');\nconst sizeSelect = document.querySelector('.gl-size-select');\nconst speedSelect = document.querySelector('.gl-speed-select');\nconst randomBtns = document.querySelectorAll('.gl-random-btn');\nconst selfSelectBtn = document.querySelector('.gl-self-select-btn');\nconst canvasContainer = document.querySelector('.gl-canvas-container');\nconst pattern = document.querySelector('.gl-pattern');\nconst controller = document.querySelector('.gl-controller');\nconst backToMenu = document.querySelector('.gl-back-to-menu');\nconst canvas = document.querySelector('#canvas');\nconst ctx = canvas.getContext('2d');\nconst generation = document.querySelector('.gl-generation');\nconst life = document.querySelector('#life');\nconst patternSelect = document.querySelector('.gl-pattern-select');\nlet size = sizeSelect.value;\nlet speed = speedSelect.value;\nlet runningState = false;\nlet grid;\nlet numOfCols;\nlet numOfRows;\nlet frameCount = 0;\nlet animationId;\nlet numOfGeneration = 1;\nconst RESUME_COLOR = '#0aa';\nconst PAUSE_COLOR = '#f55';\nconst ALIVE_COLOR = '#0f7';\nconst DEAD_COLOR = '#000';\nsizeSelect.addEventListener('change', () => {\n  size = sizeSelect.value;\n});\nspeedSelect.addEventListener('change', () => {\n  speed = sizeSelect.value;\n});\nrandomBtns.forEach(btn => {\n  btn.addEventListener('click', () => {\n    menu.classList.add('hide');\n    canvasContainer.classList.add('active');\n    runningState = true;\n    controller.textContent = 'Pause';\n    controller.style.backgroundColor = PAUSE_COLOR;\n    grid = createRandomGrid(btn.dataset.value);\n    drawAliveCells(grid);\n    setTimeout(() => {\n      animate();\n    }, 1200);\n  });\n});\nselfSelectBtn.addEventListener('click', () => {\n  menu.classList.add('hide');\n  canvasContainer.classList.add('active');\n  pattern.classList.add('active');\n  controller.textContent = 'Generale';\n  controller.style.backgroundColor = RESUME_COLOR;\n  function createZeroGrid() {\n    let zeroGrid = generateEmptyGrid();\n    for (let i = 0; i < numOfCols; i++) {\n      for (let j = 0; j < numOfRows; j++) {\n        zeroGrid[i][j] = 0;\n      }\n    }\n    return zeroGrid;\n  }\n  grid = createZeroGrid();\n  drawAliveCells(grid);\n});\ncanvas.addEventListener('mousedown', e => {\n  if (pattern.classList.contains('active')) {\n    const x = Math.floor(e.offsetX / size);\n    const y = Math.floor(e.offsetY / size);\n    if (grid[x][y] === 0) {\n      switch (patternSelect.value) {\n        case 'cell':\n          grid[x][y] = 1;\n          break;\n        case 'glider':\n          _patterns_js__WEBPACK_IMPORTED_MODULE_0__.createGlider(grid, x, y);\n          break;\n        case 'small-speaceship':\n          _patterns_js__WEBPACK_IMPORTED_MODULE_0__.createSmallSpaceship(grid, x, y);\n          break;\n      }\n    } else {\n      grid[x][y] = 0;\n    }\n    drawAliveCells(grid);\n  }\n});\nbackToMenu.addEventListener('click', () => {\n  menu.classList.remove('hide');\n  canvasContainer.classList.remove('active');\n  pattern.classList.remove('active');\n  runningState = false;\n  cancelAnimationFrame(animationId);\n  frameCount = 0;\n  numOfGeneration = 1;\n  generation.textContent = numOfGeneration;\n});\ncontroller.addEventListener('click', () => {\n  if (runningState) {\n    controller.textContent = 'Resume';\n    controller.style.backgroundColor = RESUME_COLOR;\n    cancelAnimationFrame(animationId);\n  } else {\n    controller.textContent = 'Pause';\n    controller.style.backgroundColor = PAUSE_COLOR;\n    animate();\n  }\n  runningState = !runningState;\n});\nfunction generateEmptyGrid() {\n  numOfCols = canvas.width / size;\n  numOfRows = canvas.height / size;\n  let emptyGrid = new Array(numOfCols);\n  for (let i = 0; i < emptyGrid.length; i++) {\n    emptyGrid[i] = new Array(numOfRows);\n  }\n  return emptyGrid;\n}\ngenerateEmptyGrid();\nfunction createRandomGrid(num) {\n  grid = generateEmptyGrid();\n  for (let i = 0; i < numOfCols; i++) {\n    for (let j = 0; j < numOfRows; j++) {\n      grid[i][j] = Math.floor(Math.random() * num);\n    }\n  }\n  console.log(grid);\n  return grid;\n}\nfunction drawAliveCells(grid) {\n  for (let i = 0; i < numOfCols; i++) {\n    for (let j = 0; j < numOfRows; j++) {\n      let x = i * size;\n      let y = j * size;\n      if (grid[i][j] === 1) {\n        ctx.fillStyle = ALIVE_COLOR;\n        ctx.fillRect(x, y, size, size);\n      } else {\n        ctx.fillStyle = DEAD_COLOR;\n        ctx.fillRect(x, y, size, size);\n      }\n    }\n  }\n}\nfunction countAliveNeighbors(grid, x, y) {\n  let neighbors = 0;\n  for (let i = -1; i < 2; i++) {\n    for (let j = -1; j < 2; j++) {\n      let col = (x + i + numOfCols) % numOfCols;\n      let row = (y + j + numOfRows) % numOfRows;\n      neighbors += grid[col][row];\n    }\n  }\n  neighbors -= grid[x][y];\n  return neighbors;\n}\nfunction createNextGrid() {\n  let nextGrid = generateEmptyGrid();\n  for (let i = 0; i < numOfCols; i++) {\n    for (let j = 0; j < numOfRows; j++) {\n      let neighbors = countAliveNeighbors(grid, i, j);\n      if (grid[i][j] === 0) {\n        if (neighbors === 3) {\n          nextGrid[i][j] = 1;\n        } else {\n          nextGrid[i][j] = 0;\n        }\n      }\n      if (grid[i][j] === 1) {\n        if (neighbors === 2 || neighbors === 3) {\n          nextGrid[i][j] = 1;\n        } else {\n          nextGrid[i][j] = 0;\n        }\n      }\n    }\n  }\n  return nextGrid;\n}\nfunction animate() {\n  frameCount++;\n  if (frameCount % speed === 0) {\n    grid = createNextGrid();\n    drawAliveCells(grid);\n    console.log('animation is running');\n    numOfGeneration++;\n    generation.textContent = numOfGeneration;\n  }\n  animationId = requestAnimationFrame(animate);\n  if (!life.classList.contains('active')) {\n    runningState = false;\n    cancelAnimationFrame(animationId);\n    controller.textContent = 'Resume';\n    controller.style.backgroundColor = RESUME_COLOR;\n  }\n}\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/js/modules/life.js?");

/***/ }),

/***/ "./src/js/modules/memory.js":
/*!**********************************!*\
  !*** ./src/js/modules/memory.js ***!
  \**********************************/
/***/ (() => {

eval("const deck = document.querySelector('.mc-deck');\nconst congrats = document.querySelector('.mc-congrats');\nconst timer = document.querySelector('.mc-time');\nconst matchedCounter = document.querySelector('.mc-matched');\nconst failedCounter = document.querySelector('.mc-failed');\nconst resetBtn = document.querySelector('.mc-reset-btn');\nconst finishTimeEl = document.querySelector('.mc-congrats > h2 > span');\nconst retry = document.querySelector('.mc-retry-btn');\nlet cards = [];\nlet openedCards = [];\nlet matchedCount = 0;\nlet time = 0;\nlet failedCount = 0;\nlet playingNow = false;\nlet intervalId;\nlet finishTime;\nconst faces = ['bug', 'upload', 'configuration', 'connection', 'database', 'www', 'mobile', 'keyboard'];\nconst facesPath = {\n  bug: './images/memory_card/bug.svg',\n  upload: './images/memory_card/upload.svg',\n  configuration: './images/memory_card/configuration.svg',\n  connection: './images/memory_card/connection.svg',\n  database: './images/memory_card/database.svg',\n  www: './images/memory_card/www.svg',\n  mobile: './images/memory_card/mobile.svg',\n  keyboard: './images/memory_card/keyboard.svg'\n};\n\n// <div class=\"mc-card\">\n//     <div class=\"mc-front\"><img alt=\"\"></div>\n//     <div class=\"mc-back\"><img alt=\"\"></div>\n// </div>\n\nfunction createDeck() {\n  function createCard() {\n    const cardDiv = document.createElement('div');\n    cardDiv.classList.add('mc-card');\n    const frontDiv = document.createElement('div');\n    frontDiv.classList.add('mc-front');\n    const frontImg = document.createElement('img');\n    frontDiv.appendChild(frontImg);\n    const backDiv = document.createElement('div');\n    backDiv.classList.add('mc-back');\n    const backImg = document.createElement('img');\n    backImg.setAttribute('src', './images/memory_card/hand.svg');\n    backDiv.appendChild(backImg);\n    cardDiv.appendChild(frontDiv);\n    cardDiv.appendChild(backDiv);\n    return cardDiv;\n  }\n  function generateShuffledArray(arr) {\n    let shuffledArray = arr.slice();\n    for (let i = shuffledArray.length - 1; i > -1; i--) {\n      let randomIndex = Math.floor(Math.random() * shuffledArray.length);\n      let tempValue = shuffledArray[i];\n      shuffledArray[i] = shuffledArray[randomIndex];\n      shuffledArray[randomIndex] = tempValue;\n    }\n    return shuffledArray;\n  }\n  const orderedFaces = [...faces, ...faces];\n  const shuffledFaces = generateShuffledArray(orderedFaces);\n  shuffledFaces.forEach(face => {\n    const cardDiv = createCard();\n    const frontImage = cardDiv.querySelector('.mc-front > img');\n    frontImage.setAttribute('src', facesPath[face]);\n    deck.appendChild(cardDiv);\n    cardDiv.addEventListener('click', flip);\n  });\n}\nfunction flip() {\n  if (!playingNow) {\n    playingNow = true;\n    intervalId = setInterval(() => {\n      time++;\n      timer.textContent = time;\n    }, 1000);\n  }\n  if (openedCards.length === 0) {\n    this.classList.add('rotate');\n    openedCards.push(this);\n  } else if (openedCards.length === 1) {\n    if (this === openedCards[0]) {\n      return;\n    }\n    this.classList.add('rotate');\n    openedCards.push(this);\n    matchedOrNot(openedCards[0], openedCards[1]);\n  }\n}\nfunction matchedOrNot(card1, card2) {\n  const cardsToCheck = [card1, card2];\n  const cardOneFace = card1.querySelector('.mc-front > img').src;\n  const cardTwoFace = card2.querySelector('.mc-front > img').src;\n  if (cardOneFace === cardTwoFace) {\n    matchedCount++;\n    matchedCounter.textContent = matchedCount;\n    cardsToCheck.forEach(card => {\n      card.classList.add('matched');\n      card.removeEventListener('click', flip);\n    });\n    if (matchedCount === 8) {\n      clearInterval(intervalId);\n      finishTime = time;\n      finishTimeEl.textContent = finishTime;\n      setTimeout(() => {\n        congrats.classList.add('show');\n      }, 2500);\n    }\n    openedCards = [];\n  } else {\n    failedCount++;\n    failedCounter.textContent = failedCount;\n    setTimeout(() => {\n      cardsToCheck.forEach(card => {\n        card.classList.remove('rotate');\n        openedCards = [];\n      });\n    }, 800);\n  }\n}\nresetBtn.addEventListener('click', () => {\n  start();\n});\nfunction start() {\n  matchedCount = 0;\n  matchedCounter.textContent = matchedCount;\n  failedCount = 0;\n  failedCounter.textContent = failedCount;\n  time = 0;\n  timer.textContent = time;\n  openedCards = [];\n  deck.innerHTML = '';\n  playingNow = false;\n  clearInterval(intervalId);\n  createDeck();\n}\nretry.addEventListener('click', () => {\n  congrats.classList.remove('show');\n  start();\n});\nstart();\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/js/modules/memory.js?");

/***/ }),

/***/ "./src/js/modules/patterns.js":
/*!************************************!*\
  !*** ./src/js/modules/patterns.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createGlider: () => (/* binding */ createGlider),\n/* harmony export */   createSmallSpaceship: () => (/* binding */ createSmallSpaceship)\n/* harmony export */ });\nfunction createGlider(grid, x, y) {\n  grid[x][y] = 1;\n  grid[x][y + 1] = 1;\n  grid[x][y + 2] = 1;\n  grid[x + 1][y + 2] = 1;\n  grid[x + 2][y + 1] = 1;\n}\nfunction createSmallSpaceship(grid, x, y) {\n  grid[x][y] = 1;\n  grid[x - 1][y + 1] = 1;\n  grid[x - 1][y + 2] = 1;\n  grid[x - 1][y + 3] = 1;\n  grid[x][y + 3] = 1;\n  grid[x + 1][y + 3] = 1;\n  grid[x + 2][y + 3] = 1;\n  grid[x + 3][y + 2] = 1;\n  grid[x + 3][y] = 1;\n}\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/js/modules/patterns.js?");

/***/ }),

/***/ "./src/js/modules/slide.js":
/*!*********************************!*\
  !*** ./src/js/modules/slide.js ***!
  \*********************************/
/***/ (() => {

eval("const menuCover = document.querySelector('.sp-cover');\nconst menu = document.querySelectorAll('.sp-menu > li');\nconst backToMenu = document.querySelector('.sp-back-to-menu');\nconst originalImage = document.querySelector('#sp-original-image');\nconst showOriginalBtn = document.querySelector('#sp-show-original-btn');\nconst screen = document.querySelector('.sp-screen');\nconst counter = document.querySelector('.sp-counter');\nlet level;\nlet size;\nlet orderedArray = [];\nlet hiddenTileIndex;\nlet tilesArray = [];\nlet tiles;\nlet count = 0;\nconst images = ['space', 'veges'];\nlet selectedImage;\nconst levelMap = {\n  easy: {\n    grid: 'auto auto',\n    size: 2\n  },\n  medium: {\n    grid: 'auto auto auto',\n    size: 3\n  },\n  difficult: {\n    grid: 'auto auto auto auto',\n    size: 4\n  }\n};\nmenu.forEach(item => {\n  item.addEventListener('click', () => {\n    menuCover.classList.add('hide');\n    level = item.dataset.level;\n    size = levelMap[level].size;\n    orderedArray = [];\n    for (let x = 0; x < size; x++) {\n      for (let y = 0; y < size; y++) {\n        let tileXY = '' + x + y;\n        orderedArray.push(tileXY);\n      }\n    }\n    hiddenTileIndex = Math.floor(Math.random() * size ** 2);\n    screen.style.gridTemplateColumns = levelMap[level].grid;\n    start();\n  });\n});\nbackToMenu.addEventListener('click', () => {\n  menuCover.classList.remove('hide');\n  screen.classList.remove('zoom');\n});\nfunction setOriginalImage() {\n  selectedImage = images[Math.floor(Math.random() * images.length)];\n  originalImage.setAttribute('src', `./images/slide_puzzle/${selectedImage}/${selectedImage}.png`);\n}\noriginalImage.onload = () => {\n  const naturalWidth = originalImage.naturalWidth;\n  const naturalHeight = originalImage.naturalHeight;\n  const ratio = Math.floor(naturalHeight / naturalWidth * 1000) / 1000;\n  screen.style.width = '480px';\n  screen.style.height = `${Math.floor(480 * ratio)}px`;\n  console.log(naturalWidth);\n};\nshowOriginalBtn.addEventListener('mouseover', () => {\n  originalImage.classList.add('show');\n});\nshowOriginalBtn.addEventListener('mouseleave', () => {\n  originalImage.classList.remove('show');\n});\nfunction renderTiles(arr) {\n  screen.innerHTML = '';\n  arr.forEach((tile, index) => {\n    const div = document.createElement('div');\n    div.classList.add('sp-tile');\n    if (index === hiddenTileIndex) {\n      div.classList.add('hidden');\n    }\n    div.style.backgroundImage = `url(./images/slide_puzzle/${selectedImage}/${level}/tile${tile}.png)`;\n    screen.appendChild(div);\n  });\n}\nfunction start() {\n  setOriginalImage();\n  count = 0;\n  counter.textContent = count;\n  tilesArray = generateShuffledArray(orderedArray);\n  renderTiles(tilesArray);\n  updateScreen();\n}\nfunction generateShuffledArray(arr) {\n  let shuffledArray = arr.slice();\n  for (let i = shuffledArray.length - 1; i > -1; i--) {\n    let randomIndex = Math.floor(Math.random() * shuffledArray.length);\n    let tempValue = shuffledArray[i];\n    shuffledArray[i] = shuffledArray[randomIndex];\n    shuffledArray[randomIndex] = tempValue;\n  }\n  return shuffledArray;\n}\nfunction updateScreen() {\n  tiles = document.querySelectorAll('.sp-tile');\n  const hiddenTileRow = Math.floor(hiddenTileIndex / size);\n  const hiddenTileCol = hiddenTileIndex % size;\n  function generateNewArray(arr, index, hiddenTileIndex) {\n    const tempValue = arr[index];\n    arr[index] = arr[hiddenTileIndex];\n    arr[hiddenTileIndex] = tempValue;\n    return arr;\n  }\n  function updateTiles(index) {\n    tilesArray = generateNewArray(tilesArray, index, hiddenTileIndex);\n    hiddenTileIndex = index;\n    renderTiles(tilesArray);\n    count++;\n    counter.textContent = count;\n    setTimeout(() => {\n      if (JSON.stringify(tilesArray) === JSON.stringify(orderedArray)) {\n        complete();\n      }\n    }, 500);\n  }\n  tiles.forEach((tile, index) => {\n    tile.addEventListener('click', () => {\n      const row = Math.floor(index / size);\n      const col = index % size;\n      if (level === 'easy') {\n        updateTiles(index);\n      } else {\n        if (row === hiddenTileRow && Math.abs(col - hiddenTileCol) === 1 || col === hiddenTileCol && Math.abs(row - hiddenTileRow) === 1) {\n          updateTiles(index);\n        }\n      }\n      updateScreen();\n    });\n  });\n}\nfunction complete() {\n  tiles[hiddenTileIndex].classList.remove('hidden');\n  screen.classList.add('zoom');\n  tiles.forEach(tile => {\n    tile.classList.add('complete');\n  });\n}\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/js/modules/slide.js?");

/***/ }),

/***/ "./src/js/modules/todo.js":
/*!********************************!*\
  !*** ./src/js/modules/todo.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images_todo_button_up_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../images/todo_button/up.png */ \"./src/images/todo_button/up.png\");\n/* harmony import */ var _images_todo_button_ok_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../images/todo_button/ok.png */ \"./src/images/todo_button/ok.png\");\n/* harmony import */ var _images_todo_button_cancel_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/todo_button/cancel.png */ \"./src/images/todo_button/cancel.png\");\n\n\n\nconst addForm = document.querySelector('.td-add-form');\nconst addInput = document.querySelector('.td-add-input');\nconst todosUl = document.querySelector('.todos');\nconst donesUl = document.querySelector('.dones');\nconst searchForm = document.querySelector('.td-search-form');\nconst searchInput = document.querySelector('.td-search-input');\nlet todoData = [];\naddForm.addEventListener('submit', e => {\n  e.preventDefault();\n  let todoObj = {\n    content: addInput.value.trim(),\n    isDone: false\n  };\n  if (todoObj.content) {\n    todoData.push(todoObj);\n  }\n  addInput.value = '';\n  updataLS();\n  updataTodo();\n});\nfunction updataLS() {\n  localStorage.setItem('myTodo', JSON.stringify(todoData));\n}\nfunction getTodoData() {\n  return JSON.parse(localStorage.getItem('myTodo')) || [];\n}\nfunction createTodoElement(todo) {\n  const todoItem = document.createElement('li');\n  todoItem.classList.add('td-item');\n  const todoContent = document.createElement('p');\n  todoContent.classList.add('td-content');\n  todoContent.textContent = todo.content;\n  todoItem.appendChild(todoContent);\n  const btnContainer = document.createElement('div');\n  btnContainer.classList.add('td-btn-container');\n  const btn = document.createElement('img');\n  btn.classList.add('td-btn');\n  const upBtn = btn.cloneNode(false);\n  upBtn.setAttribute('src', _images_todo_button_up_png__WEBPACK_IMPORTED_MODULE_0__);\n  if (!todo.isDone) {\n    upBtn.classList.add('edit-btn');\n    btn.classList.add('isDone-btn');\n    btn.setAttribute('src', _images_todo_button_ok_png__WEBPACK_IMPORTED_MODULE_1__);\n    btnContainer.appendChild(btn);\n    btnContainer.appendChild(upBtn);\n    todoItem.appendChild(btnContainer);\n    todosUl.appendChild(todoItem);\n  } else {\n    upBtn.classList.add('undo-btn');\n    btn.classList.add('delete-btn');\n    btn.setAttribute('src', _images_todo_button_cancel_png__WEBPACK_IMPORTED_MODULE_2__);\n    btnContainer.appendChild(btn);\n    btnContainer.appendChild(upBtn);\n    todoItem.appendChild(btnContainer);\n    donesUl.appendChild(todoItem);\n  }\n  todoItem.addEventListener('click', e => {\n    if (e.target.classList.contains('isDone-btn')) {\n      todo.isDone = true;\n    }\n    if (e.target.classList.contains('undo-btn')) {\n      todo.isDone = false;\n    }\n    if (e.target.classList.contains('edit-btn')) {\n      addInput.value = e.target.parentElement.previousElementSibling.textContent;\n      todoData = todoData.filter(data => data !== todo);\n      addInput.focus();\n    }\n    if (e.target.classList.contains('delete-btn')) {\n      todoData = todoData.filter(data => data !== todo);\n    }\n    updataLS();\n    updataTodo();\n  });\n}\nfunction updataTodo() {\n  todosUl.innerHTML = '';\n  donesUl.innerHTML = '';\n  todoData = getTodoData();\n  todoData.forEach(todo => {\n    createTodoElement(todo);\n  });\n}\nupdataTodo();\nsearchForm.addEventListener('submit', () => {\n  e.preventDefault();\n});\nsearchInput.addEventListener('keyup', () => {\n  const searchword = searchInput.value.trim().toLowerCase();\n  const todoItems = document.querySelectorAll('.td-item');\n  todoItems.forEach(todoItem => {\n    todoItem.classList.remove('hide');\n    if (!todoItem.textContent.toLowerCase().includes(searchword)) {\n      todoItem.classList.add('hide');\n    }\n  });\n});\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/js/modules/todo.js?");

/***/ }),

/***/ "./src/js/modules/typing.js":
/*!**********************************!*\
  !*** ./src/js/modules/typing.js ***!
  \**********************************/
/***/ (() => {

eval("const startPage = document.querySelector('#ty-start-page');\nconst typingGame = document.querySelector('#ty-game');\nconst titleTime = document.querySelector('#ty-title-time');\nconst timer = document.querySelector('#ty-timer');\nconst timeSelectEl = document.querySelector('.ty-time-select');\nconst typing = document.querySelector('#typing');\nconst backToStart = document.querySelector('#ty-back-to-start');\nconst resultContainer = document.querySelector('#ty-result-container');\nconst textarea = document.querySelector('#ty-textarea');\nconst quote = document.querySelector('#ty-quote');\nconst author = document.querySelector('#ty-author-name');\nlet timelimit = 30;\nlet remainingTime;\nlet isActive = false;\nlet isPlaying = false;\nlet intervalid = null;\nlet quotes;\ntimeSelectEl.addEventListener('change', () => {\n  timelimit = parseInt(timeSelectEl.value, 10); // 数字に変換\n});\nwindow.addEventListener('keypress', e => {\n  isActive = typing.classList.contains('active');\n  if (e.key === 'Enter' && isActive && !isPlaying) {\n    start();\n    isActive = false;\n    isPlaying = true;\n  }\n});\nfunction start() {\n  startPage.classList.remove('show');\n  typingGame.classList.add('show');\n  titleTime.textContent = timelimit; // 修正\n  remainingTime = timelimit;\n  timer.textContent = remainingTime;\n  textarea.focus();\n  textarea.disabled = false;\n  intervalid = setInterval(() => {\n    remainingTime -= 1;\n    timer.textContent = remainingTime;\n    if (remainingTime <= 0) {\n      showResult();\n    }\n  }, 1000);\n}\nbackToStart.addEventListener('click', () => {\n  typingGame.classList.remove('show');\n  startPage.classList.add('show');\n  resultContainer.classList.remove('show');\n  isPlaying = false;\n});\nfunction showResult() {\n  textarea.disabled = true;\n  clearInterval(intervalid);\n  setTimeout(() => {\n    resultContainer.classList.add('show');\n  }, 1000);\n}\nasync function fetchAndRenderQuotes() {\n  const proxyUrl = 'https://api.allorigins.win/get?url=';\n  const targetUrl = 'https://zenquotes.io/api/random';\n  const response = await fetch(proxyUrl + targetUrl);\n  const data = await response.json();\n  console.log('データ', data);\n  console.log('データの内容', data.contents);\n  const parsedData = JSON.parse(data.contents);\n  const quoteText = parsedData[0].q;\n  const authorName = parsedData[0].a;\n\n  // 引用を表示するための処理\n  quotes = {\n    quote: quoteText,\n    author: authorName\n  };\n  console.log(quotes);\n\n  // quoteをspanタグに分けて表示\n  const quoteContainer = document.querySelector('#ty-quote');\n  quoteContainer.innerHTML = ''; // 既存の引用をクリア\n\n  quotes.quote.split('').forEach(letter => {\n    const span = document.createElement('span');\n    span.textContent = letter === ' ' ? '\\u00A0' : letter; // 空白文字をノンブレークスペースに変換\n    quoteContainer.appendChild(span);\n  });\n\n  // 著者名を表示\n  const authorContainer = document.querySelector('#ty-author-name');\n  authorContainer.textContent = quotes.author;\n}\nfetchAndRenderQuotes();\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/js/modules/typing.js?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/css/style.css?");

/***/ }),

/***/ "./src/images/todo_button/cancel.png":
/*!*******************************************!*\
  !*** ./src/images/todo_button/cancel.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"images/js_images/cancel.png\";\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/images/todo_button/cancel.png?");

/***/ }),

/***/ "./src/images/todo_button/ok.png":
/*!***************************************!*\
  !*** ./src/images/todo_button/ok.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"images/js_images/ok.png\";\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/images/todo_button/ok.png?");

/***/ }),

/***/ "./src/images/todo_button/up.png":
/*!***************************************!*\
  !*** ./src/images/todo_button/up.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"images/js_images/up.png\";\n\n//# sourceURL=webpack://js_webpack_project_starter/./src/images/todo_button/up.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;